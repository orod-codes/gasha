import apiService from './api';
import { Request } from '../types';

/**
 * Gets all requests from the backend
 * @returns Promise with requests array
 */
export const getRequests = async (): Promise<Request[]> => {
  try {
    const response = await apiService.getRequests();
    
    if (response.success && response.data) {
      return response.data;
    } else {
      console.error('Failed to fetch requests:', response.error);
      return [];
    }
  } catch (error) {
    console.error('Error fetching requests:', error);
    return [];
  }
};

/**
 * Gets a specific request by ID
 * @param id - Request ID
 * @returns Promise with request data
 */
export const getRequest = async (id: string): Promise<Request | null> => {
  try {
    const response = await apiService.getRequest(id);
    
    if (response.success && response.data) {
      return response.data;
    } else {
      console.error('Failed to fetch request:', response.error);
      return null;
    }
  } catch (error) {
    console.error('Error fetching request:', error);
    return null;
  }
};

/**
 * Creates a new request
 * @param requestData - Request data
 * @returns Promise with creation result
 */
export const createRequest = async (requestData: Omit<Request, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; request?: Request; error?: string }> => {
  try {
    const response = await apiService.createRequest(requestData);
    
    if (response.success && response.data) {
      return {
        success: true,
        request: response.data
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to create request'
      };
    }
  } catch (error) {
    console.error('Error creating request:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Updates an existing request
 * @param id - Request ID
 * @param requestData - Updated request data
 * @returns Promise with update result
 */
export const updateRequest = async (id: string, requestData: Partial<Request>): Promise<{ success: boolean; request?: Request; error?: string }> => {
  try {
    const response = await apiService.updateRequest(id, requestData);
    
    if (response.success && response.data) {
      return {
        success: true,
        request: response.data
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to update request'
      };
    }
  } catch (error) {
    console.error('Error updating request:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Deletes a request
 * @param id - Request ID
 * @returns Promise with deletion result
 */
export const deleteRequest = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await apiService.deleteRequest(id);
    
    if (response.success) {
      return { success: true };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to delete request'
      };
    }
  } catch (error) {
    console.error('Error deleting request:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Gets requests by status
 * @param status - Request status
 * @returns Promise with filtered requests
 */
export const getRequestsByStatus = async (status: string): Promise<Request[]> => {
  try {
    const requests = await getRequests();
    return requests.filter(request => request.status === status);
  } catch (error) {
    console.error('Error filtering requests by status:', error);
    return [];
  }
};

/**
 * Gets requests by priority
 * @param priority - Request priority
 * @returns Promise with filtered requests
 */
export const getRequestsByPriority = async (priority: string): Promise<Request[]> => {
  try {
    const requests = await getRequests();
    return requests.filter(request => request.priority === priority);
  } catch (error) {
    console.error('Error filtering requests by priority:', error);
    return [];
  }
};
