import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoRemoveCircleOutline, IoAddCircleOutline } from "react-icons/io5";
import { BsFillBagCheckFill } from "react-icons/bs";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import order from "./order";

const checkout = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [paymentDisabled, setPaymentDisabled] = useState(true);
    const router = useRouter();
    const pincodeEffectRan = useRef(false);
    const [pincodeError, setPincodeError] = useState(false);
    const useEffectRan = useRef(false);

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            toast.error("Please Login to continue", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => {
                    router.push("/login");
                }
            })
        }
        else {
            const fetchPincode = async (pincode) => {
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        pincode: pincode,
                    }),
                });
                const jsonData = await response.json();
                if (response.status === 200) {
                    setCity(jsonData.data.city);
                    setState(jsonData.data.state);
                    setPincodeError(false);
                }
                else {
                    setPincodeError(true);
                    setCity("");
                    setState("");
                }
            }
            const fetchUser = async () => {
                const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUserOrders`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token: localStorage.getItem("token") }),
                });
                if (res.status === 200) {
                    const data = await res.json();
                    setEmail(data.user.email);
                    setName(data.user.name);
                    if (data.user.address === undefined) {
                        setAddress("");
                    } 
                    else{
                        setAddress(data.user.address);
                    }
                    if (data.user.phoneno === undefined) {
                        setPhoneno("");
                    }
                    else{
                        setPhoneno(data.user.phoneno);
                    }
                    if (data.user.pincode === undefined) {
                        setPincode("");
                    }
                    else{
                        setPincode(data.user.pincode);
                        fetchPincode(data.user.pincode);
                    }
                }
            }
            fetchUser();
        }
    }, [])

    const initiatePayment = async (e) => {
        e.preventDefault();
        const response1 = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                address: address + ", " + city + ", " + state + ", PinCode = " + pincode,
                amount: props.subTotal,
                products: props.cart
            }),
        });
        const orderData = await response1.json();
        if (response1.status === 200) {
            const response2 = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/handlePayment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: orderData.order.amount,
                }),
            });
            const paymentInitData = await response2.json();
            if (response2.status === 200) {
                let options = {
                    "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                    "amount": paymentInitData.order.amount,
                    "currency": "INR",
                    "name": "Code Wear",
                    "description": "Test Transaction",
                    "image": "https://scontent.fvga2-1.fna.fbcdn.net/v/t39.30808-6/333269272_729527645556981_8288775143650171103_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=OMfzubTugDAAX88YZIl&_nc_ht=scontent.fvga2-1.fna&oh=00_AfAbys8Jry1G7eNicpd5AkVK80Esu_daSF-zFOGssNIkbw&oe=65BC80FE",
                    "order_id": paymentInitData.order.id,
                    "handler": async function (response) {
                        const response3 = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                id: orderData.order._id,
                                orderID: paymentInitData.order.id,
                                paymentID: response.razorpay_payment_id,
                                amount: paymentInitData.order.amount,
                                cart: props.cart,
                                payment_signature: response.razorpay_signature,
                            }),
                        });
                        const res3jsonData = await response3.json();
                        if (response3.status === 200) {
                            toast.success("Payment Successful! 🎉", {
                                position: "top-center",
                                autoClose: 700,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                onClose: () => {
                                    props.clearCart();
                                    router.push(`/order?orderID=${res3jsonData.order.orderID}`);
                                }
                            })
                        }
                        else {
                            toast.error(res3jsonData.error, {
                                position: "top-center",
                                autoClose: 900,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            })
                        }
                    },
                    "prefill": {
                        "name": name,
                        "email": email,
                        "contact": phoneno
                    },
                    "notes": {
                        "address": address,
                        "city": city,
                        "state": state,
                        "pincode": pincode,
                    },
                };
                function loadScript(src) {
                    return new Promise((resolve) => {
                        const script = document.createElement("script");
                        script.src = src;
                        script.onload = () => {
                            resolve(true);
                        };
                        script.onerror = () => {
                            resolve(false);
                        };
                        document.body.appendChild(script);
                    });
                }
                var res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
                if (!res) {
                    toast.error("Razorpay SDK failed to load. Are you online?", {
                        position: "top-center",
                        autoClose: 900,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        onClose: () => {
                            router.push("/checkout");
                        }
                    })
                }
                else {
                    var rzp1 = new Razorpay(options);
                    rzp1.open();
                    rzp1.on('payment.failed', function (response) {
                        rzp1.close();
                        // error message will be in response.error.description.
                        toast.error("Payment Failed! 😢 Please Try Again", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            onClose: async () => {
                                const revokeRes = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/revoketransaction`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        orderID: orderData.order._id,
                                    }),
                                });
                                if (revokeRes.status !== 200) {
                                    toast.error("Error in revoking transaction", {
                                        position: "top-center",
                                        autoClose: 900,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    })
                                }
                                else {
                                    window.location = "/checkout";
                                }
                            }
                        })
                    });
                }
            }
            else {
                toast.error(res2jsonData.error, {
                    position: "top-center",
                    autoClose: 900,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onClose: async () => {
                        const revokeRes = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/revoketransaction`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                orderID: orderData.order._id,
                            }),
                        });
                        if (revokeRes.status === 200) {
                            window.location = "/checkout";
                        }
                    }
                })
            }
        }
        else {
            toast.error(orderData.error, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => {
                    props.clearCart();
                }
            })
        }

    }

    useEffect(() => {
        try {
            if (pincode.length === 6) {
                const fetchPincode = async () => {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            pincode: pincode,
                        }),
                    });
                    const jsonData = await response.json();
                    if (response.status === 200) {
                        setCity(jsonData.data.city);
                        setState(jsonData.data.state);
                        setPincodeError(false);
                    }
                    else {
                        setPincodeError(true);
                        setCity("");
                        setState("");
                    }
                }
                fetchPincode();
            }
            else {
                setCity("");
                setState("");
            }
        }
        catch (err) {
            console.log(err.message)
            router.push("/checkout");
        }
    }, [pincode])

    useEffect(() => {
        if (name.length > 0 && email.length > 0 && address.length > 0 && phoneno.toString().length === 10 && city.length > 0 && state.length > 0 && pincode.toString().length === 6) {
            setPaymentDisabled(false);
        }
        else {
            setPaymentDisabled(true);
        }
    }, [name, email, address, phoneno, city, state, pincode])


    return (
        <div>
            <Head>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
            </Head>
            <div className="container my-8 w-4/5 mx-auto">
                <ToastContainer />
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
                                            value={name}
                                            onChange={
                                                (e) => {
                                                    setName(e.target.value);
                                                }
                                            }
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                        <input type="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            required
                                            value={email}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                                    <textarea name="address" cols="30" rows="2"
                                        className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        required
                                        value={address}
                                        onChange={
                                            (e) => {
                                                setAddress(e.target.value);
                                            }
                                        }
                                    ></textarea>
                                </div>
                                <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:justify-between my-2">
                                    <div className="w-full md:w-1/5">
                                        <label htmlFor="phoneno" className="leading-7 text-sm text-gray-600">Phone Number</label>
                                        <input type="number" name="phoneno" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            required
                                            maxLength={10}
                                            minLength={10}
                                            value={phoneno}
                                            onChange={
                                                (e) => {
                                                    setPhoneno(e.target.value);
                                                }
                                            }
                                        />
                                    </div>
                                    <div className="w-full md:w-1/5">
                                        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pin Code</label>
                                        <input type="number" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            required
                                            maxLength={6}
                                            minLength={6}
                                            value={pincode}
                                            onChange={
                                                (e) => {
                                                    setPincode(e.target.value);
                                                }
                                            }
                                        />
                                        <p className={`text-red-400 my-1 ${pincodeError === true ? "" : "invisible"} `}>
                                            Pincode not serviceable
                                        </p>
                                    </div>
                                    <div className="w-full md:w-1/5">
                                        <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                                        <input type="text" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:cursor-not-allowed"
                                            required
                                            value={city}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/5">
                                        <label htmlFor="city" className="leading-7 text-sm text-gray-600">State</label>
                                        <input type="text" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:cursor-not-allowed"
                                            required
                                            value={state}
                                            disabled={true}
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
                                                                            variant: props.cart[item].variant,
                                                                            category: props.cart[item].category
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

                            <button type="submit" className="text-white bg-blue-500 border-0 p-2 focus:outline-none hover:bg-blue-600 rounded w-fit my-4 disabled:cursor-not-allowed disabled:bg-blue-400"
                                onClick={initiatePayment}
                                disabled={paymentDisabled || props.subTotal === 0}
                            >
                                <div className="flex flex-row items-center justify-center space-x-2">
                                    <BsFillBagCheckFill className="text-xl" />
                                    <p>
                                        Pay ₹‎{props.subTotal}
                                    </p>
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