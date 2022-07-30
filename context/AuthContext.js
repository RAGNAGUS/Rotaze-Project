import { createContext, useReducer, useEffect } from "react";
import { auth, db } from '../firebase/config'
import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        case 'AUTH_IS_READY':
            return { user: action.payload, authIsReady: true }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            dispatch({ type: 'AUTH_IS_READY', payload: user })

            // update status to online if logged in user opened website
            user && updateDoc(doc(db, 'users', user.uid), {
                online: true
            })

            unsubscribe()
        })
    }, [])

    console.log('AuthContext state:', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}