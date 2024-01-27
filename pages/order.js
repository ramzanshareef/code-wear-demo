import React from "react";

const order = () => {
    return (
        <div>
            <section className="text-gray-600 body-font overflow-hidden p-4">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-col md:flex-row flex-wrap-reverse space-y-4 md:space-y-0">
                        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">Code Wear</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                                Order placed successfully! 🎉
                            </h1>
                            <p className="leading-relaxed mb-4">
                                Your order has been placed successfully. You will receive an email with the order details.
                            </p>
                            <div className="my-4">
                                <div className="flex flex-row  mb-2 border-b-2 p-2">
                                    <span className="font-semibold w-1/3 text-center">Item</span>
                                    <span className="font-semibold w-1/3 text-center">Quantity</span>
                                    <span className="font-semibold w-1/3 text-center">Item Total</span>
                                </div>
                                <div className="flex flex-col space-y-3">
                                    <div className="flex flex-row border-b p-2">
                                        <span className="w-1/3 text-center">T Shirt Alaka</span>
                                        <span className="w-1/3 text-center">1</span>
                                        <span className="w-1/3 text-center">₹40</span>
                                    </div>
                                    <div className="flex flex-row border-b p-2">
                                        <span className="w-1/3 text-center">T Shirt Alaka</span>
                                        <span className="w-1/3 text-center">1</span>
                                        <span className="w-1/3 text-center">₹40</span>
                                    </div>
                                    <div className="flex flex-row border-b p-2">
                                        <span className="w-1/3 text-center">T Shirt Alaka</span>
                                        <span className="w-1/3 text-center">1</span>
                                        <span className="w-1/3 text-center">₹40</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">₹599</span>
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

export default order