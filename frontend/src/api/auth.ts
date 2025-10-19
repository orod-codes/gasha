// Authentication service for handling login validation
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'super-admin' | 'admin' | 'marketing' | 'technical' | 'developer';
  module?: string;
  createdAt: string;
}

// Demo users database - in a real app, this would be stored securely on the server
const DEMO_USERS = [
  {
    email: 'superadmin@securityservice.com',
    password: 'demo123',
    userData: {
      id: '1',
      email: 'superadmin@securityservice.com',
      name: 'Super Administrator',
      role: 'super-admin' as const,
      module: undefined,
      createdAt: new Date().toISOString()
    }
  },
  {
    email: 'admin@securityservice.com',
    password: 'demo123',
    userData: {
      id: '2',
      email: 'admin@securityservice.com',
      name: 'Administrator',
      role: 'admin' as const,
      module: 'gasha-antivirus',
      createdAt: new Date().toISOString()
    }
  },
  {
    email: 'marketing@securityservice.com',
    password: 'demo123',
    userData: {
      id: '3',
      email: 'marketing@securityservice.com',
      name: 'Marketing Specialist',
      role: 'marketing' as const,
      module: 'gasha-antivirus',
      createdAt: new Date().toISOString()
    }
  },
  {
    email: 'technical@securityservice.com',
    password: 'demo123',
    userData: {
      id: '4',
      email: 'technical@securityservice.com',
      name: 'Technical Specialist',
      role: 'technical' as const,
      module: 'gasha-antivirus',
      createdAt: new Date().toISOString()
    }
  },
  {
    email: 'developer@securityservice.com',
    password: 'demo123',
    userData: {
      id: '5',
      email: 'developer@securityservice.com',
      name: 'Developer',
      role: 'developer' as const,
      module: 'gasha-antivirus',
      createdAt: new Date().toISOString()
    }
  }
];

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

/**
 * Authenticates user credentials against demo users
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

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Find user in demo database
  const user = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return {
      success: false,
      error: 'Invalid email or password'
    };
  }

  if (user.password !== password) {
    return {
      success: false,
      error: 'Invalid email or password'
    };
  }

  return {
    success: true,
    user: user.userData
  };
};

/**
 * Validates if an email exists in the demo users
 * @param email - Email to check
 * @returns boolean indicating if email exists
 */
export const validateEmail = (email: string): boolean => {
  return DEMO_USERS.some(user => user.email.toLowerCase() === email.toLowerCase());
};

/**
 * Gets all available demo accounts for display purposes
 * @returns Array of demo account information
 */
export const getDemoAccounts = () => {
  return DEMO_USERS.map(user => ({
    email: user.email,
    role: user.userData.role,
    name: user.userData.name
  }));
};
