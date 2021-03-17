import React from "react";
export const ContextApp = React.createContext();

export const initialState = {
    products: [],
    cartProducts: [],
    totalProductsCount: 0,
    activePage: 1,
    mainViewIsVisible: true,
    productFormEditorIsVisible: false,
    cartViewIsVisible: false,
    hasError: false
};


const getStateWithoutProductInList = (state, productId) => {
    let copyProducts = [ ...state.products ];
    copyProducts = copyProducts.filter(product => product.id !== productId);
    let copyCartProducts = [ ...state.cartProducts ];
    let productInCart = copyCartProducts.length && copyCartProducts.find(item => item.id === productId);
    if (productInCart) {
        copyCartProducts = copyCartProducts.filter(product => product.id !== productId);
    }
    return { ...state, products: copyProducts, cartProducts: copyCartProducts, totalProductsCount: state.totalProductsCount - 1 }
};

const getStateWithoutProductInCart = (state, productId) => {
    let copyCartProducts = [ ...state.cartProducts ];
    copyCartProducts = copyCartProducts.filter(product => product.id !== productId);
    let copyProducts = [ ...state.products ];
    let product = copyProducts.find(item => item.id === productId);
    if (product) { product.inCart = false }
    return { ...state, products: copyProducts, cartProducts: copyCartProducts }
};

const getStateWithProductInCart = (state, productId) => {
    let copyProducts = [ ...state.products ];
    let product = copyProducts.find(item => item.id === productId);
    product.inCart = true;
    return { ...state, products: copyProducts }
};

const getStateWithChangedQuantity = (state, productId, value) => {
    let copyCartProducts = [ ...state.cartProducts ];
    let product = copyCartProducts.find(item => item.id === productId);
    product.quantity = value;
    return { ...state, cartProducts: copyCartProducts }
};


export const productsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload.products,
                totalProductsCount: action.payload.totalProductsCount
            };

        case 'SET_CART_PRODUCTS':
            return {
                ...state,
                cartProducts: action.payload
            };

        case 'DELETE_PRODUCT_FROM_LIST':
            return getStateWithoutProductInList(state, action.productId);

        case 'DELETE_PRODUCT_FROM_CART':
            return getStateWithoutProductInCart(state, action.productId);

        case 'ADD_PRODUCT_TO_CART':
            return getStateWithProductInCart(state, action.payload);

        case 'SET_PRODUCT_QUANTITY_IN_CART':
            return getStateWithChangedQuantity(state, action.productId, action.value);

        case 'TOGGLE_NUMBER_OF_ACTIVE_PAGE':
            return {
                ...state,
                activePage: action.payload
            };

        case 'TOGGLE_COMPONENTS_VISIBILITY':
            return {
                ...state,
                mainViewIsVisible: action.mainViewIsVisible,
                cartViewIsVisible: action.cartViewIsVisible,
                productFormEditorIsVisible: action.productFormEditorIsVisible
            };

        case 'TOGGLE_HAS_ERROR':
            return {
                ...state,
                hasError: action.payload
            };

        default:
            return state
    }
};