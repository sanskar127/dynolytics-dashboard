import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, AuthStatus, UserRequest, UserResponse } from "../../types/types"

// Function to load user from localStorage with error handling
const loadUserFromLocalStorage = (): UserResponse | null => {
  try {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  } catch (e) {
    console.error("Failed to parse user from localStorage", e)
    return null
  }
}

// Initial state with user loaded from localStorage
const initialState: AuthState = {
  user: loadUserFromLocalStorage(),
  status: AuthStatus.Idle,
  error: null
}

// Thunk for handling the login API request
export const login = createAsyncThunk<UserResponse, UserRequest>(
  'auth/login',
  async ({ uname, passwd }) => {
    // Perform the login request using fetch
    const response = await fetch(`http://localhost:5000/auth?uname=${uname}&passwd=${passwd}`)

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data: UserResponse = await response.json() // Assuming the response is a single user object

    if (data.uname) {
      // Save the user data to localStorage if login is successful
      localStorage.setItem('user', JSON.stringify(data))
      return data
    } else {
      throw new Error('Invalid username or password')
    }
  }
)

// Slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to log the user out and clear localStorage
    logout: (state) => {
      state.user = null
      localStorage.removeItem('user')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = AuthStatus.Loading
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserResponse>) => {
        state.status = AuthStatus.Succeeded
        state.user = action.payload
        state.error = null // Clear any previous errors
      })
      .addCase(login.rejected, (state, action) => {
        state.status = AuthStatus.Failed
        state.error = action.error.message || 'Something went wrong'
      })
  }
})

// Export the logout action
export const { logout } = authSlice.actions

// Export the reducer as default
export default authSlice.reducer
