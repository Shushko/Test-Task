import React, { useState, useContext } from 'react';
import { ContextApp } from '../../store/products/productsReducer';
import classes from './ProductCard.module.css';
import noImage from '../../assets/noImage.jpg'
import {
    addProductToCart,
    deleteProductFromCart,
    deleteProductFromList, setProductQuantityInCart,
    toggleComponentsVisibilityAC
} from "../../store/products/productsActions";

const ProductCard = ({ setEditableProduct, product }) => {
    const { state, dispatch } = useContext(ContextApp);

    const [counterInput, setCounterInput] = useState(product.quantity);

    const onChangeCounterInput = (event) => {
        const value = event.currentTarget.value;
        if (value > 0) {
            setCounterInput(value);
            setProductQuantityInCart(dispatch, product.id, value)
        }
    };

    const onClickCounterButton = (value) => {
        const resultValue = value + +counterInput;
        if (resultValue >= 1) {
            setCounterInput(resultValue);
            setProductQuantityInCart(dispatch, product.id, resultValue)
        }
    };

    const onClickEdit = () => {
        setEditableProduct(product);
        dispatch(toggleComponentsVisibilityAC(false, true, false));
    };

    const onClickDelete = () => {
        state.cartViewIsVisible ? deleteProductFromCart(dispatch, product.id) : deleteProductFromList(dispatch, product)
    };

    return (
        <div className={ state.cartViewIsVisible ? classes.product_card_in_cart : classes.product_card }>
            <img src={ product.image ? product.image : noImage } className={ classes.product_card_image } alt="image"/>
            <div className={ classes.product_card_info }>
                <span className={ classes.title }>{ product.title }</span>
                <span className={ classes.price }>{ product.price }</span>
                <span className={ classes.description }>Description: { product.description }</span>
            </div>
            <div className={ classes.product_card_buttons }>
                <button className={ classes.button_delete } onClick={ onClickDelete }>
                    Delete
                </button>
                { state.cartViewIsVisible ?
                <div className={ classes.counter_block }>
                    <button onClick={ () => onClickCounterButton(-1) }>-</button>
                    <input type="number" onChange={ onChangeCounterInput } value={ counterInput } />
                    <button onClick={ () => onClickCounterButton(+1) }>+</button>
                </div>
                    :
                <>
                    <button className={ classes.button_edit } onClick={ onClickEdit }>
                        Edit
                    </button>
                    <button className={ product.inCart ? classes.disabled_button : classes.button_add_to_cart }
                            onClick={ () => addProductToCart(dispatch, product) }
                            disabled={ product.inCart }
                    >
                        Add to cart
                    </button>
                </>}
            </div>
        </div>
    )
};

export default ProductCard