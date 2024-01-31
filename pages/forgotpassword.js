import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const forgotpassword = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    useEffect(() => {
        if (localStorage.getItem("token")) {
            router.push("/");
        }
        else {
        }
    }, []);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match", {
                position: "top-center",
                autoClose: 800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => {
                    setConfirmPassword("");
                    setPassword("");
                }
            });
        }
        else if (password.length < 6) {
            toast.error("Password must be atleast 6 characters", {
                position: "top-center",
                autoClose: 800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => {
                    setConfirmPassword("");
                    setPassword("");
                }
            });
        }
        else{
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgotPassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password: password,
                    sendMail: false,
                    token: router.query.token,
                }),
            });
            const data = await res.json();
            console.log("Data from forgot password", data);
        }
    }

    const handleSendResetEmail = async (e) => {
        e.preventDefault();
        if (email === "") {
            toast.error("Please enter your email", {
                position: "top-center",
                autoClose: 800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => {
                    setEmail("");
                }
            });
        }
        else {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgotPassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    sendMail: true,
                }),
            });
            const data = await res.json();
            console.log("Data from forgot password", data);
        }
    }


    return (
        <div className="min-h-screen">
            <ToastContainer />
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot Password</h2>
                </div>
                {
                    !router.query.token &&
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-2"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                onClick={handleSendResetEmail}
                            >Send Password Reset Email</button>
                        </div>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member? &nbsp;
                            <Link href={"/signup"} className="font-semibold leading-6 text-blue-600 hover:text-blue-500" >
                                Sign up now
                            </Link>
                        </p>
                    </div>
                }
                {
                    router.query.token &&
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col space-y-4">

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autoComplete="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-2"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                            <div className="mt-2">
                                <input id="cpassword" name="cpassword" type="password" autoComplete="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-2"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <button type="submit" disabled={password !== confirmPassword || password === ""}
                                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
                                disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleResetPassword}
                            >Reset Password</button>
                        </div>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member? &nbsp;
                            <Link href={"/signup"} className="font-semibold leading-6 text-blue-600 hover:text-blue-500" >
                                Sign up now
                            </Link>
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}

export default forgotpassword