export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  comment: string;
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  region: string;
  registrationDate: string;
  posts: Post[];
}

export interface UserDetails extends User { }

export interface UserState {
  list: User[];
  details: UserDetails | null;
  loading: boolean;
  error: string | null;
}

// Define the slice state types
export interface Overview {
  totalUsers: number;
  deletedUsers: number;
}

export interface UserStatus {
  active: number;
}

export interface RegistrationTrendItem {
  month: string;
  registrations: number;
}

export interface RegionDistributionItem {
  region: string;
  count: number;
}

export interface AnalyticsState {
  overview: Overview | null;
  registrationTrend: RegistrationTrendItem[];
  userStatus: UserStatus | null;
  regionDistribution: RegionDistributionItem[];
  loading: boolean;
  error: string | null;
}

// Define the types for the data we're fetching
export interface Overview {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  deletedUsers: number;
}

export interface RegistrationTrend {
  month: string;
  registrations: number;
}

export interface UserStatus {
  active: number;
  inactive: number;
}

export interface RegionDistribution {
  region: string;
  count: number;
}

export interface AnalyticsState {
  overview: Overview | null;
  registrationTrend: RegistrationTrend[];
  userStatus: UserStatus | null;
  regionDistribution: RegionDistribution[];
  loading: boolean;
  error: string | null;
}

// Define the types for the request and response
export interface UserRequest {
  uname: string
  passwd: string
}

export interface UserResponse {
  name: string
  uname: string
  passwd: string
}

// Define the state structure
export interface AuthState {
  user: UserResponse | null
  status: AuthStatus
  error: string | null
}

// Enum for status to improve type safety
export enum AuthStatus {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed'
}