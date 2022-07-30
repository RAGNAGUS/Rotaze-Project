import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

// firebase
import { auth, db } from '../firebase/config'
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword } from 'firebase/auth'

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
            // create a user document after sign up
            setDocAfterSignup(res.user, displayName)
            // dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user })
            setError(null)
            setIsPending(false)
        } catch (error) {
            setError(error.message)
            setIsPending(false)
        }
    }

    const signupWithGoogle = async (user, displayName) => {
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
                // update login time later
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
                uid: user.uid,
                displayName,
                email: user.email,
                online: true,
                createdAt: serverTimestamp()
            })
        } catch (error) {
            setError(error.message)
            setIsPending(false)
        }
    }

    return { signupWithEmailAndPassword, signupWithGoogle, error, isPending }
}