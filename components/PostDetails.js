import { React, Fragment } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Dialog, Transition } from '@headlessui/react'

const animatedComponents = makeAnimated();

const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "" }),
    option: (styles) => ({ ...styles, color: "#1f2937" }),
    multiValue: (styles) => ({ ...styles, color: "" }),
    multiValueLabel: (styles) => ({ ...styles, backgroundColor: "#4a6283", color: "white" }),
    multiValueRemove: (styles) => ({ ...styles, backgroundColor: "", }),
}
const options = [
    { value: 'strawberry2', label: 'Strawberry' },
    { value: 'chocolate3', label: 'Chocolate' },
    { value: 'strawberry4', label: 'Strawberry' },
    { value: 'chocolate5', label: 'Chocolate' },
    { value: 'strawb5erry', label: 'Strawberry' },
    { value: 'choco5late', label: 'Chocolate' },
    { value: 'straw5berry', label: 'Strawberry' },
    { value: 'ch5ocolate', label: 'Chocolate' },
    { value: 'stra6wberry', label: 'Strawberry' },
    { value: 'choc6olate', label: 'Chocolate' },
    { value: 'straw7berry', label: 'Strawberry' },
    { value: 'choco4late', label: 'Chocolate' },
    { value: 'straw3berry', label: 'Strawberry' },
    { value: 'choc5olate', label: 'Chocolate' },
    { value: 'strawb7erry', label: 'Strawberry' },
    { value: 'choc8olate', label: 'Chocolate' },
    { value: 'stra9wberry', label: 'Strawberry' },
    { value: 'vanil9la', label: 'Vanilla' }
]

export default function PostDetails({ isConfirm, setisConfirm, imgList }) {

    const handleChange = (selectedOption) => {
        console.log(selectedOption)
    }

    return (

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
                                                        <input type="text" className='pl-2 pr-1 duration-300 ease-in-out border-2 rounded-md outline-none h-9 focus:border-gray-400 focus:h-12' />
                                                    </label>
                                                    <label className='flex flex-col '>
                                                        <span className='pb-0.5'>Description:</span>
                                                        <textarea type="text" className='h-20 p-1 px-2 duration-300 ease-in-out border-2 rounded-md outline-none focus:h-40' />
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
                                <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setisConfirm(false)}
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
    )
}