import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [],
    status: 'idle',
    error: null,
    loadingProductId: null,
};

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://ajio-server.onrender.com/api/cart', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.items;
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, quantity }) => {
        const token = localStorage.getItem('token');
        const response = await axios.post('https://ajio-server.onrender.com/api/cart/add', { productId, quantity }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.items;
    }
);

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (productId) => {
        const token = localStorage.getItem('token');
        await axios.delete(`https://ajio-server.onrender.com/api/cart/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return productId;
    }
);

export const updateCartItemQuantity = createAsyncThunk(
    'cart/updateCartItemQuantity',
    async ({ productId, quantity }) => {
        const token = localStorage.getItem('token');
        const response = await axios.put(`https://ajio-server.onrender.com/api/cart/${productId}`, { quantity }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.items;
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.product.id !== action.payload);
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addToCart.pending, (state, action) => {
                state.loadingProductId = action.meta.arg.productId;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loadingProductId = null;
                state.items = action.payload;
            })
            .addCase(addToCart.rejected, (state) => {
                state.loadingProductId = null;
            });

    }
});

export const selectCartTotal = (state) => {
    return state.cart.items.reduce(
        (total, item) => total + (item.product.price * item.quantity),
        0
    );
};

export default cartSlice.reducer;