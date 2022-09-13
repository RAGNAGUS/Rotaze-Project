import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

// firebase
import { auth, db } from '../firebase/config'
import { doc, setDoc, serverTimestamp, getDoc, updateDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export const useSignup = () => {

    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signupWithEmailAndPassword = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            // signup
            const res = await createUserWithEmailAndPassword(auth, email, password)
            if (!res) {
                throw new Error('Could not complete signup')
            }
            // update default profile image to user who register with email
            updateProfile(auth.currentUser, {
                photoURL: "https://firebasestorage.googleapis.com/v0/b/prototype-e8461.appspot.com/o/defaultProfileURL%2Fblank-profile-picture-973460_1280-1.png?alt=media&token=da319322-c100-49fe-842d-0bb4ebe53e33"
            }).then(() => {
                // create a user document after sign up
                setDocAfterSignup(res.user, displayName)
            })

            // dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user })
            setError(null)
            setIsPending(false)
        } catch (error) {
            setError(error.message)
            setIsPending(false)
        }
    }

    const signinWithGoogle = async (user, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            if (!user) {
                throw new Error('Could not complete signup')
            }
            // create a user document after sign up if not exists
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                setDocAfterSignup(user, displayName)
            } else {
                // update online status
                await updateDoc(doc(db, 'users', `${user.uid}`), {
                    online: true,
                    lastSignInTime: serverTimestamp()
                })
            }
            // dispatch login action
            dispatch({ type: 'LOGIN', payload: user })
            setError(null)
            setIsPending(false)
        } catch (error) {
            setError(error.message)
            setIsPending(false)
        }
    }

    const setDocAfterSignup = async (user, displayName) => {
        try {
            await setDoc(doc(db, 'users', `${user.uid}`), {
                id: user.uid,
                displayName,
                email: user.email,
                profileImage: user.photoURL,
                about: '',
                postLiked: [],
                postReported: [],
                wallpaper: 'null',
                online: true,
                reported: false,
                role: 1,
                createdAt: serverTimestamp(),
                lastSignInTime: serverTimestamp()
            })
        } catch (error) {
            setError(error.message)
            setIsPending(false)
        }
    }

    return { signupWithEmailAndPassword, signinWithGoogle, error, isPending }
}