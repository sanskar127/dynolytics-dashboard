// src/features/auth/authSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define types for the user and auth state
interface User {
  id: number;
  username: string;
  password: string;
}

interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Thunk to handle login authentication
export const login = createAsyncThunk<User, { username: string; password: string }>(
  'auth/login',
  async ({ username, password }) => {
    const response = await fetch(`http://localhost:5000/users?username=${username}&password=${password}`);
    const data: User[] = await response.json(); // Assume response is an array of users

    if (data.length > 0) {
      const user = data[0];
      // Save the user data in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      return user; // Return the user data
    } else {
      throw new Error('Invalid username or password');
    }
  }
);

// Get user from localStorage (if exists)
const loadUserFromLocalStorage = (): User | null => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

const initialState: AuthState = {
  user: loadUserFromLocalStorage(), // Load the user from localStorage if available
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      // Clear the user data from localStorage on logout
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
