import React, { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch("http://localhost:3000/api/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, password }),
			});
			const data = await res.json();
			toast.success(data.message,{
				position: "top-center",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			setName("");
			setEmail("");
			setPassword("");
		} 
		catch (err) {
			console.log(err);
		}
	};


	return (
		<div>
			<ToastContainer />
			<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						className="mx-auto h-10 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
						alt="Your Company"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign up for an account
					</h2>
				</div>
				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form onSubmit={handleSubmit} className="space-y-6" method="POST">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Name
							</label>
							<div className="mt-2">
								<input
									id="name"
									name="name"
									type="text"
									autoComplete="name"
									value={name}
									required
									onChange={(e) => setName(e.target.value)}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-2"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									value={email}
									required
									onChange={(e) => setEmail(e.target.value)}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-2"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Password
							</label>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									value={password}
									autoComplete="current-password"
									required
									onChange={(e) => setPassword(e.target.value)}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-2"
								/>
							</div>
						</div>
						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" >
								Sign up
							</button>
						</div>
					</form>
					<p className="mt-10 text-center text-sm text-gray-500">
						Already have an account? &nbsp;
						<Link href={"/login"} className="font-semibold leading-6 text-blue-600 hover:text-blue-500" >
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}

export default signup