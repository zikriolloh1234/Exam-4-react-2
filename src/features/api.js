import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosToken, baseApi } from "../app/token";

export const getProduct = createAsyncThunk("project/getProduct", async (pageNumber = 1, pageSize = 10) => {
    try {
        let { data } = await axiosToken.get(`${baseApi}/Product/get-products`, {
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

export const getBrands = createAsyncThunk("project/getBrands",
    async ({ pageNumber = 1, pageSize = 10, brandName, brandId }, thunkAPI) => {
        try {
            const params = { PageNumber: pageNumber, PageSize: pageSize };
            if (brandName) params.BrandName = brandName;
            if (brandId) params.BrandId = brandId;

            const { data } = await axiosToken.get("/Brand/get-brands", { params });
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

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
            .addCase(getBrands.pending, (state) => { state.loading = true })
            .addCase(getBrands.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload.data; // Сохраняем массив брендов
            })
            .addCase(getBrands.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    }
})

export default itemsSlice.reducer;