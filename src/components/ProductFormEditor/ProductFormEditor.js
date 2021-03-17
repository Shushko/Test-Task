import React, { useState, useContext } from 'react';
import { ContextApp } from '../../store/products/productsReducer';
import classes from './ProductFormEditor.module.css';
import { addNewChanges } from "../../store/products/productsActions";

const ProductFormEditor = ({ editableProduct }) => {
    const { dispatch } = useContext(ContextApp);

    const [titleInputValue, setTitleInputValue] = useState(editableProduct ? editableProduct.title: '');
    const [priceInputValue, setPriceInputValue] = useState(editableProduct ? editableProduct.price: '');
    const [descriptionInputValue, setDescriptionInputValue] = useState(editableProduct ? editableProduct.description: '');

    const onClickSubmit = async (event) => {
        event.preventDefault();
        const title = titleInputValue.trim();
        const price = priceInputValue;
        const description = descriptionInputValue.trim();

        if (title && price && description) {
            const newProduct = { title, price, description, inCart: false };
            const productId = editableProduct ? editableProduct.id : '';
            await addNewChanges(dispatch, newProduct, !!editableProduct, productId)
        }
    };

    const onChangeTitleInput = (event) => {
        const value = event.currentTarget.value;
        const regExp = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (!regExp.test(value) || value === '') {
            setTitleInputValue(value)
        }
    };

    const onChangePriceInput = (event) => {
        const value = event.currentTarget.value;
        const numberRegExp = new RegExp("^[0-9]+$");
        if (numberRegExp.test(value.trim()) || value === '') {
            setPriceInputValue(value)
        }
    };

    return (
        <div className={ classes.create_view_container }>
            <h1>{ editableProduct ? 'Edit your product' : 'Create new product' }</h1>
            <form className={ classes.create_form }>
                <label htmlFor="title">Title</label>
                <input
                    type="text" id="title"
                    onChange={ onChangeTitleInput }
                    value={ titleInputValue }
                    placeholder="Only characters and numbers"
                />
                <label htmlFor="price">Price</label>
                <input
                    type="text" id="price"
                    onChange={ onChangePriceInput }
                    value={ priceInputValue }
                    placeholder="Only numbers"
                />
                <label htmlFor="description">Description</label>
                <textarea
                    cols="30" rows="10" id="description"
                    onChange={ (e) => setDescriptionInputValue(e.currentTarget.value) }
                    value={ descriptionInputValue }
                    placeholder="Type your description..."
                />
                <button type="submit" onClick={ onClickSubmit }>Save</button>
            </form>
        </div>
    )
};

export default ProductFormEditor