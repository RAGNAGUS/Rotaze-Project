/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable"

// import icon
import { RiDragMoveFill } from 'react-icons/ri'
import { XIcon } from '@heroicons/react/outline'

export default function PreviewDialog({ dragable, setDragable, imgList, isPreview, setIsPreview }) {

    const [showImg, setShowImg] = useState(0)
    const [fps, setFps] = useState(10)
    const [playSpeed, setPlaySpeed] = useState(100)
    const nodeRef = useRef(null)

    useEffect(() => {
        const interval = setInterval(() => {

            setShowImg((prev) => {
                return prev > imgList.length - 2 ? 0 : prev + 1
            })

        }, playSpeed);
        return () => clearInterval(interval);
    }, [imgList, playSpeed])

    useEffect(() => {
        if (fps > 60) {
            setFps(60)
        }
        if (fps < 1) {
            setFps(1)
        }
    }, [fps])

    const plusOne = () => {
        setFps(fps + 1)
        setPlaySpeed(1000 / fps)
    }
    const plusFive = () => {
        setFps(fps + 5)
        setPlaySpeed(1000 / fps)
    }
    const minusOne = () => {
        setFps(fps - 1)
        setPlaySpeed(1000 / fps)
    }
    const minusFive = () => {
        setFps(fps - 5)
        setPlaySpeed(1000 / fps)
    }

    return (
        <div className={`fixed z-20 -mt-[10px] pt-20 pl-5 w-screen h-screen ${dragable ? 'backdrop-opacity-10 backdrop-invert bg-black/30' : 'pointer-events-none'}`}>
            {imgList.length > 0 && (
                < Draggable Draggable bounds="parent" nodeRef={nodeRef}>
                    <div ref={nodeRef} className="relative flex flex-col duration-300 ease-out bg-gray-800 rounded-lg shadow-2xl w-52 md:w-80 lg:w-96 sm:w-72">
                        <div className={`${dragable ? 'my-1' : 'mt-[4px]'}`}>
                            {dragable && (
                                <div className="flex items-center justify-start py-1 pl-10">
                                    <div className="mr-auto"></div>
                                    <div className="cursor-grab">
                                        <RiDragMoveFill className="w-8 h-8 text-white sm:w-9 sm:h-9" />
                                    </div>
                                    {/* Hide Preview */}
                                    <XIcon
                                        onClick={() => setIsPreview(!isPreview)}
                                        className="w-6 h-6 ml-auto mr-3 text-gray-800 bg-white rounded cursor-pointer sm:w-7 sm:h-7">
                                    </XIcon>
                                </div>
                            )}
                        </div>
                        {/* image animation */}
                        <div className={`flex items-center justify-center mx-1 mb-1 ${dragable ? 'mx-[8px]' : ''} bg-white  border-gray-300 shadow-inner rounded-lg`}>
                            <div className="pointer-events-none ">
                                <img src={imgList[showImg]} alt="" className="rounded" />
                            </div>
                        </div>
                        {/* configs */}
                        {dragable && (
                            <div className="flex flex-col mb-2 space-y-3">
                                <div className="flex flex-col items-center space-y-2 justify-evenly">
                                    <div className="text-sm text-white sm:text-lg">
                                        <span>Frame Per Second: {fps}</span>
                                    </div>
                                    <div className="grid justify-center grid-cols-2 gap-1 text-white lg:grid-cols-4 sm:gap-2 sm:text-lg">
                                        <button onClick={() => plusOne()} className="fps-edit-btn">+1</button>
                                        <button onClick={() => plusFive()} className="fps-edit-btn">+5</button>
                                        <button onClick={() => minusOne()} className="fps-edit-btn">-1</button>
                                        <button onClick={() => minusFive()} className="fps-edit-btn">-5</button>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setDragable(false)}
                                    className="p-3 mx-3 font-bold text-gray-800 bg-white rounded-md text-md md:text-xl"
                                >
                                    Confirm
                                </button>
                            </div>
                        )}
                    </div>
                </Draggable>
            )}
        </div >
    )
}