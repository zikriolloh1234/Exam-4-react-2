import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosToken, baseApi } from "../app/token";

export const getProduct = createAsyncThunk("project/getProduct", async (pageNumber = 1, pageSize = 10) => {
    try {
        let { data } = await axiosToken.get(`/Product/get-products`, {
            params: { pageNumber, pageSize },
        });
        if (data && data.data) {
            return {
                products: data.data.products || [],
                totalPage: data.data.totalPage || data.totalPage || 0,
                totalRecord: data.data.totalRecord || data.totalRecord || 0,
            }
        } else {
            console.log("error:", data);
            return { products: [], totalPage: 0, totalRecord: 0 }
        }
    } catch (error) {
        console.log("error:", error);
        return { products: [], totalPage: 0, totalRecord: 0 }
    }
});

const initialState = {
    data: [],
    loading: false,
}

const itemsSlice = createSlice({
    name: "project",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(getProduct.fulfilled, (state, { payload }) => {
                state.loading = false
                state.data = payload;
            })
            .addCase(getProduct.rejected, (state, { payload }) => {
                state.loading = false
            })
    }
})

export default itemsSlice.reducer;