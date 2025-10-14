import React from 'react';
import { Bot, MessageCircle, X, Minimize2, Maximize2, User, Send, Cpu, Zap } from 'lucide-react';
import { ChatMessage } from '../../types';
import RobotIcon from './RobotIcon';
import './chatbot.css';

interface ChatbotWindowProps {
  isOpen: boolean;
  onToggle: () => void;
  messages: ChatMessage[];
  isTyping: boolean;
  inputText: string;
  setInputText: (text: string) => void;
  onSendMessage: () => void;
  onQuickReply: (payload: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isMinimized: boolean;
  setIsMinimized: (minimized: boolean) => void;
}

const ChatbotWindow: React.FC<ChatbotWindowProps> = ({
  isOpen,
  onToggle,
  messages,
  isTyping,
  inputText,
  setInputText,
  onSendMessage,
  onQuickReply,
  onKeyPress,
  isMinimized,
  setIsMinimized
}) => {
  const renderMessage = (message: ChatMessage) => {
    const isUser = message.sender === 'user';
    
    return (
      <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 chatbot-message ${isUser ? 'user' : ''}`}>
        <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
          {/* Avatar */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
              : 'bg-gradient-to-r from-cyan-500 to-blue-600'
          }`}>
            {isUser ? <User size={16} className="text-white" /> : <RobotIcon size={16} className="text-white" isAnimating={true} />}
          </div>
          
          {/* Message Content */}
          <div className={`px-4 py-3 rounded-2xl ${
            isUser 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
              : 'bg-slate-800/50 text-slate-100 border border-slate-700/50'
          }`}>
            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
            
            {/* Quick Replies */}
            {message.quickReplies && (
              <div className="mt-3 flex flex-wrap gap-2">
                {message.quickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    onClick={() => onQuickReply(reply.payload)}
                    className="px-3 py-1 text-xs bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 rounded-full border border-slate-600/50 transition-all duration-200 hover:border-blue-400/50 chatbot-button"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            )}

            {/* Card */}
            {message.card && (
              <div className="mt-3 bg-slate-700/30 rounded-xl p-4 border border-slate-600/50">
                <h4 className="font-semibold text-slate-100 mb-2">{message.card.title}</h4>
                {message.card.subtitle && (
                  <p className="text-sm text-slate-300 mb-3">{message.card.subtitle}</p>
                )}
                {message.card.imageUrl && (
                  <img src={message.card.imageUrl} alt={message.card.title} className="w-full h-32 object-cover rounded-lg mb-3" />
                )}
                {message.card.buttons && (
                  <div className="flex flex-wrap gap-2">
                    {message.card.buttons.map((button) => (
                      <button
                        key={button.id}
                        onClick={() => onQuickReply(button.payload)}
                        className="px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 chatbot-button"
                      >
                        {button.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* List */}
            {message.list && (
              <div className="mt-3 space-y-2">
                {message.list.map((item) => (
                  <div key={item.id} className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/50">
                    <h5 className="font-semibold text-slate-100">{item.title}</h5>
                    {item.subtitle && (
                      <p className="text-sm text-slate-300 mb-2">{item.subtitle}</p>
                    )}
                    {item.buttons && (
                      <div className="flex gap-2">
                        {item.buttons.map((button) => (
                          <button
                            key={button.id}
                            onClick={() => button.type === 'url' && button.url ? window.open(button.url, '_blank') : onQuickReply(button.payload)}
                            className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 chatbot-button"
                          >
                            {button.text}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={onToggle}
          className="w-14 h-14 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group chatbot-toggle"
        >
          <RobotIcon size={28} className="text-white group-hover:scale-110 transition-transform" isAnimating={true} />
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 chatbot-container ${
      isMinimized ? 'w-80 h-16' : 'w-80 h-96 lg:w-96 lg:h-[500px]'
    }`}>
      <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center relative">
              <RobotIcon size={16} className="text-white" isAnimating={true} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full chatbot-status-indicator"></div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">AI Security Assistant</h3>
              <p className="text-xs text-cyan-400">Neural Network Active</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 text-slate-400 hover:text-white transition-colors"
            >
              {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </button>
            <button
              onClick={onToggle}
              className="p-1 text-slate-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-64 lg:h-80 overflow-y-auto px-4 py-4 space-y-4 chatbot-messages">
              {messages.map(renderMessage)}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center relative">
                      <RobotIcon size={16} className="text-white" isAnimating={true} />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full chatbot-status-indicator"></div>
                    </div>
                    <div className="bg-slate-800/50 px-4 py-3 rounded-2xl border border-slate-700/50">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full chatbot-typing"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full chatbot-typing" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full chatbot-typing" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-slate-700/50 bg-slate-800/30">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={onKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-700/50 border border-slate-600/50 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                />
                <button
                  onClick={onSendMessage}
                  disabled={!inputText.trim()}
                  className="p-2 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed rounded-xl transition-all duration-200 chatbot-button"
                >
                  <Send size={16} className="text-white" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatbotWindow;
