import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [],
    status: 'idle',
    error: null,
    loadingProductId: null
};

export const fetchWishlist = createAsyncThunk(
    'wishlist/fetchWishlist',
    async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://ajio-server.onrender.com/api/wishlist', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.products;
    }
);

export const addToWishlist = createAsyncThunk(
    'wishlist/addToWishlist',
    async (productId) => {
        const token = localStorage.getItem('token');
        const response = await axios.post('https://ajio-server.onrender.com/api/wishlist/add', { productId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.products;
    }
);

export const removeFromWishlist = createAsyncThunk(
    'wishlist/removeFromWishlist',
    async (productId) => {
        const token = localStorage.getItem('token');
        await axios.delete(`https://ajio-server.onrender.com/api/wishlist/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return productId;
    }
);

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addToWishlist.pending, (state, action) => {
                state.loadingProductId = action.meta.arg;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.loadingProductId = null;
                state.items = action.payload;
            })
            .addCase(addToWishlist.rejected, (state) => {
                state.loadingProductId = null;
            })
            .addCase(removeFromWishlist.pending, (state, action) => {
                state.loadingProductId = action.meta.arg;
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.loadingProductId = null;
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(removeFromWishlist.rejected, (state) => {
                state.loadingProductId = null;
            });
    }
});

export default wishlistSlice.reducer;