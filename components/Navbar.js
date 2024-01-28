import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import { IoCartOutline } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";
import { useRouter } from 'next/router';

const Navbar = (props) => {
    const router = useRouter();
    const cartRef = useRef();
    const toggleCartView = () => {
        if (cartRef.current.classList.contains("translate-x-full")) {
            cartRef.current.classList.remove("translate-x-full")
            cartRef.current.classList.add("translate-x-0")
        }
        else if (!cartRef.current.classList.contains("translate-x-full")) {
            cartRef.current.classList.add("translate-x-full")
            cartRef.current.classList.remove("translate-x-0")
        }
    }
    const toggleAccountDropdown = () => {
        if (document.querySelector(".account-dropdown").classList.contains("hidden")) {
            document.querySelector(".account-dropdown").classList.remove("hidden")
            document.querySelector(".account-dropdown").classList.add("block")
        }
        else if (!document.querySelector(".account-dropdown").classList.contains("hidden")) {
            document.querySelector(".account-dropdown").classList.add("hidden")
            document.querySelector(".account-dropdown").classList.remove("block")
        }
    }

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center p-4 space-y-2 md:space-y-0 shadow-md sticky top-0 z-10 bg-white">
                <div className="logo">
                    <Link href={"/"}>
                        <Image src="/vercel.svg" width={100} height={90} alt="home" />
                    </Link>
                </div>
                <div className="nav">
                    <ul className="flex flex-col space-y-2 md:space-y-0 justify-center items-center md:flex-row md:space-x-6 p-2 md:items-center">
                        <Link href={"/tshirts"}><li className="hover:text-blue-400">T-shirts</li> </Link>
                        <Link href={"/mugs"}><li className="hover:text-blue-400">Mugs</li> </Link>
                        <Link href={"/hoodies"}><li className="hover:text-blue-400">Hoodies</li> </Link>
                        <Link href={"/stickers"}><li className="hover:text-blue-400">Stickers</li> </Link>
                    </ul>
                </div>
                <div className="cart cursor-pointer flex flex-row space-x-2 items-center justify-center" >
                    {
                        (props.user.token !== null) && <MdAccountCircle 
                        onClick={toggleAccountDropdown}
                        className="text-3xl" />
                    }
                    {
                        (props.user.token === null) && <Link href={"/login"} >
                            <p className="text-white bg-blue-400 hover:bg-blue-500 p-2 rounded-lg">Login</p>
                        </Link>
                    }

                    <IoCartOutline onClick={toggleCartView} className="text-3xl" />
                </div>
            </div>
            <div>
                <div className="account-dropdown hidden absolute top-16 right-0 bg-blue-200 p-4 rounded-lg z-10">
                    <ul className="flex flex-col space-y-2 justify-center items-center p-1">
                        <Link href={"/profile"}><li className="hover:text-blue-400">Profile</li> </Link>
                        <Link href={"/orders"}><li className="hover:text-blue-400">Orders</li> </Link>
                        <li 
                        onClick={()=>{
                            toggleAccountDropdown();
                            localStorage.removeItem("token");
                            props.setUser({token:null});
                            props.setKey(Math.random());
                            router.push("/");
                        }}
                        className="hover:text-blue-400 cursor-pointer">Logout</li>
                    </ul>
                </div>
            </div>
            <div ref={cartRef} className={`min-h-screen z-20 w-72 cart-sidebar absolute top-0 right-0 bg-blue-200 p-8 transform transition-transform overflow-y-scroll ${(Object.keys(props.cart).length !== 0) ? "translate-x-0" : "translate-x-full"} `}>
                <h2 className="text-2xl font-bold text-center">Cart Details</h2>
                <p className="absolute top-4 right-2" onClick={toggleCartView}>
                    <IoMdCloseCircle className="text-lg cursor-pointer text-blue-500" />
                </p>
                <ol className="list-decimal my-2">
                    {
                        Object.keys(props.cart).length === 0 && <p className="text-center">Cart is empty</p>
                    }
                    {props.cart && Object.keys(props.cart).map((item, index) => {
                        return (
                            <li className="p-3" key={index}>
                                <div className="flex justify-between items-center">
                                    <div className="w-full flex flex-row">
                                        <div className="w-2/3 ">
                                            {props.cart[item].name + "(" + props.cart[item].size + "/" + props.cart[item].color + ")"}
                                        </div>
                                        <div className="flex items-center justify-center w-1/3 space-x-2">
                                            <FiMinusCircle className="text-lg cursor-pointer"
                                                onClick={() => {
                                                    props.removeFromCart({
                                                        itemCode: item,
                                                        qty: 1,
                                                    })
                                                }} />
                                            <p className="text-md">{props.cart[item].qty}</p>
                                            <FiPlusCircle className="text-lg cursor-pointer"
                                                onClick={() => {
                                                    props.addToCart({
                                                        itemCode: item,
                                                        qty: 1,
                                                        price: props.cart[item].price,
                                                        name: props.cart[item].name,
                                                        size: props.cart[item].size,
                                                        variant: props.cart[item].variant
                                                    })
                                                }} />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ol>
                <p className="text-md font-semibold">
                    Subtotal: ₹‎{props.subTotal}
                </p>
                <div className="flex space-x-2 my-2 items-center justify-start">
                    <Link href={"/checkout"}>
                        <button className="flex items-center space-x-2 text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded">
                            <IoCartOutline className="text-xl" />
                            <p>
                                Checkout
                            </p>
                        </button>
                    </Link>
                    <button className="flex items-center space-x-2 text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded"
                        onClick={props.clearCart}
                    >
                        Clear
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar