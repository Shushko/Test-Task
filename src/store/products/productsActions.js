import {
    changeProductQuantityInCart,
    getCartProducts,
    getProductsByPageNumber,
    getProductsByTitle,
    getSortProducts, removeProductFromCart, removeProductFromList,
    setChangesToProduct,
    setNewProduct, setProductToCart
} from "../../api/api";

const SET_PRODUCTS = 'SET_PRODUCTS';
const DELETE_PRODUCT_FROM_LIST = 'DELETE_PRODUCT_FROM_LIST';
const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART';
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
const SET_CART_PRODUCTS = 'SET_CART_PRODUCTS';
const SET_PRODUCT_QUANTITY_IN_CART = 'SET_PRODUCT_QUANTITY_IN_CART';
const TOGGLE_NUMBER_OF_ACTIVE_PAGE = 'TOGGLE_NUMBER_OF_ACTIVE_PAGE';
const TOGGLE_HAS_ERROR = 'TOGGLE_HAS_ERROR';
const TOGGLE_COMPONENTS_VISIBILITY = 'TOGGLE_COMPONENTS_VISIBILITY';

const setProductsAC = (products) => ({
    type: SET_PRODUCTS,
    payload: products
});

export const toggleNumberOfActivePageAC = (pageNumber) => ({
    type: TOGGLE_NUMBER_OF_ACTIVE_PAGE,
    payload: pageNumber
});

const deleteProductFromListAC = (productId) =>( {
    type: DELETE_PRODUCT_FROM_LIST,
    productId
});

const deleteProductFromCartAC = (productId) =>( {
    type: DELETE_PRODUCT_FROM_CART,
    productId
});

const addProductToCartAC = (productId) => ({
    type: ADD_PRODUCT_TO_CART,
    payload: productId
});

const setCartProductsAC = (cartProducts) => ({
    type: SET_CART_PRODUCTS,
    payload: cartProducts
});

const setProductQuantityInCartAC = (productId, value) => ({
    type: SET_PRODUCT_QUANTITY_IN_CART,
    productId,
    value
});

const toggleHasErrorAC = (value) => ({
    type: TOGGLE_HAS_ERROR,
    payload: value
});

export const toggleComponentsVisibilityAC = (mainViewIsVisible, productFormEditorIsVisible, cartViewIsVisible) => ({
    type: TOGGLE_COMPONENTS_VISIBILITY,
    mainViewIsVisible,
    productFormEditorIsVisible,
    cartViewIsVisible
});


const checkForError = result => result instanceof Error;

export const setProducts = async (dispatch, pageNumber) => {
    const result = await getProductsByPageNumber(pageNumber);
    !checkForError(result) ? dispatch(setProductsAC(result)) : dispatch(toggleHasErrorAC(true));
};

export const setFilteredProducts = async (dispatch, value) => {
    const result = await getProductsByTitle(value);
    !checkForError(result) ? dispatch(setProductsAC(result)) : dispatch(toggleHasErrorAC(true));
};

export const setSortedProducts = async (dispatch, value) => {
    const result = await getSortProducts(value);
    !checkForError(result) ? dispatch(setProductsAC(result)) : dispatch(toggleHasErrorAC(true));
};

export const addNewChanges = async (dispatch, newProduct, isEditMode, productId) => {
    const result = isEditMode ? await setChangesToProduct(newProduct, productId) : await setNewProduct(newProduct);
    if (!checkForError(result)) {
        await setProducts(dispatch, 1);
        dispatch(toggleNumberOfActivePageAC(1));
        dispatch(toggleComponentsVisibilityAC(true, false, false))
    } else {
        dispatch(toggleHasErrorAC(true));
    }
};

export const deleteProductFromList = async (dispatch, product) => {
    const result = await removeProductFromList(product);
    !checkForError(result) ? dispatch(deleteProductFromListAC(product.id)) : dispatch(toggleHasErrorAC(true));
};

export const deleteProductFromCart = async (dispatch, productId) => {
    const result = await removeProductFromCart(productId);
    !checkForError(result) ? dispatch(deleteProductFromCartAC(productId)) : dispatch(toggleHasErrorAC(true));
};

export const addProductToCart = async (dispatch, product) => {
    const { id, title, price, description } = product;
    const cartProduct = { id, title, price, description, quantity: 1 };
    const result = await setProductToCart(cartProduct);
    !checkForError(result) ? dispatch(addProductToCartAC(product.id)) : dispatch(toggleHasErrorAC(true));
};

export const setCartProducts = async (dispatch) => {
    const result = await getCartProducts();
    !checkForError(result) ? dispatch(setCartProductsAC(result)) : dispatch(toggleHasErrorAC(true));
};

export const setProductQuantityInCart = async (dispatch, productId, value) => {
    const result = await changeProductQuantityInCart(productId, value);
    !checkForError(result) ? dispatch(setProductQuantityInCartAC(productId, value)) : dispatch(toggleHasErrorAC(true));
};
