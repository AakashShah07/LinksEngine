export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  createdAt: string;
}

export interface Post {
  id: string;
  text: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  loading: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  bio: string;
}

export interface LoginData {
  email: string;
  password: string;
}