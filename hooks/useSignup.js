import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

// firebase
import { auth, db, storage } from '../firebase/config'
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

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
            await setDoc(doc(db, 'users', `${res.user.uid}`), {
                online: true,
                displayName,
                email: res.user.email,
                createdAt: serverTimestamp()
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

    return { signupWithEmailAndPassword, error, isPending }


}