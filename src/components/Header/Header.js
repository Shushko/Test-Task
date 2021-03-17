import React, { useContext, useState, useEffect } from 'react';
import { ContextApp } from '../../store/products/productsReducer'
import classes from './Header.module.css'
import SearchProductInput from "./SearchProductInput/SearchProductInput";
import { toggleComponentsVisibilityAC } from "../../store/products/productsActions";

const Header = () => {
    const { state, dispatch } = useContext(ContextApp);
    const [searchInputIsVisible, setSearchInputIsVisible] = useState(true);

    useEffect(() => {
        setSearchInputIsVisible(!(state.productFormEditorIsVisible || state.cartViewIsVisible));
    }, [state.productFormEditorIsVisible, state.cartViewIsVisible]);

    return (
        <header className={ classes.header_container }>
            { searchInputIsVisible && <SearchProductInput /> }
            <div className={ classes.header_buttons }>
                <span
                    className={ classes.button_home }
                    onClick={ () => dispatch(toggleComponentsVisibilityAC(true, false, false)) }
                >
                    Home
                </span>
                <button
                    className={ classes.button_create }
                    onClick={ () => dispatch(toggleComponentsVisibilityAC(false, true, false)) }
                >
                    Create
                </button>
                <button
                    className={ classes.button_cart }
                    onClick={ () => dispatch(toggleComponentsVisibilityAC(false, false, true)) }
                >
                    Cart
                </button>
            </div>
        </header>
    )
};

export default Header;