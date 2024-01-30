import Order from "@/models/Order"
import mongoose from "mongoose"
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const orders = (props) => {
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push(process.env.NEXT_PUBLIC_HOST)
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
                                            <th scope="col" className="px-6 py-4">Items</th>
                                            <th scope="col" className="px-6 py-4">Quantity</th>
                                            <th scope="col" className="px-6 py-4">Price</th>
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
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                            onClick={()=>{
                                                                router.push("/order?orderID="+order.orderID)
                                                            }}
                                                            >
                                                                Details
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
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
        await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
    }


    return {
        props: {

        }
    }
}

export default orders