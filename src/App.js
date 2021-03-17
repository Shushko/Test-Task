import React, { useState, useEffect, useReducer } from 'react';
import { ContextApp, initialState, productsReducer } from "./store/products/productsReducer";
import classes from './App.module.css';
import MainView from "./components/MainView/MainView";
import ErrorView from "./components/ErrorView/ErrorView";
import Header from "./components/Header/Header";
import ProductFormEditor from "./components/ProductFormEditor/ProductFormEditor";
import Cart from "./components/Cart/Cart";
import { setCartProducts } from "./store/products/productsActions";

const App = () => {
    const [state, dispatch] = useReducer(productsReducer, initialState);
    const [editableProduct, setEditableProduct] = useState(null);

    useEffect(() => {
        !state.productFormEditorIsVisible && setEditableProduct(null);
    }, [state.productFormEditorIsVisible]);

    useEffect(() => {
        state.cartViewIsVisible && setCartProducts(dispatch)
    }, [state.cartViewIsVisible]);

    return (
        <ContextApp.Provider value={ { dispatch, state } }>
            <div className={ classes.app_container }>
                <Header/>
                { state.hasError ? <ErrorView /> :
                    <>
                        { state.mainViewIsVisible && <MainView setEditableProduct={ setEditableProduct }/> }
                        { state.productFormEditorIsVisible && <ProductFormEditor editableProduct={ editableProduct } /> }
                        { state.cartViewIsVisible && <Cart cartProducts={ state.cartProducts } /> }
                    </>
                }
            </div>
        </ContextApp.Provider>
    );
};

export default App;
