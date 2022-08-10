import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCv7cflXA1KhoT1Mj0QSNpsIQa9stwIOBI",
    authDomain: "prototype-e8461.firebaseapp.com",
    projectId: "prototype-e8461",
    storageBucket: "prototype-e8461.appspot.com",
    messagingSenderId: "80093599309",
    appId: "1:80093599309:web:78db2faf67efa5a4c5ae04"
};

// init firebase
const app = initializeApp(firebaseConfig)

// init authentication
const auth = getAuth()
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: 'select_account'
})

// init firestore
const db = getFirestore()

// init storage
const storage = getStorage()

export { db, auth, provider, storage }