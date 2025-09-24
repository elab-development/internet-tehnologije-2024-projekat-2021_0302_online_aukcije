import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import productService from '../services/productService';

const initialState = {
  products: [],
  userProducts: [],
  wonProducts: [],
  verifiedProducts: [],
  product: null,
  isLoading: false,
  success: false,
  error: false,
  message: '',
};

export const createProduct = createAsyncThunk(
  'product/create',
  async (productData, thunkAPI) => {
    try {
      const response = await productService.createProduct(productData);
      if (response.success) {
        toast.success(response.message);
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || 'Something went wrong'
      );
    }
  }
);

export const getMyProducts = createAsyncThunk(
  'product/getMy',
  async (thunkAPI) => {
    try {
      const response = await productService.getMyProducts();
      if (response.success) {
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || 'Something went wrong'
      );
    }
  }
);

export const getMyWonProducts = createAsyncThunk(
  'product/getMyWon',
  async (thunkAPI) => {
    try {
      const response = await productService.getMyWonProducts();
      if (response.success) {
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || 'Something went wrong'
      );
    }
  }
);

export const getAllProducts = createAsyncThunk(
  'product/get',
  async (thunkAPI) => {
    try {
      const response = await productService.getAllProducts();
      if (response.success) {
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || 'Something went wrong'
      );
    }
  }
);

export const getFilteredProducts = createAsyncThunk(
  'product/getFilter',
  async (query, thunkAPI) => {
    try {
      const response = await productService.getFilteredProducts(query);
      if (response.success) {
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || 'Something went wrong'
      );
    }
  }
);

export const getVerifiedProducts = createAsyncThunk(
  'product/getVerified',
  async (thunkAPI) => {
    try {
      const response = await productService.getVerifiedProducts();
      if (response.success) {
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || 'Something went wrong'
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/delete',
  async (id, thunkAPI) => {
    try {
      await productService.deleteProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || 'Something went wrong'
      );
    }
  }
);

export const deleteProductByAdmin = createAsyncThunk(
  'product/deleteAdmin',
  async (id, thunkAPI) => {
    try {
      await productService.deleteProductByAdmin(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || 'Something went wrong'
      );
    }
  }
);

export const getProduct = createAsyncThunk(
  'product/getOne',
  async (id, thunkAPI) => {
    try {
      const response = await productService.getProduct(id);
      if (response.success) {
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || 'Something went wrong'
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product/update',
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await productService.updateProduct(id, formData);
      if (response.success) {
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || 'Something went wrong'
      );
    }
  }
);

export const verifyProductByAdmin = createAsyncThunk(
  'product/verify',
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await productService.verifyProductByAdmin(id, formData);
      if (response.success) {
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || 'Something went wrong'
      );
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.message = 'pending';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = false;
        state.message = 'success';
        state.products.push(action.payload);
        state.userProducts.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
        toast.error('Something went wrong!');
      })
      .addCase(getMyProducts.pending, (state) => {
        state.isLoading = true;
        state.message = 'pending';
      })
      .addCase(getMyProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = false;
        state.message = 'success';
        state.userProducts = action.payload;
      })
      .addCase(getMyProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.userProducts = [];
        state.message = action.payload;
        toast.error('Something went wrong!');
      })
      .addCase(getMyWonProducts.pending, (state) => {
        state.isLoading = true;
        state.message = 'pending';
      })
      .addCase(getMyWonProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = false;
        state.message = 'success';
        state.wonProducts = action.payload;
      })
      .addCase(getMyWonProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.wonProducts = [];
        state.message = action.payload;
        toast.error('Something went wrong!');
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.message = 'pending';
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = false;
        state.message = 'success';
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.products = [];
        state.message = action.payload;
        toast.error('Something went wrong!');
      })
      .addCase(getFilteredProducts.pending, (state) => {
        state.isLoading = true;
        state.message = 'pending';
      })
      .addCase(getFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = false;
        state.message = 'success';
        state.products = action.payload;
      })
      .addCase(getFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.products = [];
        state.message = action.payload;
        toast.error('Something went wrong!');
      })
      .addCase(getVerifiedProducts.pending, (state) => {
        state.isLoading = true;
        state.message = 'pending';
      })
      .addCase(getVerifiedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = false;
        state.message = 'success';
        state.verifiedProducts = action.payload;
      })
      .addCase(getVerifiedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.verifiedProducts = [];
        state.message = action.payload;
        toast.error('Something went wrong!');
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.message = 'pending';
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = false;
        state.message = 'success';
        toast.success('Product deleted successfully');
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
        toast.error('Something went wrong');
      })
      .addCase(deleteProductByAdmin.pending, (state) => {
        state.isLoading = true;
        state.message = 'pending';
      })
      .addCase(deleteProductByAdmin.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = false;
        state.message = 'success';
        toast.success('Product deleted successfully');
      })
      .addCase(deleteProductByAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
        toast.error('Something went wrong');
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
        state.message = 'pending';
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = false;
        state.message = 'success';
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.product = null;
        state.message = action.payload;
        toast.error('Something went wrong');
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.message = 'pending';
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = false;
        state.message = 'success';
        state.product = null;
        toast.success('Product updated successfully');
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.product = null;
        state.message = action.payload;
        toast.error('Something went wrong');
      })
      .addCase(verifyProductByAdmin.pending, (state) => {
        state.isLoading = true;
        state.message = 'pending';
      })
      .addCase(verifyProductByAdmin.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = false;
        state.message = 'success';
        toast.success('Product verified successfully');
      })
      .addCase(verifyProductByAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
        toast.error('Something went wrong');
      });
  },
});

export default productSlice.reducer;
