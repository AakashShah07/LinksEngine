const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const api = {
  async register(data: { name: string; email: string; password: string; bio: string }) {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new ApiError(response.status, error.message || 'Registration failed');
    }

    return response.json();
  },

  async login(data: { email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new ApiError(response.status, error.message || 'Login failed');
    }

    return response.json();
  },

  async getPosts() {
    const response = await fetch(`${API_BASE_URL}/api/posts`);
    
    if (!response.ok) {
      throw new ApiError(response.status, 'Failed to fetch posts');
    }

    return response.json();
  },

  async createPost(text: string, token: string) {
    const response = await fetch(`${API_BASE_URL}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new ApiError(response.status, error.message || 'Failed to create post');
    }

    return response.json();
  },

  async getUser(id: string) {
    const response = await fetch(`${API_BASE_URL}/api/users/${id}`);
    
    if (!response.ok) {
      throw new ApiError(response.status, 'Failed to fetch user');
    }

    return response.json();
  },

  async getCurrentUser(token: string) {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new ApiError(response.status, 'Failed to fetch current user');
    }

    return response.json();
  },
};