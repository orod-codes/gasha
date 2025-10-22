import apiService from './api';

export interface Module {
  _id: string;
  name: string;
  displayName: string;
  description: string;
  logo: string;
  status: 'active' | 'inactive' | 'maintenance';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ModuleOperation {
  success: boolean;
  data?: Module | Module[];
  message?: string;
  error?: string;
}

/**
 * Gets all modules
 * @returns Promise with modules list
 */
export const getModules = async (): Promise<ModuleOperation> => {
  try {
    const response = await apiService.get('/modules');
    
    if (response.success) {
      return {
        success: true,
        data: response.data
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to fetch modules'
      };
    }
  } catch (error) {
    console.error('Get modules error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Gets a module by ID
 * @param moduleId - Module ID
 * @returns Promise with module data
 */
export const getModule = async (moduleId: string): Promise<ModuleOperation> => {
  try {
    const response = await apiService.get(`/modules/${moduleId}`);
    
    if (response.success) {
      return {
        success: true,
        data: response.data
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to fetch module'
      };
    }
  } catch (error) {
    console.error('Get module error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Creates a new module
 * @param moduleData - Module data
 * @returns Promise with creation result
 */
export const createModule = async (moduleData: {
  name: string;
  displayName: string;
  description?: string;
  logo?: string;
}): Promise<ModuleOperation> => {
  try {
    console.log('🔧 Creating module with data:', moduleData);
    console.log('🔧 API service token:', localStorage.getItem('token'));
    
    const response = await apiService.post('/modules', moduleData);
    console.log('🔧 API response:', response);
    console.log('🔧 Response success:', response.success);
    console.log('🔧 Response message:', response.message);
    console.log('🔧 Response error:', response.error);
    
    if (response.success) {
      return {
        success: true,
        data: response.data,
        message: response.message
      };
    } else {
      console.error('❌ API returned error:', response.message || response.error);
      return {
        success: false,
        error: response.message || response.error || 'Failed to create module'
      };
    }
  } catch (error) {
    console.error('Create module error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Updates a module
 * @param moduleId - Module ID
 * @param moduleData - Updated module data
 * @returns Promise with update result
 */
export const updateModule = async (moduleId: string, moduleData: {
  displayName?: string;
  description?: string;
  logo?: string;
  status?: 'active' | 'inactive' | 'maintenance';
}): Promise<ModuleOperation> => {
  try {
    const response = await apiService.put(`/modules/${moduleId}`, moduleData);
    
    if (response.success) {
      return {
        success: true,
        data: response.data,
        message: response.message
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to update module'
      };
    }
  } catch (error) {
    console.error('Update module error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Deletes a module
 * @param moduleId - Module ID
 * @returns Promise with deletion result
 */
export const deleteModule = async (moduleId: string): Promise<ModuleOperation> => {
  try {
    const response = await apiService.delete(`/modules/${moduleId}`);
    
    if (response.success) {
      return {
        success: true,
        message: response.message
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to delete module'
      };
    }
  } catch (error) {
    console.error('Delete module error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};
