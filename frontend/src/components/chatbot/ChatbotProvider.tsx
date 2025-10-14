import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ChatbotState, ChatMessage } from '../../types';

interface ChatbotContextType {
  state: ChatbotState;
  dispatch: React.Dispatch<ChatbotAction>;
}

type ChatbotAction =
  | { type: 'TOGGLE_CHATBOT' }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'SET_CONTEXT'; payload: string }
  | { type: 'CLEAR_MESSAGES' }
  | { type: 'MINIMIZE_CHATBOT' }
  | { type: 'MAXIMIZE_CHATBOT' };

const initialState: ChatbotState = {
  isOpen: false,
  messages: [
    {
      id: '1',
      text: "Hello! I'm your Security Service assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text',
      quickReplies: [
        { id: 'qr1', text: 'View Products', payload: 'products' },
        { id: 'qr2', text: 'Get Support', payload: 'support' },
        { id: 'qr3', text: 'Contact Us', payload: 'contact' },
        { id: 'qr4', text: 'About Security', payload: 'about' }
      ]
    }
  ],
  isTyping: false,
  currentContext: undefined
};

const chatbotReducer = (state: ChatbotState, action: ChatbotAction): ChatbotState => {
  switch (action.type) {
    case 'TOGGLE_CHATBOT':
      return {
        ...state,
        isOpen: !state.isOpen
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    case 'SET_TYPING':
      return {
        ...state,
        isTyping: action.payload
      };
    case 'SET_CONTEXT':
      return {
        ...state,
        currentContext: action.payload
      };
    case 'CLEAR_MESSAGES':
      return {
        ...state,
        messages: [initialState.messages[0]] // Keep the welcome message
      };
    case 'MINIMIZE_CHATBOT':
      return {
        ...state,
        isOpen: true // Keep open but minimized (handled by component state)
      };
    case 'MAXIMIZE_CHATBOT':
      return {
        ...state,
        isOpen: true // Keep open and maximized (handled by component state)
      };
    default:
      return state;
  }
};

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

interface ChatbotProviderProps {
  children: ReactNode;
}

export const ChatbotProvider: React.FC<ChatbotProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(chatbotReducer, initialState);

  return (
    <ChatbotContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatbotContext.Provider>
  );
};

