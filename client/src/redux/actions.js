import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
} from "./actionTypes"

export const fetchProductsRequest = () => {
    return {
        type: FETCH_PRODUCTS_REQUEST,
    }
}

export const fetchProductsSuccess = (products) => {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        payload: products,
    }
}

export const fetchProductsFailure = (error) => {
    return {
        type: FETCH_PRODUCTS_FAILURE,
        error,
    }
}
