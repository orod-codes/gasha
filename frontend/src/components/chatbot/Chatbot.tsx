import React, { useState, useRef, useEffect } from 'react';
import { useChatbot } from './ChatbotProvider';
import ChatbotWindow from './ChatbotWindow';
import { ChatMessage } from '../../types';

interface ChatbotProps {
  user?: any;
}

const Chatbot: React.FC<ChatbotProps> = ({ user }) => {
  const { state, dispatch } = useChatbot();
  const [inputText, setInputText] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const simulateTyping = (callback: () => void) => {
    dispatch({ type: 'SET_TYPING', payload: true });
    setTimeout(() => {
      dispatch({ type: 'SET_TYPING', payload: false });
      callback();
    }, 1000 + Math.random() * 1000);
  };

  const generateBotResponse = (userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Product-related responses
    if (lowerMessage.includes('product') || lowerMessage.includes('gasha') || lowerMessage.includes('nisir') || lowerMessage.includes('enyuma')) {
      return {
        id: Date.now().toString(),
        text: "Here are our security products:",
        sender: 'bot',
        timestamp: new Date(),
        type: 'card',
        card: {
          title: 'Security Products',
          subtitle: 'Choose a product to learn more',
          imageUrl: '/mian logo.png',
          buttons: [
            { id: 'btn1', text: 'Gasha Antivirus', payload: 'gasha', type: 'postback' },
            { id: 'btn2', text: 'Nisir WAF', payload: 'nisir', type: 'postback' },
            { id: 'btn3', text: 'Enyuma IAM', payload: 'enyuma', type: 'postback' },
            { id: 'btn4', text: 'Code Protection', payload: 'codepro', type: 'postback' }
          ]
        }
      };
    }

    // Support-related responses
    if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('issue')) {
      return {
        id: Date.now().toString(),
        text: "I'm here to help! What specific issue are you facing?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        quickReplies: [
          { id: 'qr1', text: 'Technical Issue', payload: 'technical' },
          { id: 'qr2', text: 'Account Problem', payload: 'account' },
          { id: 'qr3', text: 'Billing Question', payload: 'billing' },
          { id: 'qr4', text: 'Speak to Human', payload: 'human' }
        ]
      };
    }

    // Contact-related responses
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('phone')) {
      return {
        id: Date.now().toString(),
        text: "Here's how you can contact us:",
        sender: 'bot',
        timestamp: new Date(),
        type: 'list',
        list: [
          {
            id: 'contact1',
            title: 'Email Support',
            subtitle: 'support@securityservice.com',
            buttons: [{ id: 'email', text: 'Send Email', payload: 'email', type: 'url', url: 'mailto:support@securityservice.com' }]
          },
          {
            id: 'contact2',
            title: 'Phone Support',
            subtitle: '+1 (555) 123-4567',
            buttons: [{ id: 'phone', text: 'Call Now', payload: 'phone', type: 'url', url: 'tel:+15551234567' }]
          },
          {
            id: 'contact3',
            title: 'Live Chat',
            subtitle: 'Available 24/7',
            buttons: [{ id: 'chat', text: 'Start Chat', payload: 'livechat', type: 'postback' }]
          }
        ]
      };
    }

    // About/security-related responses
    if (lowerMessage.includes('about') || lowerMessage.includes('security') || lowerMessage.includes('company')) {
      return {
        id: Date.now().toString(),
        text: "Security Service is a leading provider of comprehensive security solutions. We offer:\n\n• Advanced threat protection\n• Identity and access management\n• Web application firewall\n• Code protection\n• Biometric authentication\n\nOur mission is to protect your digital assets with cutting-edge security technology.",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
    }

    // Dashboard-related responses (for logged-in users)
    if (user && (lowerMessage.includes('dashboard') || lowerMessage.includes('admin') || lowerMessage.includes('manage'))) {
      return {
        id: Date.now().toString(),
        text: `Welcome back, ${user.name}! Here are some quick actions for your ${user.role} dashboard:`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        quickReplies: [
          { id: 'qr1', text: 'View Requests', payload: 'requests' },
          { id: 'qr2', text: 'Manage Users', payload: 'users' },
          { id: 'qr3', text: 'Analytics', payload: 'analytics' },
          { id: 'qr4', text: 'Settings', payload: 'settings' }
        ]
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      text: "I understand you're asking about: \"" + userMessage + "\". Could you be more specific? I can help you with:\n\n• Product information\n• Technical support\n• Contact details\n• Account assistance\n\nOr try one of the quick options below:",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text',
      quickReplies: [
        { id: 'qr1', text: 'Products', payload: 'products' },
        { id: 'qr2', text: 'Support', payload: 'support' },
        { id: 'qr3', text: 'Contact', payload: 'contact' },
        { id: 'qr4', text: 'Help', payload: 'help' }
      ]
    };
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    setInputText('');

    simulateTyping(() => {
      const botResponse = generateBotResponse(inputText);
      dispatch({ type: 'ADD_MESSAGE', payload: botResponse });
    });
  };

  const handleQuickReply = (payload: string) => {
    const quickReplyMessage: ChatMessage = {
      id: Date.now().toString(),
      text: payload,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    dispatch({ type: 'ADD_MESSAGE', payload: quickReplyMessage });

    simulateTyping(() => {
      const botResponse = generateBotResponse(payload);
      dispatch({ type: 'ADD_MESSAGE', payload: botResponse });
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_CHATBOT' });
  };

  return (
    <ChatbotWindow
      isOpen={state.isOpen}
      onToggle={handleToggle}
      messages={state.messages}
      isTyping={state.isTyping}
      inputText={inputText}
      setInputText={setInputText}
      onSendMessage={handleSendMessage}
      onQuickReply={handleQuickReply}
      onKeyPress={handleKeyPress}
      isMinimized={isMinimized}
      setIsMinimized={setIsMinimized}
    />
  );
};

export default Chatbot;