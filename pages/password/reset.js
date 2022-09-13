import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuthContext } from '../../hooks/useAuthContext'

// firebase
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from 'firebase/auth';

// import icons
import { TbArrowBack } from 'react-icons/tb'
import { useEffect, useState } from 'react'

export default function ResetPassword() {

    const router = useRouter()
    const { user } = useAuthContext()

    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [errorFormat, setErrorFormat] = useState(null)
    const [success, setSuccess] = useState(null)

    // redirect to home page if user already logged in
    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [router, user])

    const resetPassword = (e) => {
        e.preventDefault()
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setErrorFormat(null)
                setSuccess("Please check your email.")
                setTimeout(() => {
                    router.push('/login')
                }, 3000);
            })
            .catch((error) => {

                setError(error.message)
            })
    }
    // error check
    useEffect(() => {
        if (error === 'Firebase: Error (auth/invalid-email).') {
            console.log("error")
            setErrorFormat('Account not found.')
        }
        return () => {
            setErrorFormat(null)
        }
    }, [error])

    return (
        <div className='fixed z-30 w-screen h-screen bg-[#ffffff]'>
            <div className='w-48 py-3 m-3 ml-5 text-lg text-gray-800 cursor-pointer '>
                <Link href="/login">
                    <div className='flex items-center justify-center space-x-3'>
                        <TbArrowBack />
                        <h3>Back to login</h3>
                    </div>
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md p-4 bg-white border rounded-md ">
                    <div className="py-2 mx-8 mt-5 text-6xl text-center text-gray-500 border-2 border-gray-400 rounded-lg">
                        <h1>ROTAZE</h1>
                    </div>
                    <div className='flex flex-col items-center justify-center py-2 mx-auto space-y-3 text-center w-80'>
                        <h3 className='pt-3 font-bold'>Reset your password</h3>
                        <p>Enter your email and we&#39;ll send you a link to reset your password.</p>
                    </div>
                    <div className="px-5 py-1 bg-white">
                        <form className="space-y-3" onSubmit={e => resetPassword(e)}>
                            <label className="flex flex-col">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    className="input-form" />
                            </label>
                            {errorFormat && (
                                <div>
                                    <label className='error-form '>
                                        {errorFormat}
                                    </label>
                                </div>
                            )}
                            {success && (
                                <div>
                                    <label className='success-form '>
                                        {success}
                                    </label>
                                </div>
                            )}

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