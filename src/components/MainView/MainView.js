import React, { useContext, useEffect } from 'react';
import { ContextApp } from '../../store/products/productsReducer';
import classes from './MainView.module.css';
import ProductCard from "../ProductCard/ProductCard";
import CounterItem from "./CounterItem/CounterItem";
import { setProducts, setSortedProducts, toggleNumberOfActivePageAC } from "../../store/products/productsActions";

const MainView = ({ setEditableProduct }) => {
    const { state, dispatch } = useContext(ContextApp);
    const LIMIT_PRODUCTS_FOR_PAGE = 10;

    useEffect(async () => {
        await setProducts(dispatch, 1);
    }, []);

    const getPartOfProducts = () => {
        const startProductIndex = (state.activePage - 1) * LIMIT_PRODUCTS_FOR_PAGE;
        const endProductIndex = startProductIndex + LIMIT_PRODUCTS_FOR_PAGE;
        return state.products.slice(startProductIndex, endProductIndex);
    };

    const getProductsList = () => {
        const partOfProducts = state.products.length > 10 ? getPartOfProducts() : state.products;
        return partOfProducts.map(product => <ProductCard setEditableProduct={ setEditableProduct }
                                                          product={ product }
                                                          key={ product.id } />)
    };

    const onClickPageNumber = (pageNumber) => {
        if (pageNumber !== state.activePage) {
            dispatch(toggleNumberOfActivePageAC(pageNumber));
            state.products.length < 11 && setProducts(dispatch, pageNumber)
        }
    };

    const getPageCounter = () => {
        const sumOfPages = state.totalProductsCount > 1 ? Math.ceil(state.totalProductsCount / LIMIT_PRODUCTS_FOR_PAGE) : 1;
        let counter = [];
        for (let i = 1; i <= sumOfPages; i++) {
            counter = [...counter, <CounterItem item={ i } activePage={ state.activePage } onClickPageNumber={ onClickPageNumber } key={ i } />];
        }
        return counter
    };

    return (
        <main className={ classes.main_view_container }>
            <div className={ classes.sort_buttons_group }>
                <span>Sort by:</span>
                <button
                    className={ classes.sort_button } onClick={ () => setSortedProducts(dispatch, 'less') }
                >
                    descending price
                </button>
                <button
                    className={ classes.sort_button } onClick={ () => setSortedProducts(dispatch, 'higher') }
                >
                    ascending price
                </button>
            </div>
            <div className={ classes.page_numbers_section }>
                { getPageCounter() }
            </div>
            <div className={ classes.products_list }>
                { getProductsList() }
            </div>
        </main>
    );
};

export default MainView;
