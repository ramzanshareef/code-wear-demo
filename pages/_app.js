import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function App({ Component, pageProps }) {
    const [cart, setCart] = useState({});
    const [subTotal, setSubTotal] = useState(0);
    const effectRan = useRef(false);
    const [user, setUser] = useState({ token: null });
    const [key, setKey] = useState(0);
    const router = useRouter();

    useEffect(() => {
        try {
            if (localStorage.getItem("cart")) {
                setCart(JSON.parse(localStorage.getItem("cart")));
                setSubTotal(JSON.parse(localStorage.getItem("subTotal")));
            }
            let token = localStorage.getItem("token");
            if (token) {
                setUser({ token: token });
                setKey(Math.random());
            }
        } catch (e) {
            saveCart({});
            console.error(e.message);
        }
    }, [router.query]);

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
        <Navbar user={user} setUser={setUser} key={key} setKey={setKey} cart={cart} addToCart={addToCart} buyNow={buyNow} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
        <Component cart={cart} addToCart={addToCart} buyNow={buyNow} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
        <Footer />
    </>
}
