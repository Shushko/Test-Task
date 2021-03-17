import React, { useState, useEffect } from 'react';
import classes from './Cart.module.css'
import ProductCard from "../ProductCard/ProductCard";

const Cart = ({ cartProducts }) => {

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (cartProducts.length) {
            const sum = cartProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            setTotalPrice(sum)
        } else {
            setTotalPrice(0)
        }
    }, [cartProducts]);

    const getCartProducts = () => {
        return cartProducts.map(product => {
            return (
                <div className={ classes.cart_product_wrap } key={ product.id }>
                    <ProductCard product={ product } />
                </div>
            )
        })
    };

    return (
        <div className={ classes.cart_container }>
            <h1>Cart</h1>
            { getCartProducts() }
            <div className={ classes.total_price }>
                <span>{ `Total price: ${ totalPrice }` }</span>
            </div>
        </div>
    )
};

export default Cart