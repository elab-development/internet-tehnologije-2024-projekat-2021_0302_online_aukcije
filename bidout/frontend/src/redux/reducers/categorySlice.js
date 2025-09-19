import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import categoryService from '../services/categoryService';

const initialState = {
  categories: [],
  category: null,
  isLoading: false,
  success: false,
  error: false,
  message: '',
};

export const createCategory = createAsyncThunk(
  'category/create',
  async (categoryData, thunkAPI) => {
    try {
      const response = await categoryService.createCategory(categoryData);
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

export const getAllCategories = createAsyncThunk(
  'category/getAll',
  async (thunkAPI) => {
    try {
      const response = await categoryService.getAllCategories();
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

export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (id, thunkAPI) => {
    try {
      const response = await categoryService.deleteCategory(id);
      if (response.success) {
        return response.message;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || 'Something went wrong'
      );
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.message = 'pending';
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = false;
        state.message = 'success';
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.message = 'Something went wrong';
        toast.error('Something went wrong!');
      })
      .addCase(getAllCategories.pending, (state) => {
        state.message = 'pending';
        state.isLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
        state.message = 'Error fetching categories';
        state.categories = [];
        toast.error('Something went wrong!');
      })
      .addCase(deleteCategory.pending, (state) => {
        state.message = 'pending';
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.message = 'Error deleting category';
        toast.error('Something went wrong!');
      });
  },
});

//export const {} = categorySlice.actions;

export default categorySlice.reducer;
