import apiService from './api';

export interface StatsResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Gets dashboard statistics
 * @returns Promise with dashboard stats
 */
export const getDashboardStats = async (): Promise<StatsResponse> => {
  try {
    const response = await apiService.get('/analytics');
    
    if (response.success) {
      return {
        success: true,
        data: response.data
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to fetch dashboard stats'
      };
    }
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Gets module statistics
 * @returns Promise with module stats
 */
export const getModuleStats = async (): Promise<StatsResponse> => {
  try {
    const response = await apiService.get('/analytics');
    
    if (response.success) {
      return {
        success: true,
        data: response.data
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to fetch module stats'
      };
    }
  } catch (error) {
    console.error('Get module stats error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Gets request statistics
 * @returns Promise with request stats
 */
export const getRequestStats = async (): Promise<StatsResponse> => {
  try {
    const response = await apiService.get('/requests');
    
    if (response.success) {
      return {
        success: true,
        data: response.data
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to fetch request stats'
      };
    }
  } catch (error) {
    console.error('Get request stats error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

