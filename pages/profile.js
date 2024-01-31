import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const profile = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [pincode, setPincode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [oldpassword, setOldpassword] = useState("");
    const effectRan = useRef(false);

    useEffect(() => {
        if (effectRan.current === true) return;
        else {
            if (!localStorage.getItem("token")) {
                effectRan.current = true;
                router.push("/login")
            }
            else {
                const fetchUser = async () => {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUserOrders`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            token: localStorage.getItem("token")
                        })
                    });
                    const data = await res.json();
                    if (res.status === 200) {
                        setName(data.user.name);
                        setEmail(data.user.email);
                        setAddress(data.user.address);
                        setPhoneno(data.user.phoneno);
                        setPincode(data.user.pincode);
                    }
                    else {
                        toast.error("Something went wrong while fetching your details", {
                            position: "top-center",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            onClose: () => {
                                router.push("/");
                            }
                        });
                    }
                }
                fetchUser();
                effectRan.current = true;
            }
        }
    }, []);

    const handlePassSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            toast.error("Password must be atleast 6 characters long", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => {
                    setConfirmpassword("");
                    setOldpassword("");
                    setPassword("");
                }
            })
        }
        else if (password !== confirmpassword || password === "" || confirmpassword === "" || oldpassword === "") {
            toast.error("Check your password details", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => {
                    setConfirmpassword("");
                    setOldpassword("");
                    setPassword("");
                }
            })
        }
        else {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUserDetails`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: localStorage.getItem("token"),
                    password,
                    confirmpassword,
                    oldpassword
                }),
            });
            const data = await res.json();
            if (res.status === 200) {
                toast.success("Password updated!", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onClose: () => {
                        setConfirmpassword("");
                        setOldpassword("");
                        setPassword("");
                    }
                });
            }
            else {
                toast.error(data.message, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onClose: () => {
                        setConfirmpassword("");
                        setOldpassword("");
                        setPassword("");
                    }
                })
            }
        }
    }

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        if (phoneno.toString().length !== 10 || pincode.toString().length !== 6 || address.length < 10 || name.length < 3) {
            toast.error("Please check your address details", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })
        }
        else {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUserDetails`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: localStorage.getItem("token"),
                    name,
                    address,
                    phoneno,
                    pincode
                }),
            });
            const data = await res.json();
            if (res.status === 200) {
                toast.success("Address updated successfully", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onClose: () => {
                        setName(data.user.name);
                        setAddress(data.user.address);
                        setPhoneno(data.user.phoneno);
                        setPincode(data.user.pincode);
                    }
                });
            }
            else {
                toast.error(data.message, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                })
            }
        }
    }

    return (
        <div>
            <ToastContainer />
            <div className="w-4/5 container mx-auto my-7">
                <h1 className="text-2xl font-semibold text-center">
                    My Account
                </h1>
                <div className="bg-white rounded-lg p-8 flex flex-col">
                    <div className="address">
                        <div className="text-lg font-semibold">
                            1. Address Details
                        </div>
                        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2 my-2">
                            <div className="w-full md:w-1/2">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                <input type="text" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="w-full md:w-1/2">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                                    Email <i>(Cannot be changed)</i>
                                </label>
                                <input type="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:cursor-not-allowed"
                                    required
                                    disabled={true}
                                    value={email}
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                            <textarea name="address" cols="30" rows="2"
                                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:justify-between my-2 md:space-x-2">
                            <div className="w-full">
                                <label htmlFor="phoneno" className="leading-7 text-sm text-gray-600">Phone Number</label>
                                <input type="number" name="phoneno" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out "
                                    maxLength={10}
                                    minLength={10}
                                    value={phoneno}
                                    onChange={(e) => setPhoneno(e.target.value)}
                                />
                            </div>
                            <div className="w-full ">
                                <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pin Code</label>
                                <input type="number" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    maxLength={6}
                                    minLength={6}
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type="submit" className="text-white bg-blue-500 border-0 p-2 focus:outline-none hover:bg-blue-600 rounded w-fit my-4 disabled:cursor-not-allowed disabled:bg-blue-400"
                            onClick={handleAddressSubmit}
                        >
                            <div className="flex flex-row items-center justify-center space-x-2">
                                Update
                            </div>
                        </button>
                    </div>
                    <div className="password">
                        <div className="text-lg font-semibold">
                            2. Change Password
                        </div>
                        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2 my-2">
                            <div className="w-full md:w-1/2">
                                <label htmlFor="oldpassword" className="leading-7 text-sm text-gray-600">Old Password</label>
                                <input type="password" name="oldpassword" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    required
                                    value={oldpassword}
                                    onChange={(e) => setOldpassword(e.target.value)}
                                />
                            </div>
                            <div className="w-full md:w-1/2">
                                <label htmlFor="newpassword" className="leading-7 text-sm text-gray-600">New Password</label>
                                <input type="password" name="newpassword" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="w-full md:w-1/2">
                                <label htmlFor="confirmpassword" className="leading-7 text-sm text-gray-600">Confirm Password</label>
                                <input type="password" name="confirmpassword" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    required
                                    value={confirmpassword}
                                    onChange={(e) => setConfirmpassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type="submit" className="text-white bg-blue-500 border-0 p-2 focus:outline-none hover:bg-blue-600 rounded w-fit my-4 disabled:cursor-not-allowed disabled:bg-blue-400"
                            onClick={handlePassSubmit}
                        >
                            <div className="flex flex-row items-center justify-center space-x-2">
                                Update
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default profile