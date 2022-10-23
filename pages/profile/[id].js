import { collection, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { useRouter } from "next/router"
import { useAuthContext } from "../../hooks/useAuthContext";

const Profile = () => {

    const router = useRouter()
    const param = router.query.id

    const { user } = useAuthContext()

    const [error, setError] = useState(false)
    const [isPending, setIsPending] = useState(false)

    const [userDocuments, setUserDocuments] = useState()
    const [visitorDocuments, setVisitorDocuments] = useState()
    const [documents, setDocuments] = useState([])
    const [filterPostType, setFilterPostType] = useState(3)
    const [isMatchData, setIsMatchData] = useState(false)

    const [isProfileOwner, setIsProfileOwner] = useState(false)

    const [isUserFollow, setIsUserFollow] = useState(false)

    // getting owner images
    useEffect(() => {

        const docRef = query(collection(db, "posts"))

        const getDoc = async () => {
            setIsPending(true)
            const querySnapshot = await getDocs(docRef);
            querySnapshot.forEach((doc) => {
                setDocuments(prev => [...prev, doc.data()])
            })
            setIsPending(false)
        }
        getDoc()
        return () => {
            setDocuments([])
        }
    }, [filterPostType])

    // click each image
    const handleClick = (id) => {
        router.push(`/post/${id}`)
    }

    //filter handle click
    const handleFilter = (filter) => {
        switch (filter) {
            case "All":
                console.log("setfilter = all")
                setFilterPostType(3)
                break;
            case "Image":
                console.log("setfilter = Image")
                setFilterPostType(0)
                break;
            case "360 View":
                console.log("setfilter = 360 View")
                setFilterPostType(1)
                break;
            case "GIF":
                console.log("setfilter = GIF")
                setFilterPostType(2)
                break;
            default:
                break;
        }
    }

    // useEffect for getting user document
    useEffect(() => {
        // create document reference
        const docRef = doc(db, 'users', `${param}`);
        const getUserDocuments = async () => {
            try {
                setIsPending(true)
                const docSnap = await getDoc(docRef);
                setUserDocuments(docSnap.data())
                setIsPending(false)
            } catch (error) {
                setError(error)
            }
        }

        getUserDocuments()
    }, [param, visitorDocuments])

    // useEffect for getting visitor document
    useEffect(() => {
        // create document reference
        const docRef = doc(db, 'users', `${user?.uid}`);
        const getVisitorDocuments = async () => {
            try {
                setIsPending(true)
                const docSnap = await getDoc(docRef);
                setVisitorDocuments(docSnap.data())
                setIsPending(false)
            } catch (error) {
                setError(error)
            }
        }

        getVisitorDocuments()
    }, [param, user])

    // useEffect for check visitor is follow or not
    useEffect(() => {
        if (user) {
            if (visitorDocuments?.followed?.includes(param)) {
                setIsUserFollow(true)
            } else {
                setIsUserFollow(false)
            }
        }
        return () => {

        }
    }, [param, user, visitorDocuments])


    // use effect checking for profile owner
    useEffect(() => {
        if (user) {
            if (param === user.uid) {
                setIsProfileOwner(true)
            }
        }
    }, [param, user, userDocuments])


    // handle follow button
    const followClickHandler = async () => {

        if (!user) {
            router.push('/login')
        }

        // create document reference
        const docRef = doc(db, 'users', `${param}`);
        const getUserDocuments = async () => {
            try {
                setIsPending(true)
                const docSnap = await getDoc(docRef);
                setUserDocuments(docSnap.data())
                setIsPending(false)
            } catch (error) {
                setError(error)
            }
        }
        // create document reference
        const visitorRef = doc(db, 'users', `${user?.uid}`);
        const getVisitorDocuments = async () => {
            try {
                setIsPending(true)
                const docSnap = await getDoc(visitorRef);
                setVisitorDocuments(docSnap.data())
                setIsPending(false)
            } catch (error) {
                setError(error)
            }
        }
        getUserDocuments()
        getVisitorDocuments()
        if (user) {
            if (visitorDocuments?.followed?.includes(param)) {
                // remove followed user in visitor document
                getUserDocuments()
                getVisitorDocuments()
                const index = visitorDocuments?.followed?.indexOf(param);
                if (index > -1) {
                    setVisitorDocuments(visitorDocuments.followed.splice(index, 1))
                }
                // update visitor followed
                const visitorDocRef = doc(db, 'users', `${user.uid}`);
                await updateDoc(visitorDocRef, {
                    followed: visitorDocuments.followed
                })
                getUserDocuments()
                getVisitorDocuments()
            } else {
                const visitorDocRef = doc(db, 'users', `${user.uid}`);
                await updateDoc(visitorDocRef, {
                    followed: [...visitorDocuments.followed, param],
                })
                getUserDocuments()
                getVisitorDocuments()
            }
        }
        return () => {

        }
    }

    //push to edit profile
    const pushToEditProfile = () => {
        router.push('/profile/settings')
    }

    //checking match data
    useEffect(() => {

        if (documents) {
            documents.map(document => {
                if (document.createdBy.includes(param)) {
                    setIsMatchData(true)
                }
            })
        }

    }, [documents, isMatchData, param])


    return (
        <div className="pt-[73px]">
            {userDocuments && (
                <div className="max-w-5xl mx-auto">
                    <div className="min-h-screen bg-white shadow">
                        {/* profile information */}
                        <div className="flex pb-6 bg-white border-b shadow sm:pb-10">
                            <div className="flex items-start mt-6 sm:mt-16">
                                <div className="relative mx-5 sm:mx-16">
                                    {/* <div className={`absolute md:right-2 md:w-8 md:h-8 w-5 h-5 right-0 ${userDocuments.online ? "bg-[#05b714]" : "bg-gray-400"} md:border-2 border border-gray-300 rounded-full md:top-3 top-0`}></div> */}
                                    <img className="shadow border-2 sm:border-4 w-[60px] h-[60px] sm:w-[126px] sm:h-[126px] md:w-[132px] md:h-[132px] lg:w-[158px] lg:h-[158px] rounded-full object-cover" src={userDocuments.profileImage} alt="" />
                                </div>
                                <div className="space-y-1 sm:space-y-3">
                                    {/* display name and edit/follow button */}
                                    <div className="flex flex-row items-center">
                                        <div className="text-base lg:text-3xl sm:text-xl">{userDocuments.displayName}</div>
                                        <div>
                                            {!isProfileOwner && (
                                                <div onClick={followClickHandler} className="items-center px-2 py-1 ml-3 text-center border border-gray-300 rounded cursor-pointer sm:ml-10 sm:px-3 sm:py-2">{isUserFollow ? 'Followed' : 'Follow'}</div>
                                            )}
                                            {isProfileOwner && (
                                                <div onClick={pushToEditProfile} className="items-center px-2 py-1 ml-3 text-center border border-gray-300 rounded cursor-pointer sm:ml-10 sm:px-3 sm:py-2" >Edit Profile</div>
                                            )}
                                        </div>
                                    </div>
                                    <div>{userDocuments.follows} followers</div>
                                    <div className="flex flex-row">
                                        <div className={`max-w-[196px] sm:max-w-xs text-ellipsis`}>{userDocuments.about}</div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Uploaded image content */}
                        {isMatchData && (
                            <div className="w-11/12 mx-auto mt-2">
                                {/* post type filter */}
                                <div className="flex space-x-3">

                                    <div
                                        onClick={() => handleFilter("All")}
                                        className={`px-3 py-1 my-3 text-sm text-gray-700 bg-white rounded-full shadow-md cursor-pointer ${filterPostType == 3 ? "bg-gray-600 text-white" : ""}`}
                                    >All</div>
                                    <div
                                        onClick={() => handleFilter("Image")}
                                        className={`px-3 py-1 my-3 text-sm text-gray-700 bg-white rounded-full shadow-md cursor-pointer ${filterPostType == 0 ? "bg-gray-600 text-white" : ""}`}
                                    >Image</div>
                                    <div
                                        onClick={() => handleFilter("360 View")}
                                        className={`px-3 py-1 my-3 text-sm text-gray-700 bg-white rounded-full shadow-md cursor-pointer ${filterPostType == 1 ? "bg-gray-600 text-white" : ""}`}
                                    >360 View</div>
                                    <div
                                        onClick={() => handleFilter("GIF")}
                                        className={`px-3 py-1 my-3 text-sm text-gray-700 bg-white rounded-full shadow-md cursor-pointer ${filterPostType == 2 ? "bg-gray-600 text-white" : ""}`}
                                    >GIF</div>

                                </div>
                                {/* image gallery */}
                                <div className="columns-3xs">
                                    {/* show filter card */}
                                    <div>
                                        {documents && filterPostType != 3 && documents.filter(documents => documents.postType == filterPostType).filter(documents => documents.createdBy == param).map((doc, index) => (
                                            <div
                                                onClick={() => handleClick(doc.id)}
                                                key={index}
                                                className="relative my-3 [break-inside:avoid] cursor-pointer hover:scale-105 duration-300 ease-out hover:z-10">

                                                {/* 360 logo */}
                                                {doc.postType == 1 && (
                                                    <div className="absolute flex items-center justify-center w-full h-full">
                                                        <img src="https://firebasestorage.googleapis.com/v0/b/prototype-e8461.appspot.com/o/360logo%2F360-logo.png?alt=media&token=a7317a86-d04d-424c-afe2-92c2ee18c1a9" alt="360 logo" className="w-[30%] opacity-80" />
                                                    </div>
                                                )}

                                                {/* image */}
                                                <div>
                                                    <img
                                                        className="bg-white border border-gray-300 rounded-md shadow-sm"
                                                        src={doc.thumbnail}
                                                        alt="" />
                                                    {/* details */}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* show all card */}
                                    <div>
                                        {documents && filterPostType == 3 && documents.filter(documents => documents.createdBy == param).map((doc, index) => (
                                            <div
                                                onClick={() => handleClick(doc.id)}
                                                key={index}
                                                className="relative my-3 [break-inside:avoid] cursor-pointer hover:scale-105 duration-300 ease-out hover:z-10">

                                                {/* 360 logo */}
                                                {doc.postType == 1 && (
                                                    <div className="absolute flex items-center justify-center w-full h-full">
                                                        <img src="https://firebasestorage.googleapis.com/v0/b/prototype-e8461.appspot.com/o/360logo%2F360-logo.png?alt=media&token=a7317a86-d04d-424c-afe2-92c2ee18c1a9" alt="360 logo" className="w-[30%] opacity-80" />
                                                    </div>
                                                )}

                                                {/* image */}
                                                <div>
                                                    <img
                                                        className="bg-white border border-gray-300 rounded-md shadow-sm"
                                                        src={doc.thumbnail}
                                                        alt="" />
                                                    {/* details */}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* if is pending */}
                                    <div>
                                        {isPending && (
                                            <div>
                                                Loading
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        {!isMatchData && (
                            <div className="flex justify-center pt-20 text-2xl text-gray-500">There is nothing here</div>
                        )}
                    </div>
                </div>
            )}
        </div >
    );
}

export default Profile;