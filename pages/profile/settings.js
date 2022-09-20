import { async } from "@firebase/util";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { auth, db, storage } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSignout } from "../../hooks/useSignout";

const Profile = () => {

    const { user } = useAuthContext()
    const { signout } = useSignout()
    const router = useRouter()

    const [thumbnail, setThumbnail] = useState(null)
    const [displayName, setDisplayName] = useState('')
    const [about, setAbout] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [userDocuments, setUserDocuments] = useState()

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [errorFormat, setErrorFormat] = useState(null)

    const [successMsg, setSuccessMsg] = useState(null)
    const [isPending, setIsPending] = useState(false)

    // redirect to login page if user not log in
    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    }, [router, user])


    // useEffect for getting user document
    useEffect(() => {
        // create document reference
        const docRef = doc(db, 'users', `${user?.uid}`);
        const getVisitorDocuments = async () => {
            try {
                setIsPending(true)
                const docSnap = await getDoc(docRef);
                setUserDocuments(docSnap.data())
                setIsPending(false)
            } catch (error) {
                setError(error)
            }
        }

        getVisitorDocuments()
    }, [user])

    //update user documents into input form
    useEffect(() => {
        if (userDocuments) {
            setThumbnail(userDocuments.profileImage)
            setDisplayName(userDocuments.displayName)
            setAbout(userDocuments.about)
        }

        return () => {

        }
    }, [userDocuments])

    //apply change handler
    const applyChangeButton = async (e) => {
        e.preventDefault(e)
        setErrorFormat(null)
        setErrorMessage(null)
        setSuccessMsg(null)
        setIsPending(true)

        if (thumbnail) {
            // upload user thumbnail
            const storageRef = ref(storage, `thumbnails/${user.uid}/profile`)
            const img = await uploadBytes(storageRef, thumbnail)
            const imgURL = await getDownloadURL(img.ref)
            //update user profile
            await updateProfile(auth.currentUser, {
                displayName,
                photoURL: imgURL
            })
            //update user documents
            const userDocRef = doc(db, 'users', `${user.uid}`);
            await updateDoc(userDocRef, {
                profileImage: imgURL
            })

        }

        if (email) {
            //update user email
            await updateEmail(auth.currentUser, email).then(() => {
                setSuccessMsg("Success, please login again.")
                setTimeout(() => {
                    signout()
                }, 2500);
            }).catch((error) => {
                setErrorMessage(error.message)
                return
            });
        }

        if (password) {
            if (password === confirmPassword) {
                updatePassword(user, password).then(() => {
                    setSuccessMsg("Success, please login again.")
                    setTimeout(() => {
                        signout()
                    }, 2500);
                }).catch((error) => {
                    setErrorMessage(error.message)
                });
            } else {
                setErrorFormat("The Confirm Password confirmation does not match.")
                setIsPending(false)
                return
            }
        }

        //update user profile
        await updateProfile(auth.currentUser, {
            displayName
        })

        //update user documents
        const userDocRef = doc(db, 'users', `${user.uid}`);
        if (email) {
            await updateDoc(userDocRef, {
                displayName,
                about,
                email,
            })
        } else {
            await updateDoc(userDocRef, {
                displayName,
                about,
            })
        }

        if (!email && !password) {
            setSuccessMsg("Success, back to homepage")
            setTimeout(() => {
                router.push("/")
            }, 1500);
        }

        setIsPending(false)
    }

    //error format
    useEffect(() => {
        if (errorMessage) {
            switch (errorMessage) {
                case "Firebase: Error (auth/email-already-in-use).":
                    setErrorFormat("Email already in use.")
                    break;
                case "Firebase: Password should be at least 6 characters (auth/weak-password).":
                    setErrorFormat("Password should be at least 6 characters.")
                default:
                    break;
            }
        }

        return () => {

        }
    }, [errorMessage])

    // upload profile image handle
    const handleFileChange = (e) => {
        setThumbnail(null)
        let selected = e.target.files[0]
        console.log(selected);

        if (!selected) {
            errorFormat('Please select a file')
            return
        }
        if (!selected.type.includes('image')) {
            errorFormat('Selected file must be an image')
            return
        }
        if (selected.size > 1000000) {
            errorFormat('Image file size must be less than 1mb')
            return
        }

        setErrorFormat(null)
        setThumbnail(selected)
        console.log('thumbnail updated');
    }

    return (
        <div className="pt-[73px]">
            {userDocuments && (
                <div className="max-w-5xl mx-auto">
                    <div className="min-h-screen bg-white shadow">
                        <div className="max-w-3xl p-5 pt-10 mx-auto ">
                            {/* user info */}
                            <div className="p-3 border sm:p-10">
                                <div className="py-3 text-2xl font-semibold text-center border rounded">
                                    Edit Profile
                                </div>
                                <form onSubmit={applyChangeButton} className="flex flex-col mt-5 space-y-3">
                                    <label>
                                        <div>Profile Image:</div>
                                        <div className="">
                                            <input type="file"
                                                accept=".png, .jpg, .jpeg"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </label>
                                    <label>
                                        <div>Display name:</div>
                                        <input
                                            value={displayName}
                                            onChange={(e) => { setDisplayName(e.target.value) }}
                                            className="input-form"
                                            type="text" />
                                    </label>
                                    <label>
                                        <div>About:</div>
                                        <textarea
                                            value={about}
                                            onChange={(e) => { setAbout(e.target.value) }}
                                            className="input-form-about"
                                            type="text" />
                                    </label>
                                    <label>
                                        <div>Password:</div>
                                        <input
                                            value={password}
                                            onChange={(e) => { setPassword(e.target.value) }}
                                            className="input-form"
                                            type="password" />
                                    </label>
                                    <label>
                                        <div>Confirm Password:</div>
                                        <input
                                            value={confirmPassword}
                                            onChange={(e) => { setConfirmPassword(e.target.value) }}
                                            className="input-form"
                                            type="password" />
                                    </label>
                                    <label>
                                        <div>Email Address:</div>
                                        <input
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value) }}
                                            className="input-form"
                                            type="email" />
                                    </label>
                                    {errorFormat && (
                                        <div>
                                            <div className="error-form">{errorFormat}</div>
                                        </div>
                                    )}
                                    {successMsg && (
                                        <div>
                                            <div className="success-form">{successMsg}</div>
                                        </div>
                                    )}
                                    {/* update button */}
                                    <div className="pt-6 mx-auto">
                                        <button className="px-8 py-3 duration-300 ease-in-out border-2 border-gray-300 rounded hover:border-gray-400 hover:px-10">{isPending ? "Applying..." : "Apply Change"}</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Profile;
