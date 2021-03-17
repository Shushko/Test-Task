const URL = 'http://localhost:8080';

const getFetchData = async (endPoint, params) => {
    try {
        const response = await fetch(`${ URL }/${ endPoint }${ params }`);
        if (response.ok) {
            const products = await response.json();
            const totalProductsCount = response.headers.get('X-Total-Count') ? response.headers.get('X-Total-Count') : products.length;
            return endPoint === 'cart' ? products : { totalProductsCount, products }
        }
    } catch (error) {
        return error
    }
};

const setFetchData = async (method, endPoint, params, body) => {
    try {
        const response = await fetch(`${ URL }/${ endPoint }${ params }`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        return error
    }
};

const deleteFetchData = async (endPoint, itemId) => {
    try {
        const response = await fetch(`${ URL }/${ endPoint }/${ itemId }`, {
            method: 'DELETE'
        });
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        return error
    }
};


export const getProductsByPageNumber = async (pageNumber) => {
    const params = `?_page=${ pageNumber }&_limit=10`;
    return await getFetchData('products', params);
};

export const getProductsByTitle = async (value) => {
    const params = `?title_like=${ value }`;
    return await getFetchData('products', params);
};

export const getSortProducts = async (value) => {
    const param = value === 'higher' ? 'asc' : 'desc';
    const params = `?_sort=price&_order=${ param }`;
    return await getFetchData('products', params);
};

export const setNewProduct = async (newProduct) => {
    return await setFetchData('POST', 'products', '', newProduct);
};

export const setChangesToProduct = async (changedProduct, productId) => {
    const params = `/${ productId }`;
    return await setFetchData('PUT', 'products', params, changedProduct);
};

export const removeProductFromList = async (product) => {
    try {
        if (product.inCart) {
            await deleteFetchData('cart', product.id);
        }
        return await deleteFetchData('products', product.id);
    } catch (error) {
        return error
    }
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

export const getCartProducts = async () => await getFetchData('cart', '');

export const changeProductQuantityInCart = async (productId, value) => {
    const params = `/${ productId }`;
    return await setFetchData('PATCH', 'cart', params, { quantity: value });
};
