import { deleteFetchData, getFetchData, setFetchData } from "./apiTemp";


export const getProductsByPageNumber = async (pageNumber) => {
    const params = `?_page=${ pageNumber }&_limit=10`;
    return await getFetchData('products', params);
};

export const getProductsByTitle = async (value) => {
    const params = `?title_like=${ value }`;
    return await getFetchData('products', params);
};

export const getSortProducts = async (sortByAsc) => {
    const params = `?_sort=price&_order=${ sortByAsc ? 'asc' : 'desc' }`;
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
