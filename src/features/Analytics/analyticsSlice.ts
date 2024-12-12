import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the types for the data we're fetching
interface Overview {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  deletedUsers: number;
}

interface RegistrationTrend {
  month: string;
  registrations: number;
}

interface UserStatus {
  active: number;
  inactive: number;
}

interface RegionDistribution {
  region: string;
  count: number;
}

interface AnalyticsState {
  overview: Overview | null;
  registrationTrend: RegistrationTrend[];
  userStatus: UserStatus | null;
  regionDistribution: RegionDistribution[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AnalyticsState = {
  overview: null,
  registrationTrend: [],
  userStatus: null,
  regionDistribution: [],
  loading: false,
  error: null,
};

// Define async thunks to fetch data
export const fetchOverview = createAsyncThunk<Overview>(
  'analytics/fetchOverview',
  async () => {
    const response = await fetch('http://localhost:5000/overview');
    if (!response.ok) {
      throw new Error('Failed to fetch overview data');
    }
    return response.json();
  }
);

export const fetchRegistrationTrend = createAsyncThunk<RegistrationTrend[]>(
  'analytics/fetchRegistrationTrend',
  async () => {
    const response = await fetch('http://localhost:5000/registrationTrend');
    if (!response.ok) {
      throw new Error('Failed to fetch registration trend');
    }
    return response.json();
  }
);

export const fetchUserStatus = createAsyncThunk<UserStatus>(
  'analytics/fetchUserStatus',
  async () => {
    const response = await fetch('http://localhost:5000/userStatus');
    if (!response.ok) {
      throw new Error('Failed to fetch user status');
    }
    return response.json();
  }
);

export const fetchRegionDistribution = createAsyncThunk<RegionDistribution[]>(
  'analytics/fetchRegionDistribution',
  async () => {
    const response = await fetch('http://localhost:5000/regionDistribution');
    if (!response.ok) {
      throw new Error('Failed to fetch region distribution');
    }
    return response.json();
  }
);

// Create the slice
const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch overview data
      .addCase(fetchOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.overview = action.payload;
      })
      .addCase(fetchOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch overview data';
      })

      // Handle fetch registration trend data
      .addCase(fetchRegistrationTrend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegistrationTrend.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationTrend = action.payload;
      })
      .addCase(fetchRegistrationTrend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch registration trend';
      })

      // Handle fetch user status data
      .addCase(fetchUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.userStatus = action.payload;
      })
      .addCase(fetchUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user status';
      })

      // Handle fetch region distribution data
      .addCase(fetchRegionDistribution.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegionDistribution.fulfilled, (state, action) => {
        state.loading = false;
        state.regionDistribution = action.payload;
      })
      .addCase(fetchRegionDistribution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch region distribution';
      });
  }
});

// Export the reducer to be used in the store
export default analyticsSlice.reducer;
