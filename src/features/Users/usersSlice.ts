import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, UserDetails, UserState } from '../../types/types';

// Async Thunk to fetch all users
export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const response = await fetch('http://localhost:5000/users'); // replace with actual API URL
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  }
);

// Async Thunk to fetch user details by ID
export const fetchUserDetails = createAsyncThunk<UserDetails, string>(
  'users/fetchUserDetails',
  async (userId) => {
    const response = await fetch(`http://localhost:5000/users/${userId}`); // replace with actual API URL
    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }
    return response.json();
  }
);

const initialState: UserState = {
  list: [],
  details: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })

      // Fetch User Details
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
        state.error = null;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user details';
      });
  },
});

export default userSlice.reducer;
