import Link from "next/link";
import { HomeIcon } from '@heroicons/react/outline'
const Sidebar = () => {
    return (
        <aside>
            <div>
                <ul>
                    <li>
                        <Link href="/">
                            <a>
                                <HomeIcon className="w-5 h-5 text-blue-500" />
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;