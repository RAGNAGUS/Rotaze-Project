import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useSignup } from '../hooks/useSignup';

// import icons
import { FcGoogle } from 'react-icons/fc'
import { TbArrowBack } from 'react-icons/tb'



const Signup = () => {

    const { signupWithEmailAndPassword, isPending, error } = useSignup();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRetype, setPasswordRetype] = useState('')
    const [passwordError, setpasswordError] = useState(null)
    const [errorFormat, setErrorFormat] = useState(null)
    const [displayName, setDisplayName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setpasswordError(null)
        setErrorFormat(null)
        if (password == passwordRetype) {
            signupWithEmailAndPassword(email, password, displayName)
        } else {
            setpasswordError('The password and confirmation password do not match.')
        }
    }

    useEffect(() => {

        if (error === 'Firebase: Error (auth/invalid-email).') {
            setErrorFormat('Invalid email')
        }
        if (error === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
            setErrorFormat('Password should be at least 6 characters')
        }
        if (error === 'Firebase: Error (auth/email-already-in-use).') {
            setErrorFormat('Email already in use')
        }

        return () => {

        }
    }, [error])


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
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <label className="flex flex-col">
                                <input
                                    className="input-form"
                                    required
                                    type="text"
                                    placeholder="Display Name"
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    value={displayName}
                                />
                            </label>
                            <label className="flex flex-col">
                                <input
                                    className="input-form"
                                    required
                                    type="email"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </label>
                            <label className="flex flex-col">
                                <input
                                    className="input-form"
                                    required
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </label>
                            <label className="flex flex-col">
                                <input
                                    className="input-form"
                                    required
                                    type="password"
                                    placeholder="Retype Password"
                                    onChange={(e) => setPasswordRetype(e.target.value)}
                                    value={passwordRetype}
                                />
                            </label>
                            {passwordError && (
                                <label className='flex items-center h-12 p-2 pl-4 text-gray-800 bg-red-100 border-2 border-red-500 rounded-md '>
                                    {passwordError}
                                </label>
                            )}
                            {errorFormat && (
                                <label className='flex items-center h-12 p-2 pl-4 text-gray-800 bg-red-100 border-2 border-red-500 rounded-md '>
                                    {errorFormat}
                                </label>
                            )}
                            <div className="flex items-center justify-end w-full pt-2 space-x-3">
                                <span className="text-sm text-right text-gray-800"><Link href="/login"><a>already have an account ?</a></Link></span>
                                <button type='submit' className="h-10 text-white bg-gray-600 border rounded-md shadow-sm w-28">
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