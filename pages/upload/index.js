import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { BsPlusSquare } from 'react-icons/bs'
import { TbArrowBigRightLines } from 'react-icons/tb'
import PreviewDialog from '../../components/PreviewDialog'
import { useAuthContext } from '../../hooks/useAuthContext'

export default function Upload() {

    const { user } = useAuthContext()
    const router = useRouter()

    const [imgList, setImgList] = useState([])
    const [dragable, setDragable] = useState(false)

    // redirect to login page if user not log in
    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    }, [router, user])

    const handleAddImage = (e) => {
        e.preventDefault()
        let selectedImg = e.target.files

        if (selectedImg.length > 0) {
            for (let i = 0; i < selectedImg.length; i++) {
                const imgLinkList = URL.createObjectURL(selectedImg[i])
                setImgList((prev) => [...prev, imgLinkList])
            }
        }
        e.target.value = ''
    }

    const resetImageList = () => {
        setImgList([])
    }

    function deleteHandler(image) {
        let newList = []
        for (let i = 0; i < imgList.length; i++) {

            if (imgList[i] !== image) {
                newList = [...newList, imgList[i]]
            }
        }
        setImgList(newList)
    }

    console.log(imgList)

    return (
        <div className="pt-[83px]">
            {/* top menu */}
            <div className='fixed z-10 flex justify-center w-full top-23'>
                {imgList.length > 0 && (
                    <div className='flex w-11/12 h-16 px-3 py-2 space-x-3 text-sm font-bold bg-white border-2 rounded-lg shadow-lg md:w-2/3 lg:w-5/12 sm:text-lg'>
                        <button
                            onClick={() => setDragable(true)}
                            className="w-1/3 text-white bg-gradient-to-r from-[#3d3f41] to-[#414345] rounded"
                        >Edit Preview</button>
                        <button
                            onClick={() => setDragable(true)}
                            className="w-1/3 text-white rounded bg-gradient-to-r from-[#2dbdb1] to-[#38ef7d]"
                        >Confirm</button>
                        <button
                            onClick={() => resetImageList()}
                            className="w-1/3 text-white rounded bg-gradient-to-r from-[#CB356B] to-[#ce4d3f]"
                        >Reset All</button>
                    </div>
                )}
            </div>
            <PreviewDialog dragable={dragable} setDragable={setDragable} imgList={imgList} />
            <div className={`w-4/6 p-3 mx-auto ${imgList.length > 0 ? 'mt-[72px]' : ''} bg-white border shadow-sm `}>
                <div className="flex flex-wrap items-center justify-center ">
                    {/* grid item */}
                    {imgList.map((img, index) => {
                        return (
                            <Fragment key={index}>
                                <div onClick={() => deleteHandler(img)} className="p-3 m-2 border rounded shadow-sm">
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
                            <div className='flex items-center justify-end space-x-1 text-gray-600 text-md sm:text-lg md:text-xl lg:text-2xl'>
                                <span>Start upload by clicking button</span>
                            </div>
                        </div>
                    )}
                    <label type='file' className="p-4 m-2 duration-100 ease-out border rounded cursor-pointer h-36 w-36 hover:scale-105">
                        <div className="flex items-center justify-center w-full h-full p-1 border-2 border-dashed">
                            <div className='flex items-center justify-center duration-100 ease-out hover:scale-110 max-w-[180px]'>
                                <div>
                                    <BsPlusSquare className='w-10 h-10 invert-[50%]' />
                                </div>
                            </div>
                        </div>
                        <input id="dropzone-file" type="file" multiple onChange={e => handleAddImage(e)} className="hidden" />
                    </label>
                </div>
                <div className='w-full text-center text-gray-500'>
                    <span className='text-[12px] '>By creating a post, you agree to Rotaze&#39;s <a className=''>Terms of Service</a> and <a>Privacy Policy</a></span>
                </div>
            </div>
        </div>
    )
}