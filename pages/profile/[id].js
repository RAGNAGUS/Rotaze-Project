import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
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
    const [documents, setDocuments] = useState([])
    const [filterPostType, setFilterPostType] = useState(3)

    const [isProfileOwner, setIsProfileOwner] = useState(false)

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
    }, [param])

    // use effect checking for profile owner
    useEffect(() => {
        if (user) {
            if (param === user.uid) {
                setIsProfileOwner(true)
            }
        }
    }, [param, user, userDocuments])


    console.log(userDocuments);

    return (
        <div className="pt-[73px]">
            {userDocuments && (
                <div className="max-w-5xl mx-auto">
                    <div className="min-h-screen bg-white shadow">
                        {/* profile information */}
                        <div className="flex pb-10 bg-white border-b shadow">
                            <div className="flex items-start mt-6 sm:mt-16">
                                <div className="mx-5 sm:mx-16">
                                    <img className="shadow border-2 sm:border-4 w-[60px] h-[60px] sm:w-[126px] sm:h-[126px] md:w-[132px] md:h-[132px] lg:w-[158px] lg:h-[158px] rounded-full" src="https://picsum.photos/300" alt="" />
                                </div>
                                <div className="space-y-1 sm:space-y-3">
                                    {/* display name and edit/follow button */}
                                    <div className="flex flex-row items-center">
                                        <div className="text-base lg:text-3xl sm:text-xl">{userDocuments.displayName}</div>
                                        <div>
                                            {!isProfileOwner && (
                                                <div className="items-center px-2 py-1 ml-3 text-center border border-gray-300 rounded cursor-pointer sm:ml-10 sm:px-3 sm:py-2">Follow</div>
                                            )}
                                            {isProfileOwner && (
                                                <div className="items-center px-2 py-1 ml-3 text-center border border-gray-300 rounded cursor-pointer sm:ml-10 sm:px-3 sm:py-2" >Edit Profile</div>
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
                                            {/* {doc.postType == 1 && (
                  <div className="absolute flex items-center justify-center w-full h-full">
                    <img src="/360-logo.png" alt="360 logo" className="w-[30%] opacity-80" />
                  </div>
                )} */}

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
                                                    <img src="/360-logo.png" alt="360 logo" className="w-[30%] opacity-80" />
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
                    </div>
                </div>
            )}
        </div >
    );
}

export default Profile;