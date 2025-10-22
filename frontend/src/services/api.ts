const API_BASE_URL = 'http://localhost:3000/api';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error'
      };
    }
  }

  // Authentication methods
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: {
    email: string;
    password: string;
    name: string;
    role: string;
    module?: string;
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  async updateProfile(userData: { name?: string; email?: string }) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async verifyToken() {
    return this.request('/auth/verify');
  }

  // Products methods
  async getProducts() {
    return this.request('/products');
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`);
  }

  async createProduct(productData: any) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id: string, productData: any) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id: string) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Requests methods
  async getRequests() {
    return this.request('/requests');
  }

  async getRequest(id: string) {
    return this.request(`/requests/${id}`);
  }

  async createRequest(requestData: any) {
    return this.request('/public/requests', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  async updateRequest(id: string, requestData: any) {
    return this.request(`/requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(requestData),
    });
  }

  async deleteRequest(id: string) {
    return this.request(`/requests/${id}`, {
      method: 'DELETE',
    });
  }

  // Tasks methods
  async getTasks() {
    return this.request('/tasks');
  }

  async getTask(id: string) {
    return this.request(`/tasks/${id}`);
  }

  async createTask(taskData: any) {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async updateTask(id: string, taskData: any) {
    return this.request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  async deleteTask(id: string) {
    return this.request(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  // Content methods
  async getContent() {
    return this.request('/content');
  }

  async getContentItem(id: string) {
    return this.request(`/content/${id}`);
  }

  async createContent(contentData: any) {
    return this.request('/content', {
      method: 'POST',
      body: JSON.stringify(contentData),
    });
  }

  async updateContent(id: string, contentData: any) {
    return this.request(`/content/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contentData),
    });
  }

  async deleteContent(id: string) {
    return this.request(`/content/${id}`, {
      method: 'DELETE',
    });
  }

  // Notifications methods
  async getNotifications() {
    return this.request('/notifications');
  }

  async markNotificationAsRead(id: string) {
    return this.request(`/notifications/${id}/read`, {
      method: 'PUT',
    });
  }

  async markAllNotificationsAsRead() {
    return this.request('/notifications/read-all', {
      method: 'PUT',
    });
  }

  // Analytics methods
  async getAnalytics() {
    return this.request('/analytics');
  }

  async getAnalyticsByModule(module: string) {
    return this.request(`/analytics/module/${module}`);
  }

  // Generic request methods for modules
  async get(endpoint: string) {
    return this.request(endpoint);
  }

  async post(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string, data?: any) {
    return this.request(endpoint, {
      method: 'DELETE',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // Set token for authenticated requests
  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  // Clear token
  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }
}

export const apiService = new ApiService(API_BASE_URL);
export default apiService;
