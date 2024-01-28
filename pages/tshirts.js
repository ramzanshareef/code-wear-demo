import Link from 'next/link'
import React from 'react'

const tshirts = (props) => {
    let colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-pink-500", "bg-purple-500", "bg-indigo-500", "bg-gray-500", "bg-black-500", "bg-white-500"];

    return (
        <div className="p-4">
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 w-fit mx-auto">
                    <div className="flex flex-wrap -m-4 justify-center p-6 space-x-3">
                        {
                            Object.keys(props.tshirts).map((product, key) => (
                                <Link href={`/product/${props.tshirts[product].slug}`} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-md rounded-lg" key={key}>
                                    <div className="block relative h-48 rounded overflow-hidden">
                                        <img alt="ecommerce" className="m-auto h-[30vh] md:h-[36vh] w-[30rem] md:w-[40rem]" src={props.tshirts[product].img} />
                                    </div>
                                    <div className="mt-4 text-center md:text-left">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{props.tshirts[product].category}</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{props.tshirts[product].title}</h2>
                                        <p className="mt-1">₹{props.tshirts[product].price}</p>
                                        <p className="mt-1">
                                            {
                                                props.tshirts[product].color.sort().map((color, key) => (
                                                    <span className={`inline-flex items-center justify-center px-2 py-1 mr-1 text-xs leading-none text-white bg-${color.toLowerCase()}-500 rounded-3xl`} key={key}>{color}</span>
                                                ))
                                            }
                                        </p>
                                        <p className="mt-1">
                                            {
                                                props.tshirts[product].size.sort().map((size, key) => (
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
    const res = await fetch(`http://localhost:3000/api/getproducts`);
    const jsonData = await res.json();
    jsonData.products = jsonData.products.filter((product) => product.category === "T Shirts");

    return {
        props: {
            products: jsonData.products,
            tshirts: jsonData.tshirts
        }
    }
};

export default tshirts;