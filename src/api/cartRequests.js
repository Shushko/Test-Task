import { deleteFetchData, getFetchData, setFetchData } from "./apiTemp";


export const getCartProducts = async () => await getFetchData('cart', '');

export const changeProductQuantityInCart = async (productId, value) => {
    const params = `/${ productId }`;
    return await setFetchData('PATCH', 'cart', params, { quantity: value });
};

export const removeProductFromCart = async (productId) => {
    const params = `/${ productId }`;
    try {
        await deleteFetchData('cart', productId);
        return await setFetchData('PATCH', 'products', params, { inCart: false });
    } catch (error) {
        return error
    }
};

export const setProductToCart = async (product) => {
    const params = `/${ product.id }`;
    try {
        await setFetchData('PATCH', 'products', params, { inCart: true });
        return await setFetchData('POST', 'cart', '', product);
    } catch (error) {
        return error
    }
};