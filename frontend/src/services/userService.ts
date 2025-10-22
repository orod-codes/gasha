import apiService from './api';

export interface UserModuleOperation {
  success: boolean;
  data?: any;
  message?: string;
  error?: string;
}

/**
 * Adds a module to a user
 * @param userId - User ID
 * @param moduleName - Module name to add
 * @returns Promise with operation result
 */
export const addUserModule = async (userId: string, moduleName: string): Promise<UserModuleOperation> => {
  try {
    const response = await apiService.post(`/users/${userId}/modules`, { module: moduleName });
    
    if (response.success) {
      return {
        success: true,
        data: response.data,
        message: response.message
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to add module'
      };
    }
  } catch (error) {
    console.error('Add user module error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Removes a module from a user
 * @param userId - User ID
 * @param moduleName - Module name to remove
 * @returns Promise with operation result
 */
export const removeUserModule = async (userId: string, moduleName: string): Promise<UserModuleOperation> => {
  try {
    const response = await apiService.delete(`/users/${userId}/modules`, { module: moduleName });
    
    if (response.success) {
      return {
        success: true,
        data: response.data,
        message: response.message
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to remove module'
      };
    }
  } catch (error) {
    console.error('Remove user module error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Gets all users
 * @returns Promise with users list
 */
export const getAllUsers = async (): Promise<UserModuleOperation> => {
  try {
    const response = await apiService.get('/users');
    
    if (response.success) {
      // Transform _id to id for frontend compatibility
      const transformedData = response.data.map((user: any) => ({
        ...user,
        id: user._id || user.id
      }));
      
      return {
        success: true,
        data: transformedData
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to fetch users'
      };
    }
  } catch (error) {
    console.error('Get users error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Gets users by module
 * @param moduleName - Module name
 * @returns Promise with users list
 */
export const getUsersByModule = async (moduleName: string): Promise<UserModuleOperation> => {
  try {
    const response = await apiService.get(`/users/module/${moduleName}`);
    
    if (response.success) {
      return {
        success: true,
        data: response.data
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to fetch users by module'
      };
    }
  } catch (error) {
    console.error('Get users by module error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Creates a new user/admin
 * @param userData - User data
 * @returns Promise with creation result
 */
export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role: string;
  modules?: string[];
}): Promise<UserModuleOperation> => {
  try {
    const response = await apiService.post('/users', userData);
    
    if (response.success) {
      return {
        success: true,
        data: response.data,
        message: response.message
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to create user'
      };
    }
  } catch (error) {
    console.error('Create user error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Updates a user
 * @param userId - User ID to update
 * @param userData - Updated user data
 * @returns Promise with update result
 */
export const updateUser = async (userId: string, userData: any): Promise<UserModuleOperation> => {
  try {
    const response = await apiService.put(`/users/${userId}`, userData);
    
    if (response.success) {
      return {
        success: true,
        data: response.data,
        message: response.message
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to update user'
      };
    }
  } catch (error) {
    console.error('Update user error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Deletes a user
 * @param userId - User ID to delete
 * @returns Promise with deletion result
 */
export const deleteUser = async (userId: string): Promise<UserModuleOperation> => {
  try {
    const response = await apiService.delete(`/users/${userId}`);
    
    if (response.success) {
      return {
        success: true,
        message: response.message
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to delete user'
      };
    }
  } catch (error) {
    console.error('Delete user error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};
