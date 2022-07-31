import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable"
import { RiDragMoveFill } from 'react-icons/ri'

export default function PreviewDialog({ dragable, setDragable, imgList }) {

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
        <div className={`fixed z-10 -mt-[10px] pt-20 pl-5 w-screen h-screen ${dragable ? 'backdrop-opacity-10 backdrop-invert bg-black/30' : 'pointer-events-none'}`}>
            {imgList.length > 0 && (
                < Draggable Draggable bounds="parent" nodeRef={nodeRef}>
                    <div ref={nodeRef} className="fixed flex flex-col duration-300 ease-out bg-gray-800 shadow-2xl w-52 md:w-80 lg:w-96 sm:w-72">
                        <div className={`flex items-center justify-center ${dragable ? 'my-1' : 'mt-[4px]'}`}>
                            {dragable && (
                                <div className="cursor-grab">
                                    <RiDragMoveFill className="w-8 h-8 text-white sm:w-10 sm:h-10 md:w-10 md:h-10" />
                                </div>
                            )}
                        </div>
                        <div className={`flex items-center justify-center mx-1 mb-1 ${dragable ? 'mx-[8px]' : ''} bg-white  border-gray-300 shadow-inner`}>
                            <div className="pointer-events-none">
                                <img src={imgList[showImg]} alt="" />
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
                                    className="p-3 mx-3 text-gray-800 bg-white rounded-md"
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