import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <div className={`bg-transparent rounded-xl shadow-lg border border-slate-200/50 ${
      hover ? 'hover:shadow-2xl hover:scale-105 transition-all duration-300' : ''
    } ${className}`}>
      {children}
    </div>
  );
};

export default Card;