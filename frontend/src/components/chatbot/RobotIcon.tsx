import React from 'react';

interface RobotIconProps {
  size?: number;
  className?: string;
  isAnimating?: boolean;
}

const RobotIcon: React.FC<RobotIconProps> = ({ size = 24, className = '', isAnimating = false }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Robot Head */}
      <rect
        x="6"
        y="4"
        width="12"
        height="10"
        rx="2"
        fill="currentColor"
        className="robot-head"
      />
      
      {/* Robot Eyes */}
      <circle cx="9" cy="8" r="1.5" fill="#1e293b" className="robot-eye" />
      <circle cx="15" cy="8" r="1.5" fill="#1e293b" className="robot-eye" />
      
      {/* Robot Mouth */}
      <rect x="10" y="11" width="4" height="1" rx="0.5" fill="#1e293b" className="robot-mouth" />
      
      {/* Robot Antenna */}
      <line x1="12" y1="4" x2="12" y2="2" stroke="currentColor" strokeWidth="1" className="robot-antenna" />
      <circle cx="12" cy="2" r="1" fill="#fbbf24" className="robot-light" />
      
      {/* Robot Body */}
      <rect
        x="7"
        y="14"
        width="10"
        height="8"
        rx="1"
        fill="currentColor"
        className="robot-body"
      />
      
      {/* Robot Chest Panel */}
      <rect x="9" y="16" width="6" height="4" rx="0.5" fill="#1e293b" className="robot-panel" />
      
      {/* Robot Left Hand */}
      <g className={`robot-hand-left ${isAnimating ? 'hand-wave' : ''}`}>
        <rect x="3" y="15" width="3" height="2" rx="1" fill="currentColor" />
        <rect x="2" y="17" width="2" height="1" rx="0.5" fill="currentColor" />
        <rect x="4" y="17" width="2" height="1" rx="0.5" fill="currentColor" />
      </g>
      
      {/* Robot Right Hand */}
      <g className={`robot-hand-right ${isAnimating ? 'hand-wave' : ''}`}>
        <rect x="18" y="15" width="3" height="2" rx="1" fill="currentColor" />
        <rect x="20" y="17" width="2" height="1" rx="0.5" fill="currentColor" />
        <rect x="18" y="17" width="2" height="1" rx="0.5" fill="currentColor" />
      </g>
      
      {/* Robot Legs */}
      <rect x="8" y="22" width="2" height="2" rx="1" fill="currentColor" className="robot-leg" />
      <rect x="14" y="22" width="2" height="2" rx="1" fill="currentColor" className="robot-leg" />
    </svg>
  );
};

export default RobotIcon;

