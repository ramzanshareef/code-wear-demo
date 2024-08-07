import Product from "@/models/Product";
import mongoose from "mongoose";
import Link from "next/link";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from "next/error";

const Slug = (props) => {
    if (props.error) {
        return <Error statusCode={404} withDarkMode={false} />
    }
    let colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-pink-500", "bg-purple-500", "bg-blue-500", "bg-gray-500", "bg-black-500", "bg-white-500", "bg-black"];
    const router = useRouter();
    const { slug } = router.query;
    const [pin, setPin] = useState("");
    const [color, setcolor] = useState(props.product.color);
    const [size, setsize] = useState(props.product.size);

    const handleOnChange = (e) => {
        setPin(e.target.value)
    }
    const checkServiceAvailability = async () => {
        if (pin.length !== 6) {
            alert("Please enter a valid pincode");
            return;
        }
        else {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ pincode: Number(pin) })
            });
            if (res.status === 200) {
                toast.success("Hurray! We deliver to this pin code.", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                toast.error("Sorry! We don't deliver to this pin code yet.", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }

    }
    const addToCart = (e) => {
        e.preventDefault();
        props.addToCart({
            itemCode: props.product._id,
            qty: 1,
            price: props.product.price,
            name: props.product.title,
            size: props.product.size,
            color: props.product.color,
            category: props.product.category
        });
        props.setShowCartSidebar(true);
    }
    const buyNow = () => {
        props.buyNow({
            itemCode: props.product._id,
            qty: 1,
            price: props.product.price,
            name: props.product.title,
            size: props.product.size,
            color: props.product.color,
            category: props.product.category
        })
        router.push("/checkout");
    }

    useEffect(() => {
        if (localStorage.getItem("effectRan") === null || localStorage.getItem("effectRan") === "false") {
            if (props.colorSizeSlug[color] !== undefined) {
                if (props.colorSizeSlug[color][size] !== undefined) {
                    // let url = `http://${proces.env.HOST}/product/${props.colorSizeSlug[color][size].slug}`;
                    // window.location = url;
                    let routerURL = `/product/${props.colorSizeSlug[color][size].slug}`
                    router.push(routerURL);
                    // router.push(url);
                    localStorage.setItem("effectRan", "true");
                }
                else {
                    // let url = `http://${proces.env.HOST}/product/${props.colorSizeSlug[color][Object.keys(props.colorSizeSlug[color])[0]].slug}`;
                    // window.location = url;
                    let routerURL = `/product/${props.colorSizeSlug[color][Object.keys(props.colorSizeSlug[color])[0]].slug}`
                    router.push(routerURL);
                    // router.push(url);
                    localStorage.setItem("effectRan", "true");
                }
            }
            else if (props.colorSizeSlug[size] !== undefined) {
                if (props.colorSizeSlug[color][size] !== undefined) {
                    // let url = `http://${proces.env.HOST}/product/${props.colorSizeSlug[color][size].slug}`;
                    // window.location = url;
                    let routerURL = `/product/${props.colorSizeSlug[color][size].slug}`
                    router.push(routerURL);
                    // router.push(url);
                    localStorage.setItem("effectRan", "true");
                }
                else {
                    // let url = `http://${proces.env.HOST}/product/${props.colorSizeSlug[color][Object.keys(props.colorSizeSlug[color])[0]].slug}`;
                    // window.location = url;
                    let routerURL = `/product/${props.colorSizeSlug[color][Object.keys(props.colorSizeSlug[color])[0]].slug}`
                    router.push(routerURL);
                    // router.push(url);
                    localStorage.setItem("effectRan", "true");
                }
            }
        }
        else {
            return;
        }
    }, [color, size])



    return (
        <div className="md:min-h-screen">
            <ToastContainer />
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-10 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap items-center justify-center text-sm md:text-base">
                        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-top rounded"
                            src={props.product.img}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">Code Wear</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{props.product.title} ({props.product.size}/{props.product.color})</h1>

                            {/* Reviews and share to social media */}
                            {/* <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span className="text-gray-600 ml-3">4 Reviews</span>
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div> */}

                            <p className="leading-relaxed">
                                {props.product.description}
                            </p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex">
                                    <span className="mr-1">Color</span>
                                    {
                                        props.variants.filter((item, index, self) => self.findIndex(v => v.color === item.color) === index).map((item, key) => (
                                            <button
                                                className={`border border-gray-300 ml-2 bg-${item.color.toLowerCase()}-500 bg-${(item.color.toLowerCase() === "black") ? "black" : ""} rounded-full w-6 h-6 focus:outline-none ${color === item.color ? "ring-2 ring-offset-2 ring-black" : ""
                                                    }`}
                                                key={key}
                                                title={key.color}
                                                onClick={() => {
                                                    localStorage.setItem("effectRan", "false");
                                                    setcolor(item.color);
                                                }}
                                            ></button>
                                        ))

                                    }
                                </div>
                                <div className="flex ml-6 items-center">
                                    <span className="mr-3">Size</span>
                                    <div className="relative">
                                        <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 pr-10"
                                            onChange={
                                                (e) => {
                                                    localStorage.setItem("effectRan", "false");
                                                    setsize(e.target.value)
                                                    // handleVariantChange(size, color)
                                                }
                                            }
                                            value={
                                                size
                                            }
                                        >
                                            {
                                                props.variants.filter((item) => item.color === color).map((item, key) => (
                                                    <option key={key}
                                                        value={item.size}
                                                    >{item.size}</option>
                                                ))
                                            }
                                        </select>
                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="inline-flex flex-row max-md:space-x-2 items-center justify-center">
                                {props.product.availableQty > 0 && <span className=" font-medium text-2xl text-gray-900">₹‎{props.product.price}</span>}
                                {props.product.availableQty <= 0 && <span className="max-md:text-sm font-medium text-2xl text-gray-900">Out of Stock!</span>}
                                <button disabled={props.product.availableQty <= 0} className="flex ml-6 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded disabled:bg-blue-400 disabled:cursor-not-allowed"
                                    onClick={buyNow}
                                >Buy Now</button>
                                <button disabled={props.product.availableQty <= 0} className="flex ml-6 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded disabled:bg-blue-400 disabled:cursor-not-allowed"
                                    onClick={addToCart}
                                >Add To Cart</button>

                                {/* Wishlist button */}
                                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                    </svg>
                                </button> */}

                            </div>
                            <div className="mt-4 flex space-x-2">
                                <input type="number" onChange={handleOnChange} className="p-2 border-2 rounded"
                                    placeholder="Enter Your Pincode"
                                    inputMode="numeric"
                                />
                                <button className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                                    onClick={checkServiceAvailability}
                                >
                                    Check Pin
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export async function getServerSideProps(context) {
    let error = null;
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL)
    }
    let product = await Product.findOne({ slug: context.query.slug });
    if (product === null) {
        return {
            props: {
                error: "Product not found"
            }
        }
    }
    let variants = await Product.find({ title: product.title, category: product.category });
    let colorSizeSlug = {};
    for (let item of variants) {
        if (Object.keys(colorSizeSlug).includes(item.color)) {
            colorSizeSlug[item.color][item.size] = { slug: item.slug }
        }
        else {
            colorSizeSlug[item.color] = {}
            colorSizeSlug[item.color][item.size] = { slug: item.slug }
        }
    }

    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
            variants: JSON.parse(JSON.stringify(variants)),
            colorSizeSlug: JSON.parse(JSON.stringify(colorSizeSlug))
        }
    }
};

export default Slug;