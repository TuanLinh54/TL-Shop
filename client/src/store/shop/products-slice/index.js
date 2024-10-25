import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    productList: [],
    productDetails: null
}

export const fetchAllFilteredProducts = createAsyncThunk(
    "/products/fetchAllProducts",
    async ({ filterParams, sortParams }) => {

        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams,
        })

        const result = await axios.get(
            `${import.meta.env.VITE_API_URL}/shop/products/get?${query}`,
        )
        return result?.data;
    }
);

export const fetchProductDetails = createAsyncThunk(
    "/products/fetchProductDetails",
    async (id) => {

        const result = await axios.get(
            `${import.meta.env.VITE_API_URL}/shop/products/get/${id}`,
        )
        return result?.data;
    }
);

const shoppingProductsSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {
        setProductDetails: (state) => {
            state.productDetails = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFilteredProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.productList = action.payload.data;
            })
            .addCase(fetchAllFilteredProducts.rejected, (state) => {
                state.isLoading = false
                state.productList = []
            })
            .addCase(fetchProductDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.productDetails = action.payload.data;
            })
            .addCase(fetchProductDetails.rejected, (state) => {
                state.isLoading = false
                state.productDetails = null
            })
    }
});

export const { setProductDetails } = shoppingProductsSlice.actions;

export default shoppingProductsSlice.reducer;