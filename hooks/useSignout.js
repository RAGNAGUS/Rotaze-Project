import { signOut } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { auth, db } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useSignout = () => {

    const { user } = useAuthContext()

    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signout = () => {

        setError(null)
        setIsPending(true)
        const currentUser = user

        signOut(auth).then(() => {
            // update status to online if logged in user opened website
            currentUser && updateDoc(doc(db, 'users', currentUser.uid), {
                online: false
            })
            // Sign-out successful and dispatch logout action.
            dispatch({ type: 'LOGOUT' })
            setError(null)
            setIsPending(false)
        }).catch((error) => {
            setError(error)
        });
    }

    return { signout, error, isPending }

}