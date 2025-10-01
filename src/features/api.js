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
export const getUsers = createAsyncThunk("users/getUsers", async (pageNumber = 1, pageSize = 10) => {
    try {
        let { data } = await axiosToken.get(`${baseApi}/UserProfile/get-user-profiles`, {
            params: { pageNumber, pageSize },
        });
        if (data && data.data) {
            return {
                users: data.data || [],
                totalPage: data.totalPage || 0,
                totalRecord: data.totalRecord || 0,
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

export const getBrands = createAsyncThunk("brands/getBrands",
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

export const getCategory = createAsyncThunk("category/getCategory", async () => {
    try {
        const { data } = await axiosToken.get(`${baseApi}/Category/get-categories`);
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

const initialUser = {
    users: [],
    loading: false,
}
const initialBrands = {
    brands: [],
    loading: false,
}
const initialcategory = {
    category: [],
    loading: false,
}

// ?  get Category
export const itemsCategory = createSlice({
    name: "category",
    initialState: initialcategory,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategory.pending, (state) => { state.loading = true })
            .addCase(getCategory.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.category = payload;
            })
            .addCase(getCategory.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    }
})
// ?  get Users
export const itemsUsers = createSlice({
    name: "users",
    initialState: initialUser,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => { state.loading = true })
            .addCase(getUsers.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.users = payload;
            })
            .addCase(getUsers.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    }
})



// ?  get Brands
export const itemsBrands = createSlice({
    name: "users",
    initialState: initialBrands,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBrands.pending, (state) => { state.loading = true })
            .addCase(getBrands.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.brands = payload;
            })
            .addCase(getBrands.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    }
})


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
