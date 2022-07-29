import Link from 'next/link'
import { TbArrowBack } from 'react-icons/tb'

const Login = () => {
    return (
        <div className='fixed z-20 w-screen h-screen bg-[#ffffff]'>

            <div className='w-48 py-3 m-3 ml-5 text-gray-800 border rounded-md cursor-pointer '>
                <Link href="/login">
                    <div className='flex items-center justify-center space-x-3'>
                        <TbArrowBack />
                        <h3>Back to login</h3>
                    </div>
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-lg p-4 bg-white border rounded-md ">
                    <div className="py-2 mx-8 mt-5 text-6xl text-center text-gray-500 border-2 border-gray-400 rounded-lg">
                        <h1>ROTAZE</h1>
                    </div>
                    <div className='flex flex-col items-center justify-center py-2 mx-auto space-y-3 text-center w-80'>
                        <h3 className='pt-3 font-bold'>Reset your password</h3>
                        <p>Enter your email and we&#39;ll send you a link to reset your password.</p>
                    </div>
                    <div className="px-5 py-1 bg-white">
                        <form className="space-y-3">
                            <label className="flex flex-col">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    required
                                    className="input-form" />
                            </label>
                            <div className="flex items-center justify-end w-full pt-2 space-x-3">
                                <button className="w-full h-10 text-white bg-gray-600 border rounded-md shadow-sm">
                                    <span>Reset your password</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;