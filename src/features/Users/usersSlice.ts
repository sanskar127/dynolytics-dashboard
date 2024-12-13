// usersSlice.ts

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

// Async Thunk to delete a user by ID
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: number) => {
    const response = await fetch(`http://localhost:5000/users/${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete the user');
    }
    return userId; // return the userId to remove from the state
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
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted user from the list
        state.list = state.list.filter(user => user.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete the user';
      });
  },
});

export default userSlice.reducer;
