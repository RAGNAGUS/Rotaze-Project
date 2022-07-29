import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCFmWmXSTUApOK4ci8R_UEgSazqe1DjxUw",
    authDomain: "prototype-e6c29.firebaseapp.com",
    projectId: "prototype-e6c29",
    storageBucket: "prototype-e6c29.appspot.com",
    messagingSenderId: "903946059946",
    appId: "1:903946059946:web:25980c907267efef4710d3"
};

// init firebase
const app = initializeApp(firebaseConfig)

// init authentication
const auth = getAuth()
const provider = new GoogleAuthProvider()

// init firestore
const db = getFirestore()

// init storage
const storage = getStorage()

export { db, auth, provider, storage }