import Order from "@/models/Order"
import mongoose from "mongoose"
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const orders = (props) => {
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push("/login")
        }
        else {
            let token = localStorage.getItem("token");
            const getUser = async () => {
                const response = await fetch("/api/getUserOrders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ token })
                })
                if (response.status === 200) {
                    const data = await response.json();
                    setOrders(data.orders)
                }
            }
            getUser();
        }
    }, []);

    return (
        <div>
            <div className="container w-4/5 mx-auto my-5 min-h-screen">
                <h1 className="font-bold text-xl text-center my-2">
                    My Orders
                </h1>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm">
                                    <thead className="border-b border-b-gray-400 font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">Order ID</th>
                                            <th scope="col" className="px-6 py-4">Date & Time</th>
                                            <th scope="col" className="px-6 py-4">Items</th>
                                            <th scope="col" className="px-6 py-4">Quantity</th>
                                            <th scope="col" className="px-6 py-4">Price</th>
                                            <th scope="col" className="px-6 py-4">Status</th>
                                            <th scope="col" className="px-6 py-4">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders.map((order, key) => {
                                                return (
                                                    <tr key={key} className="border-b ">
                                                        <td className="px-6 py-4 whitespace-nowrap">{order.orderID}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {
                                                                new Date(order.updatedAt).toLocaleString()
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <ol className="list-decimal">
                                                                {

                                                                    Object.values(order.products[0]).map((product, key) => {
                                                                        return (
                                                                            <li className="w-1/3 text-center" key={key} >{product.name + " (" + product.size + "/" + product.color + ")"}</li>
                                                                        )
                                                                    })
                                                                }
                                                            </ol>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <ul className="list-none">
                                                                {
                                                                    Object.values(order.products[0]).map((product, key) => {
                                                                        return (
                                                                            <li className="w-1/3 text-center" key={key}>{product.qty}</li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">₹ {order.amount}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{order.payment_status}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <p className="cursor-pointer hover:underline"
                                                            onClick={()=>{
                                                                router.push("/order?orderID="+order.orderID)
                                                            }}
                                                            >
                                                                Details
                                                            </p>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        {
                                            orders.length === 0 &&
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-center" colSpan="6">No Orders</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);
    }


    return {
        props: {

        }
    }
}

export default orders