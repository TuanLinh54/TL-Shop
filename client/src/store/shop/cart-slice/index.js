import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


const initialState = {
    cartItems: [],
    isLoading: false
}

export const addToCart = createAsyncThunk('cart/addToCart',
    async ({ userId, productId, quantity }) => {

        const response = await axios.post('http://localhost:8080/api/shop/cart/add',
            {
                userId,
                productId,
                quantity
            }
        );

        return response.data;
    });

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems',
    async ({ userId }) => {
        const response = await axios.post(`http://localhost:8080/api/shop/cart/get/${userId}`
        );

        return response.data;
    });

export const deleteCartItem = createAsyncThunk('cart/fetchCartItems',
    async ({ userId, productId, quantity }) => {
        const response = await axios.post('http://localhost:8080/api/shop/cart/add',
            {
                userId,
                productId,
                quantity
            }
        );

        return response.data;
    });

export const addToCart = createAsyncThunk('cart/addToCart', async ({ userId, productId, quantity }) => {

    const response = await axios.post('http://localhost:8080/api/shop/cart/add',
        {
            userId,
            productId,
            quantity
        }
    );

    return response.data;
});

const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})