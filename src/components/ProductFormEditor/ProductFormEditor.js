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
        const newProduct = {
            title: titleInputValue.trim(),
            price: priceInputValue,
            description: descriptionInputValue.trim(),
            inCart: false
        };
        const productId = editableProduct ? editableProduct.id : '';
        await addNewChanges(dispatch, newProduct, !!editableProduct, productId)
    };

    return (
        <div className={ classes.create_view_container }>
            <h1>{ editableProduct ? 'Edit your product' : 'Create new product' }</h1>
            <form className={ classes.create_form }>
                <label htmlFor="title">Title</label>
                <input
                    type="text" id="title"
                    onChange={ e => setTitleInputValue(e.currentTarget.value) }
                    value={ titleInputValue }
                    placeholder="Type your title..."
                />
                <label htmlFor="price">Price</label>
                <input
                    type="number" id="price"
                    onChange={ e => setPriceInputValue(e.currentTarget.value) }
                    value={ priceInputValue }
                    placeholder="Type your price..."
                />
                <label htmlFor="description">Description</label>
                <textarea
                    cols="30" rows="10" id="description"
                    onChange={ e => setDescriptionInputValue(e.currentTarget.value) }
                    value={ descriptionInputValue }
                    placeholder="Type your description..."
                />
                <button type="submit" onClick={ onClickSubmit }>Save</button>
            </form>
        </div>
    )
};

export default ProductFormEditor