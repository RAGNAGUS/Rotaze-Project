import { useState } from "react"
import { auth, db } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthContext } from './useAuthContext'
import { doc, serverTimestamp, updateDoc } from "firebase/firestore"


export const useLogin = () => {

    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const loginWithEmailAndPassword = async (email, password) => {
        setError(null)
        setIsPending(true)

        try {
            // login
            const res = await signInWithEmailAndPassword(auth, email, password)

            // update online status
            await updateDoc(doc(db, 'users', `${res.user.uid}`), {
                online: true,
                lastSignInTime: serverTimestamp()
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

    return { loginWithEmailAndPassword, isPending, error }
}