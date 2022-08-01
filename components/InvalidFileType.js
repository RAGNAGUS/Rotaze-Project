import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function InvalidFileType({ isError, setIsError }) {

    return (

        <Transition show={isError} as={Fragment}>
            <Dialog onClose={() => setIsError(false)} className="relative z-50">

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className='fixed inset-0 flex items-center justify-center'>
                        <Dialog.Panel className="flex flex-col items-start w-full max-w-sm mx-5 text-left bg-white pl-7 justify-evenly h-52 rounded-xl">
                            <Dialog.Title className="text-xl font-bold text-gray-800">Only image file can be selected</Dialog.Title>
                            <Dialog.Description className="text-gray-600">
                                The image must be a file of type: png, jpg, jpeg
                            </Dialog.Description>
                            <button className='h-10 text-xl text-white bg-gray-600 rounded-md w-28' onClick={() => setIsError(false)}>Got it !</button>
                        </Dialog.Panel>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    )
}