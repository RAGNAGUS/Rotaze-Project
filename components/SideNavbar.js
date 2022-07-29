import { useEffect, useState } from "react";

// imports icons
import Image from "next/image";
import MenuIcon from "../public/menu.svg";
import { BiHome } from 'react-icons/bi'
import { MdLogout } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { TbMessages } from 'react-icons/tb'
import { IoSettingsOutline } from 'react-icons/io5'
import { RiCompassDiscoverLine } from 'react-icons/ri'

const SideNavbar = () => {

    const [isPanelOpen, setIsPanelOpen] = useState(false)
    const panelControl = () => {
        setIsPanelOpen(!isPanelOpen)
    }

    useEffect(() => {

        // Close sidebar panel if user clickd outside
        window.addEventListener('click', (e) => {
            if (document.getElementById('clickbox').contains(e.target)) {
                // Clicked in box
            } else {
                // Clicked outside the box
                if (isPanelOpen) {
                    panelControl()
                }
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPanelOpen])

    return (
        <div id="clickbox">
            <button onClick={panelControl} className="fixed flex items-center justify-center p-2 rounded-md top-4 left-2 hover:bg-gray-100">
                <div className="inline-block w-6 h-6 md:hidden invert-[30%]">
                    <Image src={MenuIcon} alt="" />
                </div>
            </button>
            <div>
                <div className={`fixed z-20 bg-gray-800 shadow-xl w-1/2 md:w-4/12 lg:w-1/6 h-screen top-[74px] p-6 duration-500 ease-in-out ${isPanelOpen ? 'left-0' : '-left-96'}`}>
                    <div className="flex flex-col justify-start item-center">
                        <div className="flex items-center justify-start px-5 py-3 m-auto mb-2 duration-150 ease-in-out rounded-md cursor-pointer bg-gradient-to-r from-[#de6161]  to-[#2657eb] group hover:shadow-lg hover:px-10 ">
                            <h3 className="text-base font-semibold text-white ">
                                Go Premium
                            </h3>
                        </div>
                        <div className="pb-4 my-4 border-b border-gray-100 ">
                            <div className="flex items-center justify-start gap-4 p-2 pl-5 m-auto mb-2 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-900 group hover:shadow-lg">
                                <BiHome className="text-2xl text-gray-300 group-hover:text-white" />
                                <h3 className="text-base text-gray-300 font-semibolgray-300 group-hover:text-white ">
                                    Home
                                </h3>
                            </div>
                            <div className="flex items-center justify-start gap-4 p-2 pl-5 m-auto mb-2 rounded-md cursor-pointer hover:bg-gray-900 group hover:shadow-lg">
                                <CgProfile className="text-2xl text-gray-300 group-hover:text-white " />
                                <h3 className="text-base font-semibold text-gray-300 group-hover:text-white ">
                                    Profile
                                </h3>
                            </div>
                            <div className="flex items-center justify-start gap-4 p-2 pl-5 m-auto mb-2 rounded-md cursor-pointer hover:bg-gray-900 group hover:shadow-lg">
                                <TbMessages className="text-2xl text-gray-300 group-hover:text-white " />
                                <h3 className="text-base font-semibold text-gray-300 group-hover:text-white ">
                                    Messages
                                </h3>
                            </div>
                            <div className="flex items-center justify-start gap-4 p-2 pl-5 m-auto mb-2 rounded-md cursor-pointer hover:bg-gray-900 group hover:shadow-lg">
                                <RiCompassDiscoverLine className="text-2xl text-gray-300 group-hover:text-white " />
                                <h3 className="text-base font-semibold text-gray-300 group-hover:text-white ">
                                    Discover
                                </h3>
                            </div>
                            <div className="flex items-center justify-start gap-4 p-2 pl-5 m-auto mb-2 rounded-md cursor-pointer hover:bg-gray-900 group hover:shadow-lg">
                                <IoSettingsOutline className="text-2xl text-gray-300 group-hover:text-white " />
                                <h3 className="text-base font-semibold text-gray-300 group-hover:text-white ">
                                    Settings
                                </h3>
                            </div>
                        </div>
                        {/* logout */}
                        <div className="my-4 ">
                            <div className="flex items-center justify-start gap-4 p-2 pl-5 m-auto mb-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-900 group hover:shadow-lg">
                                <MdLogout className="text-2xl text-gray-300 group-hover:text-white " />
                                <h3 className="text-base font-semibold text-gray-300 group-hover:text-white ">
                                    Logout
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideNavbar;