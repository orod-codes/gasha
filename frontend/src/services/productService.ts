import apiService from './api';
import { Product } from '../types';

/**
 * Gets all products from the backend
 * @returns Promise with products array
 */
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiService.getProducts();
    
    if (response.success && response.data) {
      // Transform _id to id for frontend compatibility
      return response.data.map((product: any) => ({
        ...product,
        id: product._id || product.id
      }));
    } else {
      console.error('Failed to fetch products:', response.error);
      return [];
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

/**
 * Gets a specific product by ID
 * @param id - Product ID
 * @returns Promise with product data
 */
export const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const response = await apiService.getProduct(id);
    
    if (response.success && response.data) {
      // Transform _id to id for frontend compatibility
      return {
        ...response.data,
        id: response.data._id || response.data.id
      };
    } else {
      console.error('Failed to fetch product:', response.error);
      return null;
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

/**
 * Creates a new product
 * @param productData - Product data
 * @returns Promise with creation result
 */
export const createProduct = async (productData: Omit<Product, 'id'>): Promise<{ success: boolean; product?: Product; error?: string }> => {
  try {
    const response = await apiService.createProduct(productData);
    
    if (response.success && response.data) {
      return {
        success: true,
        product: response.data
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to create product'
      };
    }
  } catch (error) {
    console.error('Error creating product:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Updates an existing product
 * @param id - Product ID
 * @param productData - Updated product data
 * @returns Promise with update result
 */
export const updateProduct = async (id: string, productData: Partial<Product>): Promise<{ success: boolean; product?: Product; error?: string }> => {
  try {
    const response = await apiService.updateProduct(id, productData);
    
    if (response.success && response.data) {
      return {
        success: true,
        product: response.data
      };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to update product'
      };
    }
  } catch (error) {
    console.error('Error updating product:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Deletes a product
 * @param id - Product ID
 * @returns Promise with deletion result
 */
export const deleteProduct = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await apiService.deleteProduct(id);
    
    if (response.success) {
      return { success: true };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to delete product'
      };
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Gets products by category
 * @param category - Product category
 * @returns Promise with filtered products
 */
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const products = await getProducts();
    return products.filter(product => product.category === category);
  } catch (error) {
    console.error('Error filtering products by category:', error);
    return [];
  }
};

/**
 * Gets products by module
 * @param module - Product module
 * @returns Promise with filtered products
 */
export const getProductsByModule = async (module: string): Promise<Product[]> => {
  try {
    const products = await getProducts();
    return products.filter(product => product.module === module);
  } catch (error) {
    console.error('Error filtering products by module:', error);
    return [];
  }
};
