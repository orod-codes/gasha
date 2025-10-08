export interface User {
  id: string;
  email: string;
  name: string;
  role: 'super-admin' | 'admin' | 'marketing' | 'technical' | 'developer';
  module?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'gasha' | 'nisir' | 'enyuma' | 'codepro' | 'biometrics';
  description: string;
  features: string[];
  hasDownload: boolean;
  hasRequest: boolean;
  hasShowProducts: boolean;
  module: string;
}

export interface Request {
  id: string;
  productId: string;
  userId?: string;
  status: 'pending' | 'validated' | 'approved' | 'rejected' | 'completed';
  formData: Record<string, string | number | boolean>;
  marketingNotes?: string;
  adminNotes?: string;
  technicalNotes?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DownloadRequest {
  id: string;
  productId: string;
  nationalId: string;
  phoneNumber: string;
  platform?: 'android' | 'windows' | 'mac' | 'linux';
  otp?: string;
  password?: string;
  downloaded: boolean;
  createdAt: string;
}

export interface Task {
  id: string;
  requestId: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo: string;
  requirements?: Record<string, string | number>;
  notes?: string;
  createdAt: string;
  dueDate: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  type: 'blog' | 'news';
  scope: 'global' | 'module';
  module?: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

// Chatbot types
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick-reply' | 'card' | 'list';
  quickReplies?: QuickReply[];
  card?: ChatCard;
  list?: ChatListItem[];
}

export interface QuickReply {
  id: string;
  text: string;
  payload: string;
}

export interface ChatCard {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  buttons?: ChatButton[];
}

export interface ChatButton {
  id: string;
  text: string;
  payload: string;
  type: 'postback' | 'url';
  url?: string;
}

export interface ChatListItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  buttons?: ChatButton[];
}

export interface ChatbotState {
  isOpen: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
  currentContext?: string;
}