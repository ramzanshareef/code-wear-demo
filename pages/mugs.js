import Product from '@/models/Product';
import mongoose from 'mongoose';
import Link from 'next/link'
import React from 'react'

const Mugs = (props) => {
    let colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-pink-500", "bg-purple-500", "bg-indigo-500", "bg-gray-500", "bg-black-500", "bg-white-500", "bg-black"];

    return (
        <div className="p-4">
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 w-fit mx-auto">
                    <div className="flex flex-wrap -m-4 justify-center p-6 md:space-x-3">
                        {
                            Object.keys(props.mugs).length === 0 &&
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-900">No mugs Found</h2>
                                <p className="mt-2 text-sm text-gray-500">Please try again later.</p>
                            </div>
                        }
                        {
                            Object.keys(props.mugs).map((product, key) => (
                                <Link href={`/product/${props.mugs[product].slug}`} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-md rounded-lg m-1" key={key}>
                                    <div className="block relative h-48 rounded overflow-hidden">
                                        <img alt="ecommerce" className="m-auto h-[30vh] md:h-[36vh] w-[30rem] md:w-[70rem] pb-10" src={props.mugs[product].img} />
                                    </div>
                                    <div className="mt-4 text-center md:text-left">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{props.mugs[product].category}</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{props.mugs[product].title}</h2>
                                        <p className="mt-1">₹{props.mugs[product].price}</p>
                                        <p className="mt-1">
                                            {
                                                props.mugs[product].color.sort().map((color, key) => (
                                                    <span className={`inline-flex items-center justify-center px-2 py-1 mr-1 text-xs leading-none text-white bg-${color.toLowerCase()}-500 rounded-3xl 
                                                    ${(color.toLowerCase()==="black")?"bg-black":""} 
                                                    ${(color.toLowerCase()!=="white")?"text-white":"text-black bg-white border"}
                                                    `} key={key}>{color}</span>
                                                ))
                                            }
                                        </p>
                                        <p className="mt-1">
                                            {
                                                props.mugs[product].size.sort().map((size, key) => (
                                                    <span className="inline-flex items-center justify-center px-2 py-1 mr-1 text-xs leading-none border border-gray-400" key={key}>{size}
                                                    </span>
                                                ))
                                            }
                                        </p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

export async function getServerSideProps() {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
    }
    let products = await Product.find({ category: "Mugs" });
    let mugs = {}
    for (let item of products) {
        if (item.title in mugs) {
            if (!mugs[item.title].color.includes(item.color) && item.availableQty > 0) {
                mugs[item.title].color.push(item.color);
            }
            if (!mugs[item.title].size.includes(item.size) && item.availableQty > 0) {
                mugs[item.title].size.push(item.size);
            }

        }
        else {
            mugs[item.title] = JSON.parse(JSON.stringify(item));
            if (item.availableQty > 0) {
                mugs[item.title].color = [item.color];
                mugs[item.title].size = [item.size];
            }
        }
    }
    return {
        props: {
            mugs: mugs
        }
    }
};

export default Mugs;