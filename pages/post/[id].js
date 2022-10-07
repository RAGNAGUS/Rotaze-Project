/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { uuidv4 } from '@firebase/util'

// firebase
import { db } from '../../firebase/config'
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";

// date fns
import { format, formatDistanceToNow } from 'date-fns'

// import icons
import { EyeIcon } from "@heroicons/react/outline";
import { ShareIcon } from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/outline";
import { ChatAlt2Icon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { async } from "@firebase/util";

export default function Post() {

    const router = useRouter()
    const param = router.query.id

    const { user } = useAuthContext()

    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [isUpdatingLike, setIsUpdatingLike] = useState(false)
    const [isUpdatingReport, setIsUpdatingReport] = useState(false)

    const [sliderValue, setSliderValue] = useState(0)
    const [showThreeSixty, setShowThreeSixty] = useState(false)

    const [documents, setDocuments] = useState()
    const [createrDocs, setCreaterDocs] = useState()
    const [userDocs, setUserDocs] = useState()

    const [newComment, setNewComment] = useState('')

    const [isUserLiked, setIsUserLiked] = useState()
    const [isUserReported, setIsUserReported] = useState()

    const [canUpdateView, setCanUpdateView] = useState(true)
    const [isCopy, setIsCopy] = useState(false)

    // useEffect for getting document
    useEffect(() => {
        // create document reference
        const docRef = doc(db, 'posts', `${param}`);
        const getDocuments = async () => {
            try {
                setIsPending(true)
                const docSnap = await getDoc(docRef);
                setDocuments(docSnap.data())
                await updateDoc(docRef, {
                    comments: documents.allComment.length
                })
                setIsPending(false)
            } catch (error) {
                setError(error)
            }
        }

        getDocuments()
    }, [param])


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

    // useEffect for getting user document
    useEffect(() => {
        // create user reference
        if (user && documents) {
            const userRef = doc(db, 'users', `${user.uid}`);
            const getUserDocs = async () => {
                try {
                    setIsPending(true)
                    const docSnap = await getDoc(userRef);
                    setUserDocs(docSnap.data())
                    setIsPending(false)
                } catch (error) {
                    setError(error)
                }
            }
            getUserDocs()
        }
    }, [documents, param, user])

    // useEffect for update views
    useEffect(() => {
        // create document reference
        if (documents) {
            const docRef = doc(db, 'posts', `${param}`);
            if (canUpdateView) {
                const updateView = async () => {
                    await updateDoc(docRef, {
                        views: documents.views + 1
                    })
                }
                updateView()
                setCanUpdateView(false)
            }
        }
    }, [canUpdateView, documents, param])

    //useEffect for show logo
    useEffect(() => {
        if (documents) {
            if (documents.postType === 1) {
                setShowThreeSixty(true)
            }
        }

    }, [documents])

    // is user liked and reportd check before render
    useEffect(() => {
        if (userDocs && user) {
            if (userDocs.postLiked?.includes(param)) {
                setIsUserLiked(true)
            } else {
                setIsUserLiked(false)
            }

            if (userDocs.postReported?.includes(param)) {
                setIsUserReported(true)
            } else {
                setIsUserReported(false)
            }
        }
    }, [param, userDocs])


    // handleClick like button
    const handleClickLike = async () => {
        setIsUpdatingLike(true)
        // update like
        if (documents) {
            // get all document before update like
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

            if (user) {
                if (userDocs.postLiked.includes(param)) {
                    // remove liked post in user document
                    const index = userDocs.postLiked.indexOf(param);
                    if (index > -1) {
                        setUserDocs(userDocs.postLiked.splice(index, 1))
                    }
                    console.log(userDocs.postLiked)
                    // update user liked post
                    const userDocRef = doc(db, 'users', `${user.uid}`);
                    await updateDoc(userDocRef, {
                        postLiked: userDocs.postLiked
                    })
                    // update likes
                    await updateDoc(docRef, {
                        likes: documents.likes - 1
                    })
                    getDocuments()
                    setIsUserLiked(false)

                } else {
                    // update likes
                    await updateDoc(docRef, {
                        likes: documents.likes + 1
                    })
                    // update user liked post
                    const userDocRef = doc(db, 'users', `${user.uid}`);
                    await updateDoc(userDocRef, {
                        postLiked: [...userDocs.postLiked, param],
                    })
                    getDocuments()
                    setIsUserLiked(true)
                }
            } else {
                router.push('/login')
            }

            setIsUpdatingLike(false)
        }

    }
    // handleClick comment button
    const handleClickComment = () => {
        window.scrollTo(0, document.body.scrollHeight);
    }
    // handleClick report button
    const handleClickReport = async () => {
        setIsUpdatingReport(true)
        // update like
        if (documents) {
            // get all document before update like
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

            if (user) {
                if (userDocs.postReported.includes(param)) {
                    // remove reported post in user document
                    const index = userDocs.postReported.indexOf(param);
                    if (index > -1) {
                        setUserDocs(userDocs.postReported.splice(index, 1))
                    }
                    console.log(userDocs.postReported)
                    // update user liked post
                    const userDocRef = doc(db, 'users', `${user.uid}`);
                    await updateDoc(userDocRef, {
                        postReported: userDocs.postReported
                    })
                    // update reported
                    await updateDoc(docRef, {
                        reported: documents.reported - 1
                    })
                    getDocuments()
                    setIsUserReported(false)

                } else {
                    // update reported
                    await updateDoc(docRef, {
                        reported: documents.reported + 1
                    })
                    // update user reported post
                    const userDocRef = doc(db, 'users', `${user.uid}`);
                    await updateDoc(userDocRef, {
                        postReported: [...userDocs.postReported, param],
                    })
                    getDocuments()
                    setIsUserReported(true)
                }
            } else {
                router.push("/login")
            }

            setIsUpdatingReport(false)
        }
    }
    // handleClick share button
    const handleClickShare = () => {
        navigator.clipboard.writeText(window.location.href)
        setIsCopy(true)
    }

    const onCardChange = (e) => {
        setSliderValue(e)
        setShowThreeSixty(false)
    }

    //submit comment
    const handleSubmit = async (e) => {
        e.preventDefault()
        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            commentBy: user.uid,
            createdAt: new Date(),
            id: uuidv4()
        }
        // update comment
        if (documents) {
            // get all document before update comment
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
            await updateDoc(docRef, {
                allComment: [...documents.allComment, commentToAdd],
                comments: documents.allComment.length
            })
            setNewComment('')
            window.scrollTo(0, document.body.scrollHeight);
        }
    }

    // push user to creator profile
    const pushToProfile = () => {
        router.push(`/profile/${documents.createdBy}`)
    }

    // push user to commentor profile
    const pushToCommentorProfile = (uid) => {
        router.push(`/profile/${uid}`)
    }

    // push user to discover tag
    const pushToDiscoverTags = (tag) => {
        router.push(`/discover/${tag}`)
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
                    <div className="max-w-5xl col-span-1 mx-auto sm:col-span-4 lg:col-span-3">
                        <div className="flex">
                            {/* behavior bar */}
                            <div className="fixed items-start justify-center hidden w-24 h-screen lg:flex">
                                <div className="flex flex-col items-center justify-center w-8/12 py-3 space-y-5 text-sm text-gray-600 duration-300 bg-white border rounded-lg shadow-md opacity-80 hover:opacity-100 mt-72">
                                    {/* likes comments views */}
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        {isUpdatingLike && (
                                            <div className="flex flex-col items-center justify-center p-1">
                                                <HeartIcon onClick={handleClickLike} fill={`${isUserLiked ? 'red' : 'white'}`} className='w-6 h-6 duration-300 ease-out' />
                                                <div>{documents && documents.likes}</div>
                                            </div>
                                        )}
                                        {!isUpdatingLike && (
                                            <div className="flex flex-col items-center justify-center p-1">
                                                <HeartIcon onClick={handleClickLike} fill={`${isUserLiked ? 'red' : 'white'}`} className='w-6 h-6 duration-300 ease-out cursor-pointer' />
                                                <div>{documents && documents.likes}</div>
                                            </div>
                                        )}
                                        <div className="flex flex-col items-center justify-center p-1">
                                            <ChatAlt2Icon onClick={handleClickComment} className="w-6 h-6 transition-all duration-300 ease-out hover:scale-125" />
                                            <div>{documents && documents.comments}</div>
                                        </div>
                                        <div className="flex flex-col items-center justify-center p-1">
                                            <EyeIcon className="w-6 h-6 duration-300 ease-out hover:scale-125" />
                                            <div>{documents && documents.views}</div>
                                        </div>
                                        {/* share */}
                                        <div className="flex flex-col items-center justify-center p-1">
                                            <ShareIcon onClick={handleClickShare} className="w-6 h-6 duration-300 ease-out cursor-pointer hover:scale-125" />
                                            <div>{isCopy ? 'Copied' : 'Share'}</div>
                                        </div>
                                    </div>
                                    {/* report */}
                                    <div className="flex flex-col items-center justify-center">
                                        <ExclamationCircleIcon onClick={handleClickReport} className={`${isUserReported ? 'fill-yellow-200' : ''} w-6 h-6 duration-300 ease-out hover:scale-125`} />
                                        <div className="text-[12px] font-bold">{isUserReported ? 'Reported' : 'Report'}</div>
                                    </div>

                                </div>
                            </div>
                            {/* main content */}
                            <div className="ml-0 mr-0 lg:ml-[96px] lg:mr-[96px]  bg-white w-full flex flex-col border-l border-r shadow-lg">
                                <div className="flex items-center justify-start w-full py-2 pl-5 pr-4 text-gray-800 border-gray-300 lg:pr-0 md:py-4 lg:py-6 lg:pl-0">
                                    {/* avatar and image views */}
                                    <div className="flex items-center justify-center ml-0 space-x-3 lg:ml-10">
                                        <div onClick={pushToProfile}>
                                            <img src={createrDocs && createrDocs.profileImage} alt="" className="object-cover w-8 h-8 duration-300 rounded-full cursor-pointer sm:w-10 sm:h-10 hover:scale-110" />
                                        </div>
                                        <div>
                                            <div onClick={pushToProfile} className="font-semibold cursor-pointer">{createrDocs && createrDocs.displayName}</div>
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
                                    {/* <button className="flex items-center justify-center w-16 h-8 ml-auto mr-2 text-gray-600 border border-gray-400 rounded md:mr-10 sm:w-20 sm:h-8">
                                        <div>Next</div>
                                        <ChevronRightIcon className="w-4 h-4" />
                                    </button> */}
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
                                    <div className="w-full py-3 pl-4 lg:pl-10">
                                        <div className="flex gap-1">
                                            {documents && documents.tags.map((tag, index) => (
                                                <div key={index} onClick={() => pushToDiscoverTags(tag)} className="cursor-pointer px-3 py-1 text-gray-600 bg-white rounded-full w-fit text-[10px] sm:text-[12px] font-bold border shadow-md">
                                                    #{tag}
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                )}
                                {/* title and descriptions */}
                                <div className="flex flex-col items-start justify-center py-6 pr-10 ml-5 text-gray-800 sm:ml-10">
                                    <div className="w-full text-xl sm:text-2xl md:text-3xl">{documents && documents.title}</div>
                                    <div className="w-full text-[8px] md:text-[12px]  pb-2">{documents && format(documents?.createdAt.toDate(), 'dd MMMM yyyy')}</div>
                                    <div className="flex-wrap w-full text-base overflow-clip">{documents && documents.description}</div>
                                </div>
                                {/* comments */}
                                <div className="pl-10">
                                    <h4>Comments</h4>
                                    <div>
                                        {documents.allComment.length > 0 && documents.allComment.map((comment) => (
                                            <div key={comment.id} className="py-2">
                                                <div className="p-2 mr-10 bg-gray-100 rounded">
                                                    <div className="flex items-center">
                                                        <img
                                                            src={comment.photoURL}
                                                            onClick={() => pushToCommentorProfile(comment.commentBy)}
                                                            className="mr-3 rounded-full cursor-pointer w-9"
                                                            alt="" />


                                                        <div className="flex flex-col">
                                                            <p className="cursor-pointer " onClick={() => pushToCommentorProfile(comment.commentBy)}>{comment.displayName}</p>
                                                            <div className="text-sm text-gray-500">{comment && formatDistanceToNow(comment?.createdAt.toDate(), { addSuffix: true })}</div>
                                                        </div>


                                                    </div>

                                                    <div className="w-full p-1 px-2 mt-3 rounded bg-gray-50">
                                                        <p>{comment.content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {user && (
                                        <form onSubmit={handleSubmit}>
                                            <label className="flex flex-col">
                                                <span className="py-2">Add new comment:</span>
                                                <textarea
                                                    className="pt-1 pl-2 pr-1 mr-10 text-gray-800 duration-150 ease-in-out border-2 border-gray-300 rounded outline-none h-28 focus:border-gray-600"
                                                    required
                                                    placeholder="Type your comment here"
                                                    onChange={(e) => setNewComment(e.target.value)}
                                                    value={newComment}
                                                ></textarea>
                                            </label>
                                            <button className="w-64 h-12 mt-2 mb-24 border-2 border-gray-400 rounded shadow hover:bg-gray-800 hover:text-white">Add Comment</button>
                                        </form>
                                    )}
                                </div>

                                {/* hidden behavior bar for large screen */}
                                <div className="flex justify-center w-screen lg:hidden">
                                    <div className="fixed bottom-0 flex w-full p-2 text-sm text-white bg-gray-700 justify-evenly">
                                        {/* likes */}
                                        {isUserLiked && (
                                            <div className="flex flex-col items-center justify-center">
                                                <HeartIcon onClick={handleClickLike} fill={`${isUserLiked ? 'red' : '#374151'}`} className='w-6 h-6 duration-300 ease-out ' />
                                                <div>{documents && documents.likes}</div>
                                            </div>
                                        )}
                                        {!isUserLiked && (
                                            <div className="flex flex-col items-center justify-center">
                                                <HeartIcon onClick={handleClickLike} fill={`${isUserLiked ? 'red' : '#374151'}`} className='w-6 h-6 ' />
                                                <div>{documents && documents.likes}</div>
                                            </div>
                                        )}
                                        {/* comments */}
                                        <div className="flex flex-col items-center justify-center">
                                            <ChatAlt2Icon onClick={handleClickComment} className="w-6 h-6" />
                                            <div>{documents && documents.comments}</div>
                                        </div>
                                        {/* views */}
                                        <div className="flex flex-col items-center justify-center">
                                            <EyeIcon className="w-6 h-6" />
                                            <div>{documents && documents.views}</div>
                                        </div>
                                        {/* share */}
                                        <div className="flex flex-col items-center justify-center">
                                            <ShareIcon className="w-5 h-5" />
                                            <div>Share</div>
                                        </div>
                                        {/* report */}
                                        <div className="flex flex-col items-center justify-center">
                                            <ExclamationCircleIcon onClick={handleClickReport} className={`${isUserReported ? 'fill-yellow-200' : ''} w-5 h-5 duration-300 ease-out hover:scale-125`} />
                                            <div>{isUserReported ? 'Reported' : 'Report'}</div>
                                        </div>

                                    </div>
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