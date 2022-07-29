import { GiHamburgerMenu } from "react-icons/gi";
import {
    MdOutlineSpaceDashboard,
    MdOutlineAnalytics,
    MdOutlineIntegrationInstructions,
    MdOutlineMoreHoriz,
    MdOutlineSettings,
    MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";
import { useEffect, useState } from "react";


const SideNavbar = () => {

    const [isPanelOpen, setIsPanelOpen] = useState(true)
    const panelControl = () => {
        setIsPanelOpen(!isPanelOpen)
    }

    useEffect(() => {

        // Close sidebar panel if user clickd outside
        window.addEventListener('click', (e) => {
            if (document.getElementById('clickbox').contains(e.target)) {
                // Clicked in box
                console.log("click inside")
            } else {
                // Clicked outside the box
                if (isPanelOpen) {
                    panelControl()
                }
                console.log("click outside");
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPanelOpen])

    return (
        <div id="clickbox">
            <button onClick={panelControl} className="fixed inline-flex items-center justify-center p-2 text-white rounded-md top-3 left-3 peer hover:bg-gray-900 group">
                <GiHamburgerMenu className="block w-6 h-6" />
            </button>
            <div>
                <div className={`fixed bg-[#f9fafc] shadow-xl w-1/2 md:w-4/12 lg:w-1/6 h-screen top-16 p-6 duration-500 ease-in-out ${isPanelOpen ? 'left-0' : '-left-96'}`}>
                    <div className="flex flex-col justify-start item-center">
                        <div className="pb-4 my-4 border-b border-gray-100 ">
                            <div className="flex items-center justify-start gap-4 p-2 pl-5 m-auto mb-2 rounded-md cursor-pointer hover:bg-gray-900 group hover:shadow-lg">
                                <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base font-semibold text-gray-800 group-hover:text-white ">
                                    Dashboard
                                </h3>
                            </div>
                            <div className="flex items-center justify-start gap-4 p-2 pl-5 m-auto mb-2 rounded-md cursor-pointer hover:bg-gray-900 group hover:shadow-lg">
                                <CgProfile className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base font-semibold text-gray-800 group-hover:text-white ">
                                    Profile
                                </h3>
                            </div>
                            <div className="flex items-center justify-start gap-4 p-2 pl-5 m-auto mb-2 rounded-md cursor-pointer hover:bg-gray-900 group hover:shadow-lg">
                                <FaRegComments className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base font-semibold text-gray-800 group-hover:text-white ">
                                    Comments
                                </h3>
                            </div>
                            <div className="flex items-center justify-start gap-4 p-2 pl-5 m-auto mb-2 rounded-md cursor-pointer hover:bg-gray-900 group hover:shadow-lg">
                                <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base font-semibold text-gray-800 group-hover:text-white ">
                                    Analytics
                                </h3>
                            </div>
                            <div className="flex items-center justify-start gap-4 p-2 pl-5 m-auto mb-2 rounded-md cursor-pointer hover:bg-gray-900 group hover:shadow-lg">
                                <BiMessageSquareDots className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base font-semibold text-gray-800 group-hover:text-white ">
                                    Messages
                                </h3>
                            </div>
                            <div className="flex items-center justify-start gap-4 p-2 pl-5 m-auto mb-2 rounded-md cursor-pointer hover:bg-gray-900 group hover:shadow-lg">
                                <MdOutlineIntegrationInstructions className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base font-semibold text-gray-800 group-hover:text-white ">
                                    Integration
                                </h3>
                            </div>
                        </div>
                        {/* setting  */}
                        <div className="pb-4 my-4 border-b border-gray-100 ">
                            <div className="flex items-center justify-start gap-4 p-2 pl-5 m-auto mb-2 rounded-md cursor-pointer hover:bg-gray-900 group hover:shadow-lg">
                                <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base font-semibold text-gray-800 group-hover:text-white ">
                                    Settings
                                </h3>
                            </div>
                            <div className="flex items-center justify-start gap-4 p-2 pl-5 m-auto mb-2 rounded-md cursor-pointer hover:bg-gray-900 group hover:shadow-lg">
                                <MdOutlineMoreHoriz className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base font-semibold text-gray-800 group-hover:text-white ">
                                    More
                                </h3>
                            </div>
                        </div>
                        {/* logout */}
                        <div className="my-4 ">
                            <div className="flex items-center justify-start gap-4 p-2 pl-5 m-auto mb-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-900 group hover:shadow-lg">
                                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base font-semibold text-gray-800 group-hover:text-white ">
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