import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosToken, baseApi } from "../app/token";
import { Input } from "antd";

export const getProduct = createAsyncThunk("project/getProduct", async (pageNumber = 1, pageSize = 1000) => {
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

export const getUsers = createAsyncThunk("users/getUsers", async (pageNumber = 1, pageSize = 1000) => {
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
    async ({ pageNumber = 1, pageSize = 1000, brandName, brandId }, thunkAPI) => {
        try {
            const params = { PageNumber: pageNumber, PageSize: pageSize };
            if (brandName) params.BrandName = brandName;
            if (brandId) params.BrandId = brandId;

            const { data } = await axiosToken.get(`${baseApi}/Brand/get-brands`, { params });
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);


export const getColor = createAsyncThunk(
    "colors/getColor",
    async ({ colorName = "", pageNumber = 1, pageSize = 10 }, thunkAPI) => {
        try {
            const { data } = await axiosToken.get(`${baseApi}/Color/get-colors`, {
                params: {
                    ColorName: colorName,   // строка поиска (если нужна)
                    PageNumber: pageNumber, // номер страницы
                    PageSize: pageSize      // количество записей на странице
                }
            });
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const addProduct = createAsyncThunk(
    "project/addProduct",
    async (formData, thunkAPI) => {
        try {
            const response = await axiosToken.post(
                `${baseApi}/Product/add-product`,
                formData,
            );
            thunkAPI.dispatch((getProduct({ pageNumber: 1, pageSize: 1000 })));
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);
export const getSubCategory = createAsyncThunk(
    "subCategoy/getSubCategory",
    async (thunkAPI) => {
        try {
            const response = await axiosToken.get(`${baseApi}/SubCategory/get-sub-category`);
            return response.data
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

export const addBrands = createAsyncThunk("brands/addBrands", async (BrandName, thunkAPI) => {
    try {
        console.log("name", BrandName);
        const { brands } = await axiosToken.post(`${baseApi}/Brand/add-brand?BrandName=${BrandName}`, {});
        thunkAPI.dispatch((getBrands({ pageNumber: 1, pageSize: 1000 })));
        return brands;
    } catch (error) {
        console.log(error);
    }
}
);

export const deleteBrands = createAsyncThunk("brands/deleteBrands", async (BrandId, thunkAPI) => {
    try {
        console.log("name", BrandId);
        const { brands } = await axiosToken.delete(`${baseApi}/Brand/delete-brand?id=${BrandId}`);
        thunkAPI.dispatch((getBrands({ pageNumber: 1, pageSize: 1000 })));
        return brands;
    } catch (error) {
        console.log(error);
    }
}
);

export const EditBrandsApi = createAsyncThunk("brands/EditBrands", async ({ brandId, brandName }, thunkAPI) => {
    try {
        console.log("id:", brandId, "brandName:", brandName);
        const { brands } = await axiosToken.put(`${baseApi}/Brand/update-brand?Id=${brandId}&BrandName=${brandName}`);
        thunkAPI.dispatch((getBrands({ pageNumber: 1, pageSize: 1000 })));
        return brands;
    } catch (error) {
        console.log(error);
    }
}
);
export const addSubCategoryAync = createAsyncThunk("category/addSubCategory", async ({ CategoryId, SubCategoryName }, thunkAPI) => {
    try {
        console.log("id:", CategoryId, "brandName:", SubCategoryName);
        const response = await axiosToken.post(`${baseApi}/SubCategory/add-sub-category?CategoryId=${CategoryId}&SubCategoryName=${SubCategoryName}`);
        thunkAPI.dispatch((getCategory({ pageNumber: 1, pageSize: 1000 })));
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
);
export const deleteSubCategoryAync = createAsyncThunk("category/deleteSubCategoryAync", async (CategoryId, thunkAPI) => {
    try {
        console.log("id:", CategoryId);
        const response = await axiosToken.delete(`${baseApi}/SubCategory/delete-sub-category?id=${CategoryId}`);
        thunkAPI.dispatch((getCategory({ pageNumber: 1, pageSize: 1000 })));
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
);

export const editSubCategoryAync = createAsyncThunk("category/editSubCategoryAync", async ({ id, CategoryId, SubCategoryName }, thunkAPI) => {
    try {
        console.log("id:", CategoryId);
        const response = await axiosToken.delete(`${baseApi}/SubCategory/update-sub-category?Id=${id}&CategoryId=${CategoryId}&SubCategoryName=${SubCategoryName}`);
        thunkAPI.dispatch((getCategory({ pageNumber: 1, pageSize: 1000 })));
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
);

export const editCategoryAsync = createAsyncThunk("category/editCategoryAsync", async ({ id, categoryImage, categoryName }, thunkAPI) => {
    try {
        console.log("idEditcategory:", id, "categoryImage:", categoryImage, "categoryName:", categoryName);
        const editForm = new FormData();
        editForm.append("Id", id);
        editForm.append("CategoryName", categoryName);
        if (categoryImage && categoryImage.length > 0) {
            editForm.append("CategoryImage", categoryImage[0]);
        } else if (editImageCtg) { // editImageCtg — текущее имя картинки
            editForm.append("CategoryImage", editImageCtg);
        }
        const response = await axiosToken.put(`${baseApi}/Category/update-category`, editForm);
        thunkAPI.dispatch((getCategory({ pageNumber: 1, pageSize: 1000 })));
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
);

export const deleteCategoryAsync = createAsyncThunk("category/deleteCategoryAsync", async (DelCatId, thunkAPI) => {
    try {
        console.log("idDeleteCategory:", DelCatId);
        const { brands } = await axiosToken.delete(`${baseApi}/Category/delete-category?id=${DelCatId}`);
        thunkAPI.dispatch((getCategory({ pageNumber: 1, pageSize: 1000 })));
        return brands;
    } catch (error) {
        console.log(error);
    }
}
);
export const addCategoryAsync = createAsyncThunk("category/addCategoryAsync", async (formData, thunkAPI) => {
    try {
        console.log("formData:", formData);
        const { brands } = await axiosToken.post(`${baseApi}/Category/add-category`, formData);
        thunkAPI.dispatch((getCategory({ pageNumber: 1, pageSize: 1000 })));
        return brands;
    } catch (error) {
        console.log(error);
    }
}
);

export const deleteProductAsync = createAsyncThunk("project/deleteProductAsync", async (id, thunkAPI) => {
    try {
        console.log("id:", id);
        const { products } = await axiosToken.delete(`${baseApi}/Product/delete-product?id=${id}`);
        thunkAPI.dispatch((getProduct({ pageNumber: 1, pageSize: 1000 })));
        return products;
    } catch (error) {
        console.log(error);
    }
}
);

export const deleteImageProductAsync = createAsyncThunk("project/deleteProductAsync", async (id, thunkAPI) => {
    try {
        console.log("id:", id);
        const { products } = await axiosToken.delete(`${baseApi}/Product/delete-image-from-product?imageId=${id}`);
        thunkAPI.dispatch((getProduct({ pageNumber: 1, pageSize: 1000 })));
        return products;
    } catch (error) {
        console.log(error);
    }
}
);
export const addmageProductAsync = createAsyncThunk("project/addmageProductAsync", async ( thunkAPI) => {
    try {
        const { products } = await axiosToken.post(`${baseApi}/Product/add-image-to-product`);
        thunkAPI.dispatch((getProduct({ pageNumber: 1, pageSize: 1000 })));
        return products;
    } catch (error) {
        console.log(error);
    }
}
);


export const getByIdProductAsync = createAsyncThunk("byId/getByIdProductAsync", async (id, thunkAPI) => {
    try {
        console.log("id:", id);
        const  products  = await axiosToken.get(`${baseApi}/Product/get-product-by-id?id=${id}`);
        return products.data;
    } catch (error) {
        console.log(error);
    }
}
);

const initialStateGetById = {
    byId: [],
    loading: false,
}
const initialState = {
    data: [],
    loading: false,
}
const initialSubCategory = {
    subCategoryy: [],
    loading: false,
}
const initialColors = {
    colors: [],
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

// ?  get By id
export const itemsGetById = createSlice({
    name: "byId",
    initialState: initialStateGetById,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getByIdProductAsync.pending, (state) => { state.loading = true })
            .addCase(getByIdProductAsync.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.byId = payload;
            })
            .addCase(getByIdProductAsync.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    }
})

// ?  get colors
export const itemsSubCategoryes = createSlice({
    name: "subCategoy",
    initialState: initialSubCategory,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSubCategory.pending, (state) => { state.loading = true })
            .addCase(getSubCategory.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.subCategoryy = payload;
            })
            .addCase(getSubCategory.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    }
})
// ?  get colors
export const itemsColors = createSlice({
    name: "colors",
    initialState: initialColors,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getColor.pending, (state) => { state.loading = true })
            .addCase(getColor.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.colors = payload;
            })
            .addCase(getColor.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    }
})
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
    name: "brands",
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

// ? get Product
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
