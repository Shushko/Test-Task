const URL = 'http://localhost:8080';

export const getFetchData = async (endPoint, params) => {
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

export const setFetchData = async (method, endPoint, params, body) => {
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

export const deleteFetchData = async (endPoint, itemId) => {
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

