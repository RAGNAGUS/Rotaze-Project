import { MdNotificationsNone } from 'react-icons/md'
import { TbMessageCircle } from 'react-icons/tb'

const Navbar = () => {
    return (
        <nav className="fixed w-full bg-white border-b border-gray-200">
            <div className="px-4 mx-auto max-w-7xl">
                <div className="flex items-center justify-between h-[73px] gap-x-2 md:gap-x-6">

                    {/* logo text */}
                    <a className="hidden px-2 py-1 duration-100 ease-in-out border-2 border-gray-500 rounded hover:border-gray-600 lg:inline-block" href="#">
                        <span className='text-2xl font-semibold'>ROTAZE</span>
                    </a>

                    {/* Nav Links */}
                    <ul className="hidden text-gray-700 md:flex md:gap-x-4 md:items-center">
                        <li><a className="px-3 py-2 font-medium duration-150 ease-in-out rounded hover:bg-gray-600 hover:text-white" href="#">Home</a></li>
                        <li><a className="px-3 py-2 font-medium duration-150 ease-in-out rounded hover:bg-gray-600 hover:text-white" href="#">Profile</a></li>
                        <li><a className="px-3 py-2 font-medium duration-150 ease-in-out rounded hover:bg-gray-600 hover:text-white" href="#">Discover</a></li>
                        <li><a className="px-3 py-2 font-medium duration-150 ease-in-out rounded bg-gradient-to-r from-[#de6161]  to-[#2657eb] text-white" href="#">Premium</a></li>
                    </ul>

                    {/* Search */}
                    <input
                        className="ml-10 md:ml-0 flex-1 md:flex-1 py-1.5 px-4 text-gray-700 bg-gray-100 rounded-full border-[2px] border-gray-100 transition focus:outline-none focus:bg-white focus:border-gray-600"
                        type="text"
                        placeholder="Search"
                    />

                    {/* upload notification and profile */}
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
                        <button className="object-cover w-10 h-10 overflow-hidden rounded-full lg:inline-block">
                            <img src="https://picsum.photos/150" alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;