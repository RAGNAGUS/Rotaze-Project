import Head from 'next/head'
import Navbar from './Navbar';
import SideNavbar from './SideNavbar';

export default function Layout({ children }) {
    return (
        <div>
            <Head>
                <title>Rotaze</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <SideNavbar />
            {children}
        </div>
    )
}