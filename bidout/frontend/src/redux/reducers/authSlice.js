import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import authService from '../services/authServices';

const initialState = {
  loggedInUser: JSON.parse(localStorage.getItem('user')) || null,
  users: [],
  error: false,
  success: false,
  isLoading: false,
  isLoggedIn: JSON.parse(localStorage.getItem('user')) ? true : false,
  message: '',
  totalCommission: 0,
};

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.register(userData);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || 'Something went wrong'
      );
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.login(userData);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || 'Something went wrong'
      );
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (thunkAPI) => {
  try {
    await authService.logout();
    localStorage.removeItem('user');
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data || error.message || 'Something went wrong'
    );
  }
});

export const getLoginStatus = createAsyncThunk(
  'auth/status',
  async (thunkAPI) => {
    try {
      const response = await authService.getLoginStatus();
      if (!response) {
        localStorage.removeItem('user');
      }
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || 'Something went wrong'
      );
    }
  }
);

export const getLoggedInUser = createAsyncThunk(
  'auth/loggedInUser',
  async (thunkAPI) => {
    try {
      const response = await authService.getLoggedInUser();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || 'Something went wrong'
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.updateUserProfile(userData);
      localStorage.setItem('user', JSON.stringify(response.data));
      toast.success('Profile updated successfully');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || 'Something went wrong'
      );
    }
  }
);

export const getTotalIncome = createAsyncThunk(
  'auth/adminIncome',
  async (thunkAPI) => {
    try {
      const response = await authService.getTotalIncomeAdmin();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || 'Something went wrong'
      );
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'auth/getAllUsers',
  async (thunkAPI) => {
    try {
      const response = await authService.getAllUsers();
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    RESET(state) {
      state.error = false;
      state.isLoading = false;
      state.success = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.isLoggedIn = true;
        state.loggedInUser = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload.message;
        state.loggedInUser = null;
        toast.error(action.payload.message);
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.isLoggedIn = true;
        state.loggedInUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload.message;
        state.loggedInUser = null;
        toast.error(action.payload.message);
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.isLoggedIn = false;
        state.loggedInUser = null;
        toast.success('Logged out successfully');
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.message = 'Something went wrong';
        toast.error('Something went wrong');
      })
      .addCase(getLoginStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoginStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.isLoggedIn = action.payload;
        if (!action.payload) {
          state.loggedInUser = null;
        }
      })
      .addCase(getLoginStatus.rejected, (state) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.message = 'Something went wrong';
        toast.error('Something went wrong');
      })
      .addCase(getLoggedInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoggedInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.loggedInUser = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(getLoggedInUser.rejected, (state) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.isLoggedIn = false;
        state.loggedInUser = null;
        localStorage.removeItem('user');
        state.message = 'Something went wrong';
        toast.error('Something went wrong');
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.loggedInUser = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getTotalIncome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTotalIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.totalCommission = action.payload;
      })
      .addCase(getTotalIncome.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
        toast.error('Something went wrong!');
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
        state.users = [];
        toast.error('Something went wrong!');
      });
  },
});

export const { RESET } = authSlice.actions;

export default authSlice.reducer;
