import Link from 'next/link'

import { FcGoogle } from 'react-icons/fc'
import { TbArrowBack } from 'react-icons/tb'

const Signup = () => {
    return (
        <div className='fixed z-20 w-screen h-screen bg-[#ffffff]'>

            <div className='w-48 py-3 m-3 ml-5 text-gray-800 border rounded-md cursor-pointer '>
                <Link href="/">
                    <div className='flex items-center justify-center space-x-3'>
                        <TbArrowBack />
                        <h3>Back to home page</h3>
                    </div>
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-lg p-4 bg-white border rounded-md ">
                    <div className="py-2 mx-8 mt-5 text-6xl text-center text-gray-500 border-2 border-gray-400 rounded-lg">
                        <h1>ROTAZE</h1>
                    </div>
                    <div className='flex justify-center w-full mt-5 mb-1 text-sm text-gray-600'>
                        Sign up with
                    </div>
                    <div className='flex items-center justify-center w-full'>
                        <div className="flex rounded items-center p-[2px] w-8/12 bg-[#4285f4] border shadow-sm">
                            <div className='p-2 bg-white rounded-sm'>
                                <FcGoogle className='w-6 h-6' />
                            </div>
                            <div className='ml-auto mr-auto font-bold text-white '>
                                <span>Sign up with Google</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center w-full mt-4 mb-1 text-sm text-gray-600'>
                        or with Rotaze
                    </div>
                    <div className="px-5 py-1 bg-white">
                        <form className="space-y-3">
                            <label className="flex flex-col">
                                <input
                                    type="text"
                                    placeholder="Display Name"
                                    required
                                    className="input-form" />
                            </label>
                            <label className="flex flex-col">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    required
                                    className="input-form" />
                            </label>
                            <label className="flex flex-col">
                                <input
                                    type="text"
                                    placeholder="Password"
                                    required
                                    className="input-form" />
                            </label>
                            <label className="flex flex-col">
                                <input
                                    type="text"
                                    placeholder="Retype Password"
                                    required
                                    className="input-form" />
                            </label>
                            <div className="flex items-center justify-end w-full pt-2 space-x-3">
                                <span className="text-sm text-right text-gray-800"><Link href="/login"><a>already have an account ?</a></Link></span>
                                <button className="h-10 text-white bg-gray-600 border rounded-md shadow-sm w-28">
                                    <span>Sign up</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='flex items-center justify-end w-full max-w-lg pt-2 pr-5 space-x-5 text-gray-800'>
                    <h3>privacy</h3>
                    <h3>terms</h3>
                </div>
            </div>
        </div>
    );
}

export default Signup;