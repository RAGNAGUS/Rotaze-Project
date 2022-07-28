import Image from "next/image";
const Navbar = () => {
    return (
        <nav className="flex justify-between">
            {/* Logo */}
            <div>
                <Image width={0} height={0} src="/" alt="logo" />
                logo
            </div>

            {/* Search bar */}
            <form>
                <input type="text" />
            </form>
            {/* Nav Links */}
            <ul className="flex">
                <li>link1</li>
                <li>link1</li>
                <li>link1</li>
                <li>link1</li>
                <li>link1</li>
            </ul>
        </nav>
    );
}

export default Navbar;