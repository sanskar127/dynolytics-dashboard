// types.ts

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
    id: string;
    name: string;
    email: string;
    status: string;
    region: string;
    registrationDate: string;
    posts: Post[];
  }
  
  export interface UserDetails extends User {}
  
  export interface UserState {
    list: User[];
    details: UserDetails | null;
    loading: boolean;
    error: string | null;
  }
  