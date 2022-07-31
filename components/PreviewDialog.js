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
        <div className={`fixed z-10 -mt-[10px] pt-16 pl-28 w-screen h-screen ${dragable ? 'backdrop-opacity-10 backdrop-invert bg-black/30' : 'pointer-events-none'}`}>
            {imgList.length > 0 && (
                < Draggable Draggable bounds="parent" nodeRef={nodeRef}>
                    <div ref={nodeRef} className="fixed flex flex-col duration-300 ease-out bg-white border border-gray-300 rounded-lg shadow-2xl w-96">
                        <div className="flex items-center justify-between mx-5 my-3">
                            <div className="px-3 py-2 border rounded-md">
                                Model Preview
                            </div>
                            {dragable && (
                                <div className="cursor-grab">
                                    <RiDragMoveFill className="w-8 h-8 invert-[35%]" />
                                </div>
                            )}
                        </div>
                        <div className="flex items-center justify-center mx-3 mb-4 border shadow-inner">
                            <div className="pointer-events-none ">
                                <img src={imgList[showImg]} alt="" />
                            </div>
                        </div>

                        {/* configs */}
                        {dragable && (
                            <div>
                                <div className="cursor-pointer">settings</div>
                                <div className="flex flex-col items-center justify-evenly">
                                    <div className="py-2">
                                        <span>Frame Per Second</span>
                                    </div>
                                    <div>
                                        <button onClick={() => minusFive()} className="fps-edit-btn">-5</button>
                                        <button onClick={() => minusOne()} className="fps-edit-btn">-1</button>
                                        <input type="number" className='w-10 ring' value={fps} />
                                        <button onClick={() => plusOne()} className="fps-edit-btn">+1</button>
                                        <button onClick={() => plusFive()} className="fps-edit-btn">+5</button>
                                    </div>
                                </div>

                                <button onClick={() => setDragable(false)}>
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