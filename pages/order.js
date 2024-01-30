import Order from "@/models/Order";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const order = (props) => {
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push("/login");
        }
        else if (router.query.orderID == undefined) {
            router.push("/");
        }
        else if (props.order === null) {
            router.push("/");
        }
    }, [])
    



    return (
        <div>
            <ToastContainer />
            <section className="text-gray-600 body-font overflow-hidden p-4">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-col md:flex-row flex-wrap-reverse space-y-4 md:space-y-0">
                        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                Order ID: {props.order && props.order.orderID}
                            </h2>
                            <h1 className="text-gray-900 text-lg md:text-3xl title-font font-medium mb-4">
                                Yayy! Order placed successfully 🎉
                            </h1>
                            <p className="leading-relaxed mb-4">
                                Your payment status is <b>{props.order && props.order.status}</b>. <br />
                                Your order has been placed successfully. You will receive an email with the order details.
                            </p>
                            <div className="my-4">
                                <div className="flex flex-row  mb-2 border-b-2 p-2">
                                    <span className="font-semibold w-1/3 text-center">Item</span>
                                    <span className="font-semibold w-1/3 text-center">Quantity</span>
                                    <span className="font-semibold w-1/3 text-center">Item Total</span>
                                </div>
                                <div className="flex flex-col space-y-3">
                                    {
                                        props.order && Object.values(Object.values(props.order.products)[0]).map((order, index) => {
                                            return (
                                                <div className="flex flex-row border-b p-2" key={index} >
                                                    <span className="w-1/3 text-center">{order.name + " (" + order.size + "/" + order.color + ")"}</span>
                                                    <span className="w-1/3 text-center">{order.qty}</span>
                                                    <span className="w-1/3 text-center">₹{order.price*order.qty}</span>
                                                </div>
                                            )
                                        })

                                    }
                                </div>
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-lg md:text-2xl text-gray-900">
                                   Amount Paid : ₹{props.order && props.order.amount}
                                    </span>
                                <button className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded">
                                    Track Order
                                </button>
                            </div>
                        </div>
                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export async function getServerSideProps(context) {
    const orderID = context.query.orderID;
    const order = await Order.findOne({orderID: orderID});
    return {
        props: {
            order: JSON.parse(JSON.stringify(order))
        }
    }
}

export default order