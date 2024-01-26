import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center bg-blue-400 p-4 space-y-2 md:space-y-0">
            <div className="logo">
                <Image src="/vercel.svg" width={100} height={90} />
            </div>
            <div className="nav">
                <ul className="flex flex-col md:flex-row space-x-2 items-center">
                    <Link href={"/tshirts"}><li>T-shirts</li> </Link>
                    <Link href={"/"}><li>Mugs</li> </Link>
                    <Link href={"/"}><li>Hoodies</li> </Link>
                    <Link href={"/"}><li>Stickers</li> </Link>
                </ul>
            </div>
            <div className="cart">
            <IoCartOutline className="text-3xl" />
            </div>
        </div>
    )
}

export default Navbar