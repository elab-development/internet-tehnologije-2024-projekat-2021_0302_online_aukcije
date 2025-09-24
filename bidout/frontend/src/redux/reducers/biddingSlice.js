import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import biddingService from '../services/biddingService';

const initialState = {
  bids: [],
  bid: null,
  error: false,
  success: false,
  isLoading: false,
  message: '',
};

export const createBidding = createAsyncThunk(
  'bidding/create',
  async (bidData, thunkAPI) => {
    try {
      const response = await biddingService.placeBid(bidData);
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

export const getBiddingHistory = createAsyncThunk(
  'bidding/history',
  async (productId, thunkAPI) => {
    try {
      const response = await biddingService.getBiddingHistory(productId);
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

export const sellProduct = createAsyncThunk(
  'bidding/sell',
  async (productId, thunkAPI) => {
    try {
      const response = await biddingService.sellProduct(productId);
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

const biddingSlice = createSlice({
  name: 'bidding',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBidding.pending, (state) => {
        state.isLoading = true;
        state.message = 'pending';
      })
      .addCase(createBidding.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = false;
        state.message = 'success';
        state.bid = action.payload;
      })
      .addCase(createBidding.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.bid = null;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(getBiddingHistory.pending, (state) => {
        state.isLoading = true;
        state.message = 'pending';
      })
      .addCase(getBiddingHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = false;
        state.message = 'success';
        state.bids = action.payload;
      })
      .addCase(getBiddingHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.bids = [];
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(sellProduct.pending, (state) => {
        state.isLoading = true;
        state.message = 'pending';
      })
      .addCase(sellProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.error = false;
        state.message = 'success';
        toast.success(action.payload);
      })
      .addCase(sellProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
        toast.error(state.message);
      });
  },
});

export default biddingSlice.reducer;
