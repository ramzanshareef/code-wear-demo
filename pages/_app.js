import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useEffect, useRef, useState } from "react";

export default function App({ Component, pageProps }) {
    const [cart, setCart] = useState({});
    const [subTotal, setSubTotal] = useState(0);
    const effectRan = useRef(false);

    useEffect(() => {
        if (!effectRan.current) {
            try {
                if (localStorage.getItem("cart")) {
                    setCart(JSON.parse(localStorage.getItem("cart")));
                    setSubTotal(JSON.parse(localStorage.getItem("subTotal")));
                }
            } catch (e) {
                saveCart({});
                console.error(e.message);
            }
            effectRan.current = true;
        }
        else {
            return;
        }
    }, []);

    const saveCart = (myCart) => {
        localStorage.setItem("cart", JSON.stringify(myCart));
        let subT = 0;
        for (let item in myCart) {
            subT += myCart[item].qty * myCart[item].price;
        }
        setSubTotal(subT);
        localStorage.setItem("subTotal", subT);
    }
    const addToCart = ({ itemCode, qty, price, name, size, color }) => {
        let newCart = cart;
        if (itemCode in cart) {
            newCart[itemCode].qty += qty;
        } else {
            newCart[itemCode] = { qty, price, name, size, color };
        }
        setCart(newCart);
        saveCart(newCart);
    }
    const removeFromCart = ({ itemCode, qty }) => {
        let newCart = cart;
        if (itemCode in cart) {
            newCart[itemCode].qty -= qty;
        }
        if (newCart[itemCode].qty <= 0) {
            delete newCart[itemCode];
        }
        setCart(newCart);
        saveCart(newCart);
    }
    const clearCart = () => {
        setCart({});
        saveCart({});
    }
    const buyNow = ({ itemCode, qty, price, name, size, color }) => {
        let newCart = {};
        newCart[itemCode] = { qty, price, name, size, color };
        setCart(newCart);
        saveCart(newCart);
    }


    return <>
        <Navbar cart={cart} addToCart={addToCart} buyNow={buyNow} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
        <Component cart={cart} addToCart={addToCart} buyNow={buyNow} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
        <Footer />
    </>
}
