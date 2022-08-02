import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Morpheus from 'morpheus-image-resize';
import { v4 as uuidv4 } from 'uuid';
import { useAuthContext } from '../hooks/useAuthContext'
import { Dialog, Transition } from '@headlessui/react'
import { React, Fragment, useState, useEffect } from 'react'

// firebase
import { db, storage } from '../firebase/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

// style selection box
const animatedComponents = makeAnimated();
const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "" }),
    option: (styles) => ({ ...styles, color: "#1f2937" }),
    multiValue: (styles) => ({ ...styles, color: "" }),
    multiValueLabel: (styles) => ({ ...styles, backgroundColor: "#4a6283", color: "white" }),
    multiValueRemove: (styles) => ({ ...styles, backgroundColor: "", }),
}

export default function PostDetails({ isConfirm, setisConfirm, uploadImageList, isConditionIsGIF, isConditionIsSingleImage, isConditionIsMultipleImage }) {

    const { user } = useAuthContext()
    const router = useRouter()

    // width for image resize
    let widthMultiImage = 300
    let widthSingleImage = 800
    let widthThumbnail = 800

    //options for Selection box
    const [options, setOptions] = useState([])
    // input from user
    const [postTitle, setPostTitle] = useState('')
    const [postDescription, setPostDescription] = useState('')
    const [postTags, setPostTags] = useState([])

    // upload section
    const [generateID, setGenerateID] = useState('')
    const [progress, setProgress] = useState(0)
    const [postType, setPostType] = useState(0)
    const [downloadUrlList, setDownloadUrlList] = useState([])
    const [imageResizeList, setImageResizeList] = useState([])
    const [thumbnail, setThumbnail] = useState([])
    const [thumbnailUrl, setThumbnailUrl] = useState([])
    const [isStartUpload, setIsStartUpload] = useState(false)
    const [isEverythingFinish, setIsEverythingFinish] = useState(false)

    const handleChange = (selectedOption) => {
        let result = []
        selectedOption.map(option => {
            result = [...result, option.value]
        })
        setPostTags(result)
    }

    // useEffect for set image type
    useEffect(() => {
        if (isConditionIsSingleImage) {
            setPostType(0)
        }
        if (isConditionIsMultipleImage) {
            setPostType(1)
        }
        if (isConditionIsGIF) {
            setPostType(2)
        }
    }, [isConditionIsGIF, isConditionIsMultipleImage, isConditionIsSingleImage])


    // useEffect for fetch Selection option from db
    useEffect(() => {
        const getOptions = async () => {
            const optionsRef = collection(db, "tags")
            const snapshot = await getDocs(optionsRef)
            let result = []
            snapshot.forEach((doc) => {
                result = [...result, doc.data()]
            });
            setOptions(result)
        }
        getOptions()
    }, [isConfirm])

    // useEffect for set things and resize file
    useEffect(() => {
        // generate id
        setGenerateID(uuidv4())
        // reset every variable
        setPostTags([])
        setProgress(0)
        setThumbnail([])
        setThumbnailUrl([])
        setImageResizeList([])

        // resize for  multiple image
        if (uploadImageList.length > 0 && isConditionIsMultipleImage) {
            for (let i = 0; i < uploadImageList.length; i++) {
                Morpheus.resize(uploadImageList[i], {
                    width: widthMultiImage
                })
                    .then(canvas => Morpheus.toFile(canvas, `image_${i}`))
                    .then(image => {
                        setImageResizeList(prev => [...prev, image])
                    });
                setTimeout(() => {
                }, 100);
            }
            // resize thumbnail for  multiple image
            Morpheus.resize(uploadImageList[0], {
                width: widthThumbnail
            })
                .then(canvas => Morpheus.toFile(canvas, 'thumbnail'))
                .then(image => {
                    setThumbnail(prev => [...prev, image])
                });
            setTimeout(() => {
            }, 100);
        }

        // resize for single image
        if (uploadImageList.length > 0 && isConditionIsSingleImage) {
            for (let i = 0; i < uploadImageList.length; i++) {
                Morpheus.resize(uploadImageList[i], {
                    width: widthSingleImage
                })
                    .then(canvas => Morpheus.toFile(canvas, 'image'))
                    .then(image => {
                        setImageResizeList(prev => [...prev, image])
                    });
                setTimeout(() => {
                }, 100);
            }
            // resize thumbnail for  single image
            Morpheus.resize(uploadImageList[0], {
                width: widthThumbnail
            })
                .then(canvas => Morpheus.toFile(canvas, 'thumbnail'))
                .then(image => {
                    setThumbnail(prev => [...prev, image])
                });
            setTimeout(() => {
            }, 100);
        }
        // skip reducing the file size if it's GIF
        if (uploadImageList.length > 0 && isConditionIsGIF) {
            setImageResizeList(prev => [...prev, uploadImageList[0]])
            setThumbnail(prev => [...prev, uploadImageList[0]])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadImageList])

    // trigger when click Confirm Post
    const handleConfirmPost = async () => {
        setisConfirm(false)
        setIsStartUpload(true)
        setDownloadUrlList([])
        setProgress(0)

        if (thumbnail.length > 0) {
            // uplaod thumbnail
            for (let i = 0; i < thumbnail.length; i++) {
                let storageRef = null
                storageRef = ref(storage, `posts/${generateID}/thumbnail/thumbnail`);
                try {
                    await uploadBytes(storageRef, thumbnail[i])
                    const url = await getDownloadURL(ref(storage, storageRef))
                    setThumbnailUrl(prev => [...prev, url])
                } catch (error) {
                    console.log(error)
                }
            }

            // upload images
            for (let i = 0; i < imageResizeList.length; i++) {
                let storageRef = null
                if (isConditionIsGIF || isConditionIsSingleImage) {
                    storageRef = ref(storage, `posts/${generateID}/images/image`);
                } else {
                    storageRef = ref(storage, `posts/${generateID}/images/${imageResizeList[i].name}`);
                }
                try {
                    await uploadBytes(storageRef, imageResizeList[i]).then(() => {
                        setProgress(Math.round((i / imageResizeList.length) * 100))
                    });
                    const url = await getDownloadURL(ref(storage, storageRef))
                    setDownloadUrlList(prev => [...prev, url])
                } catch (error) {
                    console.log(error);
                }
            }
            setProgress(100)
        }
    }

    // useEffect for upload image documents after all image upload to storage
    useEffect(() => {
        const uploadDocuments = async () => {
            if (progress === 100 && downloadUrlList.length > 0) {
                let images = downloadUrlList.sort(function (a, b) { return a - b })
                await setDoc(doc(db, 'posts', `${generateID}`), {
                    title: postTitle,
                    description: postDescription,
                    createdBy: user.uid,
                    images,
                    thumbnail: thumbnailUrl,
                    postTags,
                    postType,
                    reported: false,
                    createdAt: serverTimestamp()
                })
                setIsEverythingFinish(true)
            }
        }
        setTimeout(() => {
            uploadDocuments()
        }, 1000);

        if (isEverythingFinish) {
            // close loading popup
            setIsStartUpload(false)

            //push user to uploaded post page
            router.push(`/post/${generateID}`)

            // reset things after finish upload
            setPostTags([])
            setProgress(0)
            setThumbnail([])
            setThumbnailUrl([])
            setImageResizeList([])
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progress, isEverythingFinish])

    return (
        <>
            <Transition.Root show={isConfirm} as={Fragment}>
                <Dialog as="div" className="relative z-30 " onClose={() => setisConfirm(true)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-20 overflow-y-auto">
                        <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative w-full text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-lg sm:w-full">
                                    <div className="px-4 pt-5 pb-4 bg-white rounded-lg sm:p-6 sm:pb-4">
                                        <div className="flex flex-col sm:items-start">
                                            <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="pb-1 text-lg font-medium leading-6 text-gray-600 border-b">
                                                    Give your post some details
                                                </Dialog.Title>
                                            </div>
                                            <div className='flex w-full'>
                                                <div className="w-full mt-2 ">
                                                    <form className='flex flex-col w-full space-y-3 text-left text-gray-900'>
                                                        <label className='flex flex-col'>
                                                            <span className='pb-0.5'>Post title:</span>
                                                            <input type="text" onChange={e => setPostTitle(e.target.value)} value={postTitle} className='pl-2 pr-1 duration-300 ease-in-out border-2 rounded-md outline-none h-9 focus:border-gray-400 focus:h-12' />
                                                        </label>
                                                        <label className='flex flex-col '>
                                                            <span className='pb-0.5'>Description:</span>
                                                            <textarea type="text" onChange={e => setPostDescription(e.target.value)} value={postDescription} className='h-20 p-1 px-2 duration-300 ease-in-out border-2 rounded-md outline-none focus:h-40' />
                                                        </label>
                                                        <div className='w-fit'>
                                                            <span className='pb-0.5'>Select tags:</span>
                                                            <Select
                                                                closeMenuOnSelect={true}
                                                                components={animatedComponents}
                                                                styles={colourStyles}
                                                                isMulti
                                                                options={options}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 rounded-bl-xl rounded-br-xl bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={handleConfirmPost}
                                        >
                                            Confirm Post
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => setisConfirm(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={isStartUpload} as={Fragment}>
                <Dialog as="div" className="relative z-30 " onClose={() => setIsStartUpload(true)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-20 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative w-full text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-lg sm:w-full">
                                    <div className="px-4 pt-5 pb-4 bg-white rounded-lg sm:p-6 sm:pb-4">
                                        <div className="flex items-center justify-center ">
                                            <div className="w-full ">
                                                <div className='h-10 text-xl font-bold text-center text-gray-600'>Uploading {progress}%</div>
                                                <div className="w-full shadow-inner bg-[#f3f4f6] rounded">
                                                    <div className={` bg-gray-800 ${progress == 0 ? 'text-white' : 'text-gray-800'}  rounded-lg text-[20px] duration-100 ease-out`} style={{ width: `${progress}%` }}>.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex bg-white rounded-bl-lg rounded-br-lg ">
                                        <button
                                            type="button"
                                            onClick={() => setisConfirm(false)}
                                        >

                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}