import { useAuthContext } from '../hooks/useAuthContext'
import Link from 'next/link'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

// imports icons
import { MdNotificationsNone } from 'react-icons/md'
import { TbMessageCircle } from 'react-icons/tb'

// use for profile dropdown
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

    const { user } = useAuthContext()

    return (
        <nav className="fixed w-full bg-white border-b border-gray-200">
            <div className="px-4 mx-auto max-w-7xl">
                <div className="flex items-center justify-between h-[73px] gap-x-2 md:gap-x-6">

                    {/* logo text */}
                    <a className="hidden px-2 py-1 duration-100 ease-in-out border-2 border-gray-500 rounded hover:border-gray-600 lg:inline-block" href="#">
                        <span className='text-2xl font-semibold text-gray-600'>ROTAZE</span>
                    </a>

                    {/* Nav Links */}
                    <ul className="hidden text-gray-700 md:flex md:gap-x-4 md:items-center">
                        <li><Link href="/"><a className="px-3 py-2 font-medium duration-150 ease-in-out rounded hover:bg-gray-600 hover:text-white" href="#">Home</a></Link></li>
                        <li><a className="px-3 py-2 font-medium duration-150 ease-in-out rounded hover:bg-gray-600 hover:text-white" href="#">Profile</a></li>
                        <li><a className="px-3 py-2 font-medium duration-150 ease-in-out rounded hover:bg-gray-600 hover:text-white" href="#">Discover</a></li>
                        <li><a className="px-3 py-2 font-medium duration-150 ease-in-out rounded bg-gradient-to-r from-[#de6161]  to-[#2657eb] text-white" href="#">Premium</a></li>
                    </ul>

                    <button className="px-2 py-2 ml-10 mr-1 text-[12px] font-bold text-gray-600 border-2 border-gray-300 rounded sm:hidden">
                        <Link href="/"><a>ROTAZE</a></Link>
                    </button>

                    {/* Search */}
                    <input
                        className="sm:ml-0 w-0 md:ml-0 flex-1 md:flex-1 py-1.5 px-4 text-gray-700 bg-gray-100 rounded-full border-[2px] border-gray-100 transition focus:outline-none focus:bg-white focus:border-gray-600"
                        type="text"
                        placeholder="Search"
                    />

                    {/* upload, notification and profile */}
                    {user && (
                        <div className="flex items-center gap-x-4 lg:flex-row">
                            <button className="ml-3 md:ml-0 hidden sm:inline-block py-1.5 px-5 rounded-full border border-gray-200 hover:scale-110 duration-150 ease-in-out">
                                Upload
                            </button>
                            <button className="ml-2 sm:ml-1 lg:inline-block">
                                <TbMessageCircle className='w-7 h-7 invert-[40%] hover:invert-[30%]' />
                            </button>
                            <button className="lg:inline-block">
                                <MdNotificationsNone className='w-7 h-7 invert-[40%] hover:invert-[30%]' />
                            </button>
                            {/* Profile dropdown */}
                            <Menu as="div" className="relative">
                                <div>
                                    <Menu.Button className="object-cover w-10 h-10 overflow-hidden rounded-full lg:inline-block">
                                        <img
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 w-48 py-1 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Your Profile
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Settings
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Sign out
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    )}

                    {/* if user not login then show login and sign up button instead */}
                    {!user && (
                        <div className="flex items-centerlg:flex-row">
                            <button className="hidden ml-3 sm:inline-block">
                                <Link href="/login"><a>Log in</a></Link>
                            </button>
                            <div className='hidden ml-3 text-gray-600 sm:inline-block'>
                                |
                            </div>
                            <button className="ml-3 sm:inline-block">
                                <Link href="/signup"><a>Sign up</a></Link>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}