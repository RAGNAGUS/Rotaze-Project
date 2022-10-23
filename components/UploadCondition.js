import { React, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { ImImage, ImImages } from 'react-icons/im'
import { AiOutlineFileGif } from 'react-icons/ai'

export default function UploadCondition({
    isSelectCondition,
    setIsSelectCondition,
    setIsConditionIsGIF,
    setIsConditionIsSingleImage,
    setIsConditionIsMultipleImage,
    setIsPreview
}) {

    const singleImgHandler = () => {
        setIsConditionIsGIF(false)
        setIsConditionIsMultipleImage(false)
        setIsPreview(false)
        setIsConditionIsSingleImage(true)
        setIsSelectCondition(true)
    }
    const multipleImgHandler = () => {
        setIsConditionIsGIF(false)
        setIsConditionIsSingleImage(false)
        setIsPreview(false)
        setIsConditionIsMultipleImage(true)
        setIsSelectCondition(true)
    }
    const gifImgHandler = () => {
        setIsConditionIsMultipleImage(false)
        setIsConditionIsSingleImage(false)
        setIsPreview(false)
        setIsConditionIsGIF(true)
        setIsSelectCondition(true)
    }

    return (

        <Transition.Root show={!isSelectCondition} as={Fragment}>
            <Dialog as="div" className="relative z-20 " onClose={() => setIsSelectCondition(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 transition-opacity bg-gray-300 bg-opacity-75" />
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
                                <div className="px-4 pt-5 pb-4 bg-white rounded-lg sm:p-6 sm:pb-8">
                                    <div className="flex flex-col sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3" className="pb-1 text-lg font-medium leading-6 text-gray-600 ">
                                                Select which you prefer
                                            </Dialog.Title>
                                        </div>
                                        <div className='flex flex-col items-center justify-center w-full px-3 mt-3 space-y-2'>
                                            <div onClick={singleImgHandler} className="flex items-center justify-start w-full px-5 py-5 space-x-3 duration-300 ease-out border-2 rounded-lg cursor-pointer hover:border-gray-500 hover:scale-105">
                                                <ImImage className='w-20 h-20 invert-[20%]' />
                                                <div>
                                                    <span className='text-xl font-semibold'>Single Image</span>
                                                    <p className='text-sm'>Normal image</p>
                                                </div>
                                            </div>
                                            <div onClick={multipleImgHandler} className="flex items-center justify-start w-full px-5 py-5 space-x-3 duration-300 ease-out border-2 rounded-lg cursor-pointer hover:border-gray-500 hover:scale-105">
                                                <ImImages className='w-20 h-20 invert-[20%]' />
                                                <div>
                                                    <span className='text-xl font-semibold'>Multiple Image</span>
                                                    <p className='text-sm'>Rotatable image</p>
                                                </div>
                                            </div>
                                            <div onClick={gifImgHandler} className="flex items-center justify-start w-full px-5 py-5 space-x-3 duration-300 ease-out border-2 rounded-lg cursor-pointer hover:border-gray-500 hover:scale-105">
                                                <AiOutlineFileGif className='w-20 h-20 invert-[20%]' />
                                                <div>
                                                    <span className='text-xl font-semibold'>GIF Image</span>
                                                    <p className='text-sm'>Animated image</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button></button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}