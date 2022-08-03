import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthContext } from '../hooks/useAuthContext'

// conponents
import PreviewDialog from '../components/PreviewDialog'
import InvalidFileType from '../components/InvalidFileType'
import PostDetails from '../components/PostDetails'

// icons
import { BsPlusSquare } from 'react-icons/bs'
import UploadCondition from '../components/UploadCondition'

export default function Upload() {

    const { user } = useAuthContext()
    const router = useRouter()

    // upload condition variable declaration
    const [isSelectCondition, setIsSelectCondition] = useState(false)
    const [isConditionIsGIF, setIsConditionIsGIF] = useState(false)
    const [isConditionIsSingleImage, setIsConditionIsSingleImage] = useState(false)
    const [isConditionIsMultipleImage, setIsConditionIsMultipleImage] = useState(false)

    const [isError, setIsError] = useState(false)
    const [errorMsg, setErrorMsg] = useState({})
    const [isConfirm, setisConfirm] = useState(false)
    const [imgList, setImgList] = useState([])
    const [uploadImageList, setUploadImageList] = useState([])
    const [dragable, setDragable] = useState(false)
    const [isPreview, setIsPreview] = useState(false)

    // redirect to login page if user not log in
    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    }, [router, user])

    const handleAddImage = (e) => {
        e.preventDefault()
        setIsError(false)
        let selectedImg = e.target.files

        if (selectedImg.length > 0) {
            if (isConditionIsMultipleImage) {
                for (let i = 0; i < selectedImg.length; i++) {
                    switch (selectedImg[i].type) {
                        case 'image/png':
                        case 'image/jpg':
                        case 'image/jpeg':
                            const imgLinkList = URL.createObjectURL(selectedImg[i])
                            setImgList((prev) => [...prev, imgLinkList])
                            const uploadLink = selectedImg[i]
                            setUploadImageList(prev => [...prev, uploadLink])
                            break;
                        default:
                            setIsError(true)
                            setErrorMsg({
                                title: 'Only image file can be selected',
                                detail: 'The image must be a file of type: png, jpg, jpeg'
                            })
                            break;
                    }
                }
            }
            if (isConditionIsSingleImage) {
                switch (selectedImg[0].type) {
                    case 'image/png':
                    case 'image/jpg':
                    case 'image/jpeg':
                        const imgLinkList = URL.createObjectURL(selectedImg[0])
                        setImgList((prev) => [...prev, imgLinkList])
                        const uploadLink = selectedImg[0]
                        setUploadImageList(prev => [...prev, uploadLink])
                        break;
                    default:
                        setIsError(true)
                        setErrorMsg({
                            title: 'Only image file can be selected',
                            detail: 'The image must be a file of type: png, jpg, jpeg'
                        })
                        break;
                }
            }
            if (isConditionIsGIF) {
                switch (selectedImg[0].type) {
                    case 'image/gif':
                        const imgLinkList = URL.createObjectURL(selectedImg[0])
                        setImgList((prev) => [...prev, imgLinkList])
                        const uploadLink = selectedImg[0]
                        setUploadImageList(prev => [...prev, uploadLink])
                        break;
                    default:
                        setIsError(true)
                        setErrorMsg({
                            title: 'Only image file can be selected',
                            detail: 'The image must be a file of type: gif'
                        })
                        break;
                }
            }
        }
        e.target.value = ''
    }

    const resetImageList = () => {
        setImgList([])
        setUploadImageList([])
    }

    function deleteHandler(index) {
        let newList = []
        let uploadNewList = []
        for (let i = 0; i < imgList.length; i++) {

            if (imgList[i] !== imgList[index]) {
                newList = [...newList, imgList[i]]
            }
        }
        for (let i = 0; i < uploadImageList.length; i++) {

            if (uploadImageList[i] !== uploadImageList[index]) {
                uploadNewList = [...uploadNewList, uploadImageList[i]]
            }
        }
        setImgList(newList)
        setUploadImageList(uploadNewList)
    }
    return (
        <div className="pt-[83px] h-screen">

            {/* upload condition */}
            <UploadCondition
                isSelectCondition={isSelectCondition}
                setIsSelectCondition={setIsSelectCondition}
                setIsConditionIsGIF={setIsConditionIsGIF}
                setIsConditionIsSingleImage={setIsConditionIsSingleImage}
                setIsConditionIsMultipleImage={setIsConditionIsMultipleImage}
                setIsPreview={setIsPreview}
            />

            {/* Post Details */}
            <div className='fixed'>
                <PostDetails isConfirm={isConfirm} setisConfirm={setisConfirm} isConditionIsMultipleImage={isConditionIsMultipleImage} uploadImageList={uploadImageList} isConditionIsGIF={isConditionIsGIF} isConditionIsSingleImage={isConditionIsSingleImage} />
            </div>

            {/* Invalid File Type Alert */}
            <div className='fixed'>
                <InvalidFileType isError={isError} setIsError={setIsError} errorMsg={errorMsg} />
            </div>

            {/* top menu */}
            <div className='fixed z-20 flex justify-center w-full top-23'>
                {imgList.length > 0 && (
                    <div className={`flex w-11/12 h-16 px-3 py-2 space-x-3 text-sm font-bold bg-white border-2 rounded-lg shadow-lg md:w-2/3 ${isConditionIsMultipleImage ? 'lg:w-5/12' : 'lg:w-3/12'} sm:text-lg`}>
                        {isPreview && isConditionIsMultipleImage && (
                            <button
                                onClick={() => setDragable(true)}
                                className="w-1/3 text-white bg-gradient-to-r from-[#3d3f41] to-[#414345] rounded focus:outline-none"
                            >Edit Preview</button>
                        )}
                        {isConditionIsMultipleImage && (
                            <button
                                onClick={() => setIsPreview(!isPreview)}
                                className="w-1/3 text-white bg-gradient-to-r from-[#3d3f41] to-[#414345] rounded focus:outline-none"
                            >{isPreview ? 'Hide Preview' : 'Preview'}</button>
                        )}
                        <button
                            onClick={() => setisConfirm(true)}
                            className={`${isConditionIsMultipleImage ? 'w-1/3' : 'w-1/2'} text-white rounded bg-gradient-to-r from-[#2dbdb1] to-[#38ef7d] focus:outline-none`}
                        >Confirm</button>
                        <button
                            onClick={() => resetImageList()}
                            className={`${isConditionIsMultipleImage ? 'w-1/3' : 'w-1/2'} text-white rounded bg-gradient-to-r from-[#CB356B] to-[#ce4d3f] focus:outline-none`}
                        >{isConditionIsMultipleImage ? 'Reset All' : 'Reset'}</button>
                    </div>
                )}
            </div>
            <div className={`${isPreview ? '' : 'hidden'}`}>
                <PreviewDialog dragable={dragable} setDragable={setDragable} imgList={imgList} />
            </div>

            {/* single image condition */}
            {isSelectCondition && isConditionIsSingleImage && (
                <div className={`w-5/6 lg:w-4/6  p-3 mx-auto ${imgList.length > 0 ? 'mt-[72px]' : ''} bg-white border shadow-sm `}>
                    {imgList.length < 1 && (
                        <div>
                            <button onClick={() => setIsSelectCondition(false)}
                                className="static w-20 h-10 mb-2 text-gray-800 border border-gray-300 rounded-md shadow-sm md:fixed md:mb-0">Change</button>
                        </div>
                    )}
                    <div className="flex flex-wrap items-center justify-center ">
                        {/* grid item */}
                        {imgList.map((img, index) => {
                            return (
                                <Fragment key={index}>
                                    <div onClick={() => deleteHandler(index)} className="p-3 m-2 border rounded shadow-sm">
                                        <div className="flex items-center justify-center border-[3px] border-dashed p-2 w-full h-full">
                                            <div className='duration-100 ease-out hover:scale-[1.3] max-w-[180px]'>
                                                <img src={img} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        })}
                        {imgList.length < 1 && (
                            <>
                                <div className='flex flex-col space-y-1 md:mr-5'>
                                    <div className='flex items-center justify-end space-x-1 text-center text-gray-600 text-md sm:text-lg md:text-xl lg:text-2xl'>
                                        <span>Start upload image by click the button</span>
                                    </div>
                                </div>

                                <label className="p-4 m-2 duration-100 ease-out border rounded cursor-pointer h-36 w-36 hover:scale-105">
                                    <div className="flex items-center justify-center w-full h-full p-1 border-2 border-dashed">
                                        <div className='flex items-center justify-center duration-100 ease-out hover:scale-110 max-w-[180px]'>
                                            <div>
                                                <BsPlusSquare className={`${dragable ? 'hidden' : 'block'} w-10 h-10 invert-[50%]`} />
                                            </div>
                                        </div>
                                    </div>
                                    <input id="dropzone-file" type="file" accept=".png, .jpg, .jpeg" onChange={e => handleAddImage(e)} className="hidden" />
                                </label>
                            </>
                        )}
                    </div>
                    <div className='w-full text-center text-gray-500'>
                        <span className='text-[12px] '>By creating a post, you agree to Rotaze&#39;s <a className=''>Terms of Service</a> and <a>Privacy Policy</a></span>
                    </div>
                </div>
            )}

            {/* multiple image condition */}
            {isSelectCondition && isConditionIsMultipleImage && (
                <div className={`w-5/6 lg:w-4/6  p-3 mx-auto ${imgList.length > 0 ? 'mt-[72px]' : ''} bg-white border shadow-sm `}>
                    {imgList.length < 1 && (
                        <div>
                            <button onClick={() => setIsSelectCondition(false)}
                                className="static w-20 h-10 mb-2 text-gray-800 border border-gray-300 rounded-md shadow-sm md:fixed md:mb-0">Change</button>
                        </div>
                    )}
                    <div className="flex flex-wrap items-center justify-center ">
                        {/* grid item */}
                        {imgList.map((img, index) => {
                            return (
                                <Fragment key={index}>
                                    <div onClick={() => deleteHandler(index)} className="p-3 m-2 border rounded shadow-sm">
                                        <div className="flex items-center justify-center border-[3px] border-dashed p-2 w-full h-full">
                                            <div className='duration-100 ease-out hover:scale-[1.3] max-w-[180px]'>
                                                <img src={img} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        })}
                        {imgList.length < 1 && (
                            <div className='flex flex-col space-y-1 md:mr-5'>
                                <div className='flex items-center justify-end space-x-1 text-center text-gray-600 text-md sm:text-lg md:text-xl lg:text-2xl'>
                                    <span>Start upload images by click the button</span>
                                </div>
                            </div>
                        )}
                        <label className="p-4 m-2 duration-100 ease-out border rounded cursor-pointer h-36 w-36 hover:scale-105">
                            <div className="flex items-center justify-center w-full h-full p-1 border-2 border-dashed">
                                <div className='flex items-center justify-center duration-100 ease-out hover:scale-110 max-w-[180px]'>
                                    <div>
                                        <BsPlusSquare className={`${dragable ? 'hidden' : 'block'} w-10 h-10 invert-[50%]`} />
                                    </div>
                                </div>
                            </div>
                            <input id="dropzone-file" type="file" multiple accept=".png, .jpg, .jpeg" onChange={e => handleAddImage(e)} className="hidden" />
                        </label>
                    </div>
                    <div className='w-full text-center text-gray-500'>
                        <span className='text-[12px] '>By creating a post, you agree to Rotaze&#39;s <a className=''>Terms of Service</a> and <a>Privacy Policy</a></span>
                    </div>
                </div>
            )}

            {/* gif image condition */}
            {isSelectCondition && isConditionIsGIF && (
                <div className={`w-5/6 lg:w-4/6  mx-auto ${imgList.length > 0 ? 'mt-[72px]' : ''} bg-white border shadow-sm `}>
                    {imgList.length < 1 && (
                        <div>
                            <button onClick={() => setIsSelectCondition(false)}
                                className="static w-20 h-10 mt-3 mb-2 ml-3 text-gray-800 border border-gray-300 rounded-md shadow-sm md:fixed md:mb-0">Change</button>
                        </div>
                    )}
                    <div className="flex flex-wrap items-center justify-center ">
                        {/* grid item */}
                        {imgList.map((img, index) => {
                            return (
                                <Fragment key={index}>
                                    <div onClick={() => deleteHandler(index)} className="p-3 m-2 border rounded shadow-sm">
                                        <div className="flex items-center justify-center border-[3px] border-dashed p-2 w-full h-full">
                                            <div className='duration-100 ease-out hover:scale-[1.3] max-w-[180px]'>
                                                <img src={img} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        })}
                        {imgList.length < 1 && (
                            <>
                                <div className='flex flex-col space-y-1 md:mr-5'>
                                    <div className='flex items-center justify-end space-x-1 text-center text-gray-600 text-md sm:text-lg md:text-xl lg:text-2xl'>
                                        <span>Start upload GIF by click the button</span>
                                    </div>
                                </div>

                                <label className="p-4 m-2 duration-100 ease-out border rounded cursor-pointer h-36 w-36 hover:scale-105">
                                    <div className="flex items-center justify-center w-full h-full p-1 border-2 border-dashed">
                                        <div className='flex items-center justify-center duration-100 ease-out hover:scale-110 max-w-[180px]'>
                                            <div>
                                                <BsPlusSquare className={`${dragable ? 'hidden' : 'block'} w-10 h-10 invert-[50%]`} />
                                            </div>
                                        </div>
                                    </div>
                                    <input id="dropzone-file" type="file" accept=".gif" onChange={e => handleAddImage(e)} className="hidden" />
                                </label>
                            </>
                        )}
                    </div>
                    <div className='w-full text-center text-gray-500'>
                        <span className='text-[12px] '>By creating a post, you agree to Rotaze&#39;s <a className=''>Terms of Service</a> and <a>Privacy Policy</a></span>
                    </div>
                </div>
            )}

        </div>
    )
}