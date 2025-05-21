import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [],
    categories: [],
    status: 'idle',
    error: null,
    searchTerm: ''
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await axios.get('https://ajio-server.onrender.com/api/products/');
        return response.data;
    }
);

export const fetchCategories = createAsyncThunk(
    'products/fetchCategories',
    async () => {
        const response = await axios.get('https://ajio-server.onrender.com/api/products/categories');
        return response.data;
    }
);

export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchProductsByCategory',
    async (category) => {
        const response = await axios.get(`https://ajio-server.onrender.com/api/products/category/${category}`);
        return response.data;
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id) => {
        const response = await axios.get(`https://ajio-server.onrender.com/api/products/${id}`);
        return response.data;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchCategories.pending, (state) => {
            state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            state.categories = [];
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = [action.payload];
            });
    }
});

export const { setSearchTerm } = productSlice.actions;

export const selectFilteredProducts = (state) => {
    const { products, searchTerm } = state.products;
    return products?.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

export default productSlice.reducer;