import { Fragment, useState } from 'react'
import { BsPlusSquare } from 'react-icons/bs'

export default function Upload() {

    const [imgList, setImgList] = useState([])

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
            <div className="w-4/6 p-3 mx-auto bg-white border shadow-sm ">
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
                    <label type='file' className="p-4 m-2 duration-100 ease-out border rounded cursor-pointer h-36 w-36 hover:scale-105">
                        <div className="flex items-center justify-center border-[5px] border-dashed p-1 w-full h-full">
                            <div className='flex items-center justify-center duration-100 ease-out hover:scale-[1.3] max-w-[180px]'>
                                <div>
                                    <BsPlusSquare className='w-10 h-10 invert-[50%]' />
                                </div>
                            </div>
                        </div>
                        <input id="dropzone-file" type="file" multiple onChange={e => handleAddImage(e)} className="hidden" />
                    </label>
                </div>
            </div>
        </div>
    )
}