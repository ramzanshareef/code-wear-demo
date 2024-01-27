import Link from 'next/link'
import React from 'react'

const tshirts = (props) => {

    return (
        <div className="p-4">
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 w-fit mx-auto">
                    <div className="flex flex-wrap -m-4 justify-center p-6">
                        {
                            props.products.map((product, key) => (
                                <Link href={`/product/${product.slug}`} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-md rounded-lg m-1" key={key}>
                                    <div className="block relative h-48 rounded overflow-hidden">
                                        <img alt="ecommerce" className="m-auto h-[30vh] md:h-[36vh] w-[30rem] md:w-[40rem]" src={product.img} />
                                    </div>
                                    <div className="mt-4 text-center md:text-left">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.category}</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{product.title}</h2>
                                        <p className="mt-1">₹{product.price}</p>
                                        <p className="mt-1">Sizes: {product.size}</p>
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
            products: jsonData.products
        }
    }
};

export default tshirts;