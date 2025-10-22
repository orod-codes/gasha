import apiService from './api';
import { User } from '../types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

/**
 * Authenticates user credentials against the backend API
 * @param credentials - Email and password
 * @returns Promise with authentication result
 */
export const authenticateUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const { email, password } = credentials;

  // Validate input
  if (!email || !password) {
    return {
      success: false,
      error: 'Email and password are required'
    };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      error: 'Please enter a valid email address'
    };
  }

  try {
    const response = await apiService.login(email, password);
    
    if (response.success && response.token && response.user) {
      // Store token for future requests
      apiService.setToken(response.token);
      
      return {
        success: true,
        user: response.user,
        token: response.token
      };
    } else {
      return {
        success: false,
        error: response.message || 'Login failed'
      };
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Registers a new user
 * @param userData - User registration data
 * @returns Promise with registration result
 */
export const registerUser = async (userData: {
  email: string;
  password: string;
  name: string;
  role: string;
  module?: string;
}): Promise<AuthResponse> => {
  try {
    const response = await apiService.register(userData);
    
    if (response.success && response.token && response.user) {
      apiService.setToken(response.token);
      
      return {
        success: true,
        user: response.user,
        token: response.token
      };
    } else {
      return {
        success: false,
        error: response.message || 'Registration failed'
      };
    }
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Gets the current user profile
 * @returns Promise with user profile
 */
export const getCurrentUser = async (): Promise<AuthResponse> => {
  try {
    const response = await apiService.getProfile();
    
    if (response.success && response.user) {
      return {
        success: true,
        user: response.user
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to get user profile'
      };
    }
  } catch (error) {
    console.error('Get profile error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Updates user profile
 * @param userData - Updated user data
 * @returns Promise with update result
 */
export const updateUserProfile = async (userData: {
  name?: string;
  email?: string;
}): Promise<AuthResponse> => {
  try {
    const response = await apiService.updateProfile(userData);
    
    if (response.success && response.user) {
      return {
        success: true,
        user: response.user
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to update profile'
      };
    }
  } catch (error) {
    console.error('Update profile error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Changes user password
 * @param currentPassword - Current password
 * @param newPassword - New password
 * @returns Promise with change result
 */
export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await apiService.changePassword(currentPassword, newPassword);
    
    if (response.success) {
      return { success: true };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to change password'
      };
    }
  } catch (error) {
    console.error('Change password error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Logs out the current user
 * @returns Promise with logout result
 */
export const logoutUser = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    await apiService.logout();
    apiService.clearToken();
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    // Clear token even if logout request fails
    apiService.clearToken();
    return { success: true };
  }
};

/**
 * Verifies if the current token is valid
 * @returns Promise with verification result
 */
export const verifyToken = async (): Promise<AuthResponse> => {
  try {
    const response = await apiService.verifyToken();
    
    if (response.success && response.user) {
      return {
        success: true,
        user: response.user
      };
    } else {
      // Token is invalid, clear it
      apiService.clearToken();
      return {
        success: false,
        error: 'Token is invalid'
      };
    }
  } catch (error) {
    console.error('Token verification error:', error);
    apiService.clearToken();
    return {
      success: false,
      error: 'Token verification failed'
    };
  }
};

/**
 * Gets demo accounts for display purposes
 * @returns Array of demo account information
 */
export const getDemoAccounts = () => {
  return [
    {
      email: 'superadmin@securityservice.com',
      role: 'super-admin',
      name: 'Super Administrator'
    },
    {
      email: 'admin@securityservice.com',
      role: 'admin',
      name: 'Administrator'
    },
    {
      email: 'marketing@securityservice.com',
      role: 'marketing',
      name: 'Marketing Specialist'
    },
    {
      email: 'technical@securityservice.com',
      role: 'technical',
      name: 'Technical Specialist'
    },
    {
      email: 'developer@securityservice.com',
      role: 'developer',
      name: 'Developer'
    }
  ];
};
