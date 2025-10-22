import apiService from './api';
import { Notification } from '../types';

/**
 * Gets all notifications for the current user
 * @returns Promise with notifications array
 */
export const getNotifications = async (): Promise<Notification[]> => {
  try {
    const response = await apiService.getNotifications();
    
    if (response.success && response.data) {
      return response.data;
    } else {
      console.error('Failed to fetch notifications:', response.error);
      return [];
    }
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

/**
 * Marks a notification as read
 * @param id - Notification ID
 * @returns Promise with update result
 */
export const markNotificationAsRead = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await apiService.markNotificationAsRead(id);
    
    if (response.success) {
      return { success: true };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to mark notification as read'
      };
    }
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Marks all notifications as read
 * @returns Promise with update result
 */
export const markAllNotificationsAsRead = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await apiService.markAllNotificationsAsRead();
    
    if (response.success) {
      return { success: true };
    } else {
      return {
        success: false,
        error: response.message || 'Failed to mark all notifications as read'
      };
    }
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

/**
 * Gets unread notifications count
 * @returns Promise with unread count
 */
export const getUnreadNotificationsCount = async (): Promise<number> => {
  try {
    const notifications = await getNotifications();
    return notifications.filter(notification => !notification.isRead).length;
  } catch (error) {
    console.error('Error getting unread notifications count:', error);
    return 0;
  }
};

/**
 * Gets notifications by type
 * @param type - Notification type
 * @returns Promise with filtered notifications
 */
export const getNotificationsByType = async (type: string): Promise<Notification[]> => {
  try {
    const notifications = await getNotifications();
    return notifications.filter(notification => notification.type === type);
  } catch (error) {
    console.error('Error filtering notifications by type:', error);
    return [];
  }
};
