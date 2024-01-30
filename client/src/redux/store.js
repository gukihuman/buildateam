import { configureStore } from "@reduxjs/toolkit"
import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
} from "./actionTypes"

const initialState = {
    products: [],
    isLoading: false,
    error: null,
}

function productsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return { ...state, isLoading: true }
        case FETCH_PRODUCTS_SUCCESS:
            return { ...state, isLoading: false, products: action.payload }
        case FETCH_PRODUCTS_FAILURE:
            return { ...state, isLoading: false, error: action.error }
        default:
            return state
    }
}

export const store = configureStore({
    reducer: {
        products: productsReducer,
    },
})
