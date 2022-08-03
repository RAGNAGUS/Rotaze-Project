import { useRouter } from "next/router"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/config'
import { useEffect, useState } from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { ChatAlt2Icon } from "@heroicons/react/outline";
import { EyeIcon } from "@heroicons/react/outline";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { ShareIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { formatDistanceToNow } from 'date-fns'
import { useAuthContext } from "../../hooks/useAuthContext";
import { async } from "@firebase/util";

export default function Post() {

    const router = useRouter()
    const param = router.query.id

    const { user } = useAuthContext()

    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const [documents, setDocuments] = useState()
    const [createrDocs, setCreaterDocs] = useState()

    const [isUserLiked, setIsUserLiked] = useState(false)

    // useEffect for getting document
    useEffect(() => {
        // create document reference
        const docRef = doc(db, 'posts', `${param}`);
        const getDocuments = async () => {
            try {
                setIsPending(true)
                const docSnap = await getDoc(docRef);
                setDocuments(docSnap.data())
                setIsPending(false)
            } catch (error) {
                setError(error)
            }
        }
        getDocuments()
    }, [param, isUserLiked])

    // useEffect for getting creater document
    useEffect(() => {
        // create createrDoc reference
        if (documents) {
            const createrDocRef = doc(db, 'users', `${documents.createdBy}`);
            const getCreaterDocs = async () => {
                try {
                    setIsPending(true)
                    const docSnap = await getDoc(createrDocRef);
                    setCreaterDocs(docSnap.data())
                    setIsPending(false)
                } catch (error) {
                    setError(error)
                }
            }
            getCreaterDocs()
        }
    }, [documents])

    // useEffect for update liked status
    useEffect(() => {

    }, [])

    // useEffect for update views
    useEffect(() => {
        // create document reference
        if (documents) {
            const docRef = doc(db, 'posts', `${param}`);
            const updateView = async () => {
                await updateDoc(docRef, {
                    views: documents.views + 1
                })
            }
            updateView()
        }
    }, [documents, param])

    // handleClick like button
    const handleClickLike = async () => {


    }
    // handleClick comment button
    const handleClickComment = () => {
        return
    }
    // handleClick report button
    const handleClickReport = () => {
        return
    }
    // handleClick share button
    const handleClickShare = () => {
        return
    }


    // console.log(documents)
    // console.log(createrDocs)

    // const handleClick = () => {
    //     if (documents.postType == 1) {
    //         console.log(documents.images)
    //         let text = documents.images[0]
    //         let pos = text.search('image_0')
    //         let link = text.substring(0, pos)
    //         console.log(link)
    //         console.log(pos);
    //     }
    // }

    return (
        <div className="pt-[73px] bg-white">
            <div className="grid w-full grid-cols-1 sm:grid-cols-6 lg:grid-cols-5 justify-evenly">
                {/* left content */}
                <div className="hidden bg-[#efeeee] lg:inline-block">
                    <div className="flex items-center justify-center h-screen mx-16 my-10 bg-orange-300">
                        <div className="text-2xl text-center text-white">
                            Ads banner
                        </div>
                    </div>
                </div>
                {/* center content */}
                <div className="col-span-1 sm:col-span-4 lg:col-span-3">
                    <div className="flex">
                        {/* behavior bar */}
                        <div className="fixed items-start justify-center hidden w-24 h-screen bg-white lg:flex">
                            <div className="flex flex-col items-center justify-center w-8/12 py-3 space-y-5 text-sm text-gray-600 bg-white border rounded-lg shadow-md mt-72">
                                {/* likes comments views */}
                                <div className="flex flex-col items-center justify-center space-y-2">
                                    <div className="flex flex-col items-center justify-center p-1 ">
                                        <HeartIcon onClick={handleClickLike} fill={`${isUserLiked ? 'red' : 'white'}`} className='w-6 h-6 cursor-pointer' />
                                        <div>{documents && documents.likes}</div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-1">
                                        <ChatAlt2Icon className="w-6 h-6" />
                                        <div>{documents && documents.comments}</div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-1">
                                        <EyeIcon className="w-6 h-6" />
                                        <div>{documents && documents.views}</div>
                                    </div>
                                    {/* share */}
                                    <div className="flex flex-col items-center justify-center p-1">
                                        <ShareIcon className="w-6 h-6" />
                                        <div>Share</div>
                                    </div>
                                </div>
                                {/* report */}
                                <div className="flex flex-col items-center justify-center">
                                    <ExclamationCircleIcon className="w-5 h-5" />
                                    <div>Report</div>
                                </div>

                            </div>
                        </div>
                        {/* main content */}
                        <div className="ml-0 lg:ml-[96px]  bg-white w-full flex flex-col space-y-1">
                            <div className="flex items-center justify-start w-full py-2 pl-5 pr-4 text-gray-800 border-gray-300 md:py-4 lg:py-6 lg:pr-20 lg:pl-0">
                                {/* avatar and image views */}
                                <div className="flex items-center justify-center space-x-3 ">
                                    <div className="w-8 sm:w-10">
                                        <img src={createrDocs && createrDocs.profileImage} alt="" className="rounded-full" />
                                    </div>
                                    <div>
                                        <div className="font-semibold">{createrDocs && createrDocs.displayName}</div>
                                        <div className="flex space-x-1 sm:space-x-3 ">
                                            <div className="flex space-x-1">
                                                <div>{documents && documents.views}</div>
                                                <div>views</div>
                                            </div>
                                            <div>/</div>
                                            <div>{documents && formatDistanceToNow(documents.createdAt.toDate(), { addSuffix: true })}</div>
                                        </div>
                                    </div>
                                </div>
                                <button className="flex items-center justify-center w-16 h-8 ml-auto text-gray-600 border border-gray-400 rounded sm:w-20 sm:h-8">
                                    <div>Next</div>
                                    <ChevronRightIcon className="w-4 h-4" />
                                </button>
                            </div>

                            {/* title and descriptions */}
                            <div className="flex flex-col items-start justify-center max-w-3xl py-3 pl-4 pr-10 space-x-3 space-y-3 text-sm text-gray-800 ">
                                <div className="w-full text-xl font-semibold">{documents && documents.title}</div>
                                <div className="w-full">{documents && documents.description}</div>
                            </div>

                            {/* image content */}
                            <div className="flex items-center justify-center w-full py-1">
                                <div className="flex items-center justify-center w-11/12 shadow-inner">
                                    <img src={documents && documents.images[0]} alt="" className="w-full" />
                                </div>
                            </div>
                            {/* ads banner bottom */}
                            <div className="flex items-center justify-center w-full bg-orange-300 border h-36">
                                <div className="text-3xl text-center text-white">Ads banner</div>
                            </div>
                            <div>comments section</div>

                            {/* hidden behavior bar for large screen */}
                            <div className="flex justify-center w-full h-14 lg:hidden">
                                <div className="fixed flex p-1 text-gray-600 border-4 border-gray-400 bg-white/95 w-10/12text-sm bottom-5 justify-evenly rounded-xl">
                                    {/* likes comments views */}
                                    <div className="flex items-center px-3 space-x-6 border-gray-400 justify-evenly">
                                        <div className="flex items-center justify-center space-x-5">
                                            <div className="flex flex-col items-center justify-center">
                                                <HeartIcon className="w-6 h-6" />
                                                <div>{documents && documents.likes}</div>
                                            </div>
                                            <div className="flex flex-col items-center justify-center">
                                                <ChatAlt2Icon className="w-6 h-6" />
                                                <div>{documents && documents.comments}</div>
                                            </div>
                                            <div className="flex flex-col items-center justify-center">
                                                <EyeIcon className="w-6 h-6" />
                                                <div>{documents && documents.views}</div>
                                            </div>
                                        </div>
                                        {/* share */}
                                        <div className="flex flex-col items-center justify-center">
                                            <ShareIcon className="w-6 h-6" />
                                            <div>Share</div>
                                        </div>
                                        {/* report */}
                                        <div className="flex flex-col items-center justify-center">
                                            <ExclamationCircleIcon className="w-6 h-6" />
                                            <div>Report</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* right content */}
                <div className="hidden bg-[#efeeee] sm:col-span-2 lg:col-span-1 sm:inline-block">
                    <div className="flex items-center justify-center mx-6 my-10 bg-orange-300 h-80">
                        <div className="text-2xl text-center text-white">Ads banner</div>
                    </div>
                    <div className="p-3 mx-6 bg-white rounded h-fit">
                        <div className="pb-2 text-gray-600 border-b text-md">most popular in this week</div>
                        <div className="px-2 py-2 space-y-3">
                            {/* map for most poppular */}
                            <div className="flex items-center justify-start w-full overflow-hidden duration-100 ease-out border border-gray-400 rounded-lg shadow-md hover:scale-105">
                                <div className="w-16 lg:w-20 "><img src="https://picsum.photos/300" alt="" /></div>
                                <div className="pl-5">title</div>
                            </div>
                            <div className="flex items-center justify-start w-full overflow-hidden duration-100 ease-out border border-gray-400 rounded-lg shadow-md hover:scale-105">
                                <div className="w-16 lg:w-20 "><img src="https://picsum.photos/500" alt="" /></div>
                                <div className="pl-5">title</div>
                            </div>
                            <div className="flex items-center justify-start w-full overflow-hidden duration-100 ease-out border border-gray-400 rounded-lg shadow-md hover:scale-105">
                                <div className="w-16 lg:w-20 "><img src="https://picsum.photos/600" alt="" /></div>
                                <div className="pl-5">title</div>
                            </div>
                            <div className="flex items-center justify-start w-full overflow-hidden duration-100 ease-out border border-gray-400 rounded-lg shadow-md hover:scale-105">
                                <div className="w-16 lg:w-20 "><img src="https://picsum.photos/100" alt="" /></div>
                                <div className="pl-5">title</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}