import {
    getProductsByPageNumber,
    getProductsByTitle,
    getSortProducts, removeProductFromList,
    setChangesToProduct, setNewProduct
} from "../../api/productRequests";
import {
    changeProductQuantityInCart,
    getCartProducts,
    removeProductFromCart,
    setProductToCart
} from "../../api/cartRequests";


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

const setProductQuantityInCartAC = (payload) => ({
    type: SET_PRODUCT_QUANTITY_IN_CART,
    payload
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

const handleResult = (result, actionCreator, dispatch, payload) => {
    checkForError(result) ? dispatch(toggleHasErrorAC(true)) : dispatch(actionCreator(payload))
};

export const setProducts = async (dispatch, pageNumber) => {
    const result = await getProductsByPageNumber(pageNumber);
    handleResult(result, setProductsAC, dispatch, result);
};

export const setFilteredProducts = async (dispatch, value) => {
    const result = await getProductsByTitle(value);
    handleResult(result, setProductsAC, dispatch, result);
};

export const setSortedProducts = async (dispatch, sortByAsc) => {
    const result = await getSortProducts(sortByAsc);
    handleResult(result, setProductsAC, dispatch, result);
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
    handleResult(result, deleteProductFromListAC, dispatch, product.id);
};

export const deleteProductFromCart = async (dispatch, productId) => {
    const result = await removeProductFromCart(productId);
    handleResult(result, deleteProductFromCartAC, dispatch, productId);
};

export const addProductToCart = async (dispatch, product) => {
    const { id, title, price, description } = product;
    const cartProduct = { id, title, price, description, quantity: 1 };
    const result = await setProductToCart(cartProduct);
    handleResult(result, addProductToCartAC, dispatch, product.id);
};

export const setCartProducts = async (dispatch) => {
    const result = await getCartProducts();
    handleResult(result, setCartProductsAC, dispatch, result);
};

export const setProductQuantityInCart = async (dispatch, productId, value) => {
    const result = await changeProductQuantityInCart(productId, value);
    handleResult(result, setProductQuantityInCartAC, dispatch, { productId, value });
};
