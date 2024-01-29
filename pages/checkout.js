import React from "react";
import Link from "next/link";
import { IoRemoveCircleOutline, IoAddCircleOutline } from "react-icons/io5";
import { BsFillBagCheckFill } from "react-icons/bs";
import Head from "next/head";
import Script from "next/script";

const checkout = (props) => {
    const initiatePayment = async (e) => {
        e.preventDefault();
        alert("Payment done");
    }



    return (
        <div>
            <Head>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
            </Head>
            <Script>
                <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            </Script>
            <div className="container my-8 w-4/5 mx-auto">
                <form>
                    <h1 className="w-fit mx-auto text-2xl font-bold">
                        Checkout
                    </h1>
                    <div>
                        <div className="bg-white rounded-lg p-8 flex flex-col">
                            <div className="address">
                                <div className="text-xl font-semibold">
                                    1. Shipping Address
                                </div>
                                <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2 my-2">
                                    <div className="w-full md:w-1/2">
                                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                        <input type="text" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            required
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                        <input type="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                                    <textarea name="address" cols="30" rows="2"
                                        className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    ></textarea>
                                </div>
                                <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:justify-between my-2">
                                    <div className="w-full md:w-1/5">
                                        <label htmlFor="phoneno" className="leading-7 text-sm text-gray-600">Phone Number</label>
                                        <input type="number" name="phoneno" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            required
                                            maxLength={10}
                                            minLength={10}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/5">
                                        <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                                        <input type="text" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            required
                                        />
                                    </div>
                                    <div className="w-full md:w-1/5">
                                        <label htmlFor="city" className="leading-7 text-sm text-gray-600">State</label>
                                        <input type="text" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            required
                                        />
                                    </div>
                                    <div className="w-full md:w-1/5">
                                        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pin Code</label>
                                        <input type="number" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="cart">
                                <div className="text-xl font-semibold">
                                    2. Cart Details
                                </div>
                                <div className="w-[95%] mx-auto">
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
                                                                <IoRemoveCircleOutline className="text-lg cursor-pointer"
                                                                    onClick={() => {
                                                                        props.removeFromCart({
                                                                            itemCode: item,
                                                                            qty: 1,
                                                                        })
                                                                    }} />
                                                                <p className="text-md">{props.cart[item].qty}</p>
                                                                <IoAddCircleOutline className="text-lg cursor-pointer"
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
                                    <span className="font-bold text-xl">
                                        Subtotal : ₹‎{props.subTotal}
                                    </span>
                                </div>
                            </div>

                            <button type="submit" className="text-white bg-blue-500 border-0 p-2 focus:outline-none hover:bg-blue-600 rounded w-fit my-4"
                            onClick={initiatePayment}
                            >
                                <div className="flex flex-row items-center justify-center space-x-1">
                                    <BsFillBagCheckFill className="text-xl" />
                                    <p>Checkout</p>
                                </div>
                            </button>

                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default checkout;