import Order from "@/models/Order";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "next/error";

const order = (props) => {
    if (props.error) {
        return <Error statusCode={404} />
    }
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
                            <h1 className={`text-gray-900 text-lg md:text-3xl title-font font-medium mb-4
                            ${props.order.payment_status === "paid" ? "block" : "hidden"}
                            `}>
                                Yayy! Order placed successfully 🎉
                            </h1>
                            <h1 className={`text-gray-900 text-lg md:text-3xl title-font font-medium mb-4
                            ${props.order.payment_status === "pending" ? "block" : "hidden"}
                            `}>
                                Oops! Payment failed 😔
                            </h1>
                            <div className="leading-relaxed mb-4">
                                Order placed on <b>{props.order &&
                                    new Date(props.order.updatedAt).toLocaleString()
                                }</b>. <br />
                                Your payment status is <b>{props.order && props.order.payment_status}</b>. <br />
                                <p className={` ${props.order.payment_status === "paid" ? "block" : "hidden"} `}>
                                    Your order has been placed successfully. You will receive an email with the order details.
                                </p>
                                <p className={` ${props.order.payment_status === "pending" ? "block" : "hidden"} `}>
                                    Your order is on hold as your payment is pending. Please try again.
                                </p>
                            </div>
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
                                                    <span className="w-1/3 text-center">
                                                        {order.qty + " X " + order.price + " = "}
                                                        ₹{order.price * order.qty}
                                                    </span>
                                                </div>
                                            )
                                        })

                                    }
                                </div>
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-lg md:text-2xl text-gray-900">
                                    Total : ₹{props.order && props.order.amount}
                                </span>
                                <button className={` "flex ml-auto text-white bg-blue-500 border-0  rounded-md py-2 px-4 focus:outline-none hover:bg-blue-600" ${props.order.payment_status === "paid" ? "block" : "hidden"} `}>
                                    Track Order
                                </button>
                                <button className={` "flex ml-auto text-white bg-blue-500 border-0  rounded-md py-2 px-4 focus:outline-none hover:bg-blue-600" ${props.order.payment_status === "pending" ? "block" : "hidden"} `}>
                                    Try Again
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
    let error = null;
    const orderID = context.query.orderID;
    const order = await Order.findOne({ orderID: orderID });
    if (!order) {
        return {
            props: {
                error: "Order not found"
            }
        }
    }
    return {
        props: {
            order: JSON.parse(JSON.stringify(order)),
        }
    }
}

export default order