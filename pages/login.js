import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { useLogin } from '../hooks/useLogin';

// imports icons
import { FcGoogle } from 'react-icons/fc'
import { TbArrowBack } from 'react-icons/tb'
import { useSignup } from '../hooks/useSignup';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase/config';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Login() {

    const { loginWithEmailAndPassword, isPending, error } = useLogin();
    const { user } = useAuthContext()
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorFormat, setErrorFormat] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        loginWithEmailAndPassword(email, password)
    }

    // redirect to home page if user already logged in
    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [router, user])

    useEffect(() => {

        if (error === 'Firebase: Error (auth/user-not-found).') {
            setErrorFormat('User not found or incorrect password.')
        }
        if (error === 'Firebase: Error (auth/wrong-password).') {
            setErrorFormat('User not found or incorrect password.')
        }
        if (error === 'Firebase: Error (auth/user-disabled).') {
            setErrorFormat('Your account has been temporarily locked, contact our support.')
        }
        return () => {
            setErrorFormat(null)
        }
    }, [error])

    return (
        <div className='fixed z-30 w-screen h-screen bg-[#ffffff]'>
            <div className='w-48 py-3 m-3 ml-5 text-lg text-gray-800 cursor-pointer '>
                <Link href="/">
                    <div className='flex items-center justify-center space-x-3'>
                        <TbArrowBack />
                        <h3>Back to home page</h3>
                    </div>
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md p-4 bg-white border rounded-md ">
                    <div className="py-2 mx-8 mt-5 text-6xl text-center text-gray-500 border-2 border-gray-400 rounded-lg">
                        <h1>ROTAZE</h1>
                    </div>
                    <div className='flex justify-center w-full mt-5 mb-1 text-sm text-gray-600'>
                        login with
                    </div>
                    <GoogleLoginButton />
                    <div className='flex justify-center w-full mt-4 mb-1 text-sm text-gray-600'>
                        or with Rotaze
                    </div>
                    <div className="px-5 py-1 bg-white">
                        <form onSubmit={handleSubmit} className="space-y-3">
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
                            {errorFormat && (
                                <label className='error-form '>
                                    {errorFormat}
                                </label>
                            )}
                            <div className="flex items-center justify-end w-full pt-2 space-x-3">
                                <span className="text-sm text-right text-gray-600"><Link href="/password/reset"><a>forget password ?</a></Link></span>
                                {!isPending && (
                                    <button type='submit' className="h-10 text-white bg-gray-600 border rounded-md shadow-sm w-28">
                                        <span>Login</span>
                                    </button>
                                )}
                                {isPending && (
                                    <button type='submit' disabled className="h-10 text-white bg-gray-600 border rounded-md shadow-sm w-28">
                                        <div className='flex items-center justify-center w-full'>
                                            <svg className="w-5 h-5 mr-3 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" ></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        </div>
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
                <div className='flex items-center justify-end w-full max-w-lg pt-2 pr-5 space-x-5 text-gray-800'>
                    {/* <h3>privacy</h3>
                    <h3>terms</h3> */}
                </div>
            </div>
        </div>

    );
}

export const GoogleLoginButton = () => {
    const { signinWithGoogle } = useSignup();
    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                signinWithGoogle(user, user.displayName)
            }).catch((error) => {
                console.log(error.message)
            })
    }
    return (
        <button onClick={handleGoogleLogin} className='flex items-center justify-center w-full'>
            <div className="flex rounded-md items-center p-[2px] w-full mx-5 bg-[#ffffff] border-gray-400 border">
                <div className='p-2 px-3 mr-1 bg-white'>
                    <FcGoogle className='w-6 h-6' />
                </div>
                <div className='mr-auto font-bold text-gray-500 '>
                    <span>Continue with Google</span>
                </div>
            </div>
        </button>
    )
}