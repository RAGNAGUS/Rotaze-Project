/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

// firebase
import { db } from '../../firebase/config'
import { doc, getDoc, updateDoc } from "firebase/firestore";

// date fns
import { format, formatDistanceToNow } from 'date-fns'

// import icons
import { EyeIcon } from "@heroicons/react/outline";
import { ShareIcon } from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/outline";
import { ChatAlt2Icon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { MdOutline360 } from 'react-icons/md'

export default function Post() {

    const router = useRouter()
    const param = router.query.id

    const { user } = useAuthContext()

    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const [sliderValue, setSliderValue] = useState(0)
    const [showThreeSixty, setShowThreeSixty] = useState(false)

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

    //useEffect for show logo
    useEffect(() => {
        if (documents) {
            if (documents.postType === 1) {
                setShowThreeSixty(true)
            }
        }

    }, [documents])


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

    const onCardChange = (e) => {
        setSliderValue(e)
        setShowThreeSixty(false)
    }

    return (
        <div className="pt-[73px]">
            {documents && (
                <div className="grid w-full grid-cols-1 sm:grid-cols-6 lg:grid-cols-5 justify-evenly">
                    {/* left content */}
                    <div className="hidden lg:inline-block">
                        <div className="flex items-center justify-center invisible h-screen mx-16 my-10 bg-orange-300">
                            <div className="text-2xl text-center text-white">
                                Ads banner
                            </div>
                        </div>
                    </div>
                    {/* center content */}
                    <div className="col-span-1 sm:col-span-4 lg:col-span-3">
                        <div className="flex">
                            {/* behavior bar */}
                            <div className="fixed items-start justify-center hidden w-24 h-screen lg:flex">
                                <div className="flex flex-col items-center justify-center w-8/12 py-3 space-y-5 text-sm text-gray-600 duration-300 bg-white border rounded-lg shadow-md opacity-80 hover:opacity-100 mt-72">
                                    {/* likes comments views */}
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <div className="flex flex-col items-center justify-center p-1">
                                            <HeartIcon onClick={handleClickLike} fill={`${isUserLiked ? 'red' : 'white'}`} className='w-6 h-6 duration-300 ease-out cursor-pointer hover:scale-125' />
                                            <div>{documents && documents.likes}</div>
                                        </div>
                                        <div className="flex flex-col items-center justify-center p-1">
                                            <ChatAlt2Icon className="w-6 h-6 duration-300 ease-out hover:scale-125" />
                                            <div>{documents && documents.comments}</div>
                                        </div>
                                        <div className="flex flex-col items-center justify-center p-1">
                                            <EyeIcon className="w-6 h-6 duration-300 ease-out hover:scale-125" />
                                            <div>{documents && documents.views}</div>
                                        </div>
                                        {/* share */}
                                        <div className="flex flex-col items-center justify-center p-1">
                                            <ShareIcon className="w-6 h-6 duration-300 ease-out hover:scale-125" />
                                            <div>Share</div>
                                        </div>
                                    </div>
                                    {/* report */}
                                    <div className="flex flex-col items-center justify-center">
                                        <ExclamationCircleIcon className="w-5 h-5 duration-300 ease-out hover:scale-125" />
                                        <div>Report</div>
                                    </div>

                                </div>
                            </div>
                            {/* main content */}
                            <div className="ml-0 mr-0 lg:ml-[96px] lg:mr-[96px]  bg-white w-full flex flex-col border-l border-r shadow-lg">
                                <div className="flex items-center justify-start w-full py-2 pl-5 pr-4 text-gray-800 border-gray-300 lg:pr-0 md:py-4 lg:py-6 lg:pl-0">
                                    {/* avatar and image views */}
                                    <div className="flex items-center justify-center space-x-3 ">
                                        <div className="w-8 sm:w-10">
                                            <img src={createrDocs && createrDocs.profileImage} alt="" className="duration-300 rounded-full cursor-pointer hover:scale-110" />
                                        </div>
                                        <div>
                                            <div className="font-semibold cursor-pointer hover:font-bold">{createrDocs && createrDocs.displayName}</div>
                                            <div className="flex space-x-1 text-[13px] sm:text-sm ">
                                                <div className="flex space-x-1">
                                                    <div>{documents && documents.views}</div>
                                                    <div>views</div>
                                                </div>
                                                <div>·</div>
                                                <div>{documents && formatDistanceToNow(documents?.createdAt.toDate(), { addSuffix: true })}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="flex items-center justify-center w-16 h-8 ml-auto text-gray-600 border border-gray-400 rounded sm:w-20 sm:h-8">
                                        <div>Next</div>
                                        <ChevronRightIcon className="w-4 h-4" />
                                    </button>
                                </div>
                                {/* image content */}
                                <div className="flex items-center justify-center w-full">
                                    <div className="relative flex flex-col justify-center w-full ">
                                        <div className="absolute flex items-center justify-center w-full h-full">
                                            {/* 360 logo */}
                                            {showThreeSixty && (
                                                <img src="/360-logo.png" alt="360 logo" className="w-[30%] opacity-80" />
                                            )}
                                        </div>
                                        {/* slider */}
                                        <div className="absolute w-full h-full">
                                            <input
                                                onChange={e => onCardChange(e.target.value)}
                                                type="range"
                                                min="0"
                                                max={`${documents?.images.length - 1}`}
                                                className={`w-full h-full appearance-none bg-black/0 slider-thumb ${documents?.postType == 1 ? 'cursor-all-scroll' : ''}`}
                                                id="myRange" />
                                        </div>
                                        {documents && documents?.images.sort().map((image, index) => (
                                            <div key={index} className="flex justify-center">
                                                <img src={image} alt="main content" className={`max-h-[360px] sm:max-h-[680px] md:px-10  ${index == sliderValue ? 'inline-block' : 'hidden'} pointer-events-none`} />
                                            </div>
                                        ))}

                                    </div>
                                </div>
                                {/* Tags */}
                                {documents.tags.length > 0 && (
                                    <div className="w-full py-3 pl-4 lg:pl-0">
                                        <div className="flex gap-1">
                                            {documents && documents.tags.map((tag, index) => (
                                                <div key={index} className="cursor-pointer px-3 py-1 text-gray-600 bg-white rounded-full w-fit text-[10px] sm:text-[12px] font-bold border shadow-md">
                                                    #{tag}
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                )}
                                {/* title and descriptions */}
                                <div className="flex flex-col items-start justify-center py-6 pl-6 pr-10 text-gray-800">
                                    <div className="w-full text-xl sm:text-2xl md:text-3xl">{documents && documents.title}</div>
                                    <div className="w-full text-[8px] md:text-[12px]  pb-2">{documents && format(documents?.createdAt.toDate(), 'dd MMMM yyyy')}</div>
                                    <div className="flex-wrap w-full text-base indent-4 overflow-clip h-36">{documents && documents.description}</div>
                                </div>
                                {/* ads banner bottom */}
                                <div className="flex items-center justify-center invisible w-full bg-orange-300 border h-36">
                                    <div className="text-3xl text-center text-white">Ads banner</div>
                                </div>
                                <div>comments section</div>

                                {/* hidden behavior bar for large screen */}
                                <div className="flex justify-center w-full h-14 lg:hidden">
                                    <div className="fixed flex p-1 text-gray-600 border-4 border-gray-400 bg-white/95 w-10/12text-sm bottom-5 justify-evenly rounded-xl">
                                        {/* likes comments views */}
                                        <div className="flex items-center px-3 space-x-6 border-gray-400 justify-evenly">
                                            <div className="flex items-center justify-center space-x-6">
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
                                                <ShareIcon className="w-5 h-5" />
                                                <div>Share</div>
                                            </div>
                                            {/* report */}
                                            <div className="flex flex-col items-center justify-center">
                                                <ExclamationCircleIcon className="w-5 h-5" />
                                                <div>Report</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* right content */}
                    <div className="hidden sm:col-span-2 lg:col-span-1 sm:inline-block">
                        {/* <div className="flex items-center justify-center invisible mx-6 my-10 bg-orange-300 h-80">
                            <div className="text-2xl text-center text-white">Ads banner</div>
                        </div> */}
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
            )
            }
        </div >
    )
}