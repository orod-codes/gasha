import apiService from './api';

export interface UploadResponse {
  success: boolean;
  data?: {
    filename: string;
    originalName: string;
    path: string;
    size: number;
    mimetype: string;
  };
  error?: string;
}

/**
 * Uploads a file to the server
 * @param file - File to upload
 * @returns Promise with upload result
 */
export const uploadFile = async (file: File): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append('logo', file);

    const response = await fetch(`${apiService.baseURL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return {
        success: true,
        data: data.data
      };
    } else {
      return {
        success: false,
        error: data.message || 'Upload failed'
      };
    }
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Deletes an uploaded file
 * @param filename - Filename to delete
 * @returns Promise with deletion result
 */
export const deleteFile = async (filename: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await apiService.delete(`/upload/${filename}`);
    
    if (response.success) {
      return { success: true };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to delete file'
      };
    }
  } catch (error) {
    console.error('Delete file error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

