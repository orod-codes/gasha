// Re-export from the new auth service
export {
  authenticateUser,
  registerUser,
  getCurrentUser,
  updateUserProfile,
  changePassword,
  logoutUser,
  verifyToken,
  getDemoAccounts,
  type LoginCredentials,
  type AuthResponse
} from '../services/authService';
