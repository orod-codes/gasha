import React from 'react';

interface VideoBackgroundProps {
  videoSrc?: string;
  opacity?: number;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc = '/video.mp4',
  opacity = 0.3,
  overlay = true,
  overlayColor = 'black',
  overlayOpacity = 0.6
}) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Video Element */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity }}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"></div>
      </video>
      
      {/* Overlay for better text readability */}
      {overlay && (
        <div 
          className="absolute inset-0 z-10"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity
          }}
        ></div>
      )}
      
      {/* Additional gradient overlay for modern look */}
      <div className="absolute inset-0 z-20 bg-gradient-to-br from-black/40 via-transparent to-black/40"></div>
      
      {/* Subtle animated overlay patterns */}
      <div className="absolute inset-0 z-30 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M0 0h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zM0 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      {/* Futuristic glowing lines */}
      <div className="absolute inset-0 z-40 overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/25 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
    </div>
  );
};

export default VideoBackground;
