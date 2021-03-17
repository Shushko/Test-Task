import React, { useState, useContext } from 'react';
import { ContextApp } from '../../../store/products/productsReducer';
import classes from './SearchProductInput.module.css'
import { setFilteredProducts, toggleNumberOfActivePageAC } from "../../../store/products/productsActions";

const SearchProductInput = () => {
    const { dispatch } = useContext(ContextApp);
    const [inputValue, setInputValue] = useState('');

    const onChangeInput = async (e) => {
        const value = e.currentTarget.value;
        setInputValue(value);
        dispatch(toggleNumberOfActivePageAC(1));
        await setFilteredProducts(dispatch, value.trim())
    };

    return (
        <div className={ classes.input_wrap }>
            <input type="text" onChange={ onChangeInput } value={ inputValue } placeholder="Search by title..." />
        </div>
    )
};

export default SearchProductInput;