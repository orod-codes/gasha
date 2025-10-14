// Video Background Configuration
// You can easily customize these settings to change the video background behavior

export interface VideoBackgroundConfig {
  // Path to your video file (should be in the public directory)
  videoSrc: string;
  
  // Video opacity (0.0 to 1.0) - lower values make video more subtle
  opacity: number;
  
  // Whether to show overlay for better text readability
  overlay: boolean;
  
  // Overlay color (any valid CSS color)
  overlayColor: string;
  
  // Overlay opacity (0.0 to 1.0)
  overlayOpacity: number;
  
  // Whether video should autoplay
  autoplay: boolean;
  
  // Whether video should be muted
  muted: boolean;
  
  // Whether video should loop
  loop: boolean;
}

// Default configuration - modify these values to customize your video background
export const defaultVideoConfig: VideoBackgroundConfig = {
  videoSrc: '/video.mp4',        // Your video file in public directory
  opacity: 0.4,                  // 40% opacity - adjust for desired visibility
  overlay: true,                 // Enable overlay for better text readability
  overlayColor: 'black',         // Black overlay color
  overlayOpacity: 0.5,           // 50% overlay opacity
  autoplay: true,                // Auto-start video
  muted: true,                   // Muted by default (required for autoplay)
  loop: true,                    // Loop video continuously
};

// Alternative configurations you can use:

// Subtle video background
export const subtleVideoConfig: VideoBackgroundConfig = {
  ...defaultVideoConfig,
  opacity: 0.2,
  overlayOpacity: 0.7,
};

// Prominent video background
export const prominentVideoConfig: VideoBackgroundConfig = {
  ...defaultVideoConfig,
  opacity: 0.6,
  overlayOpacity: 0.3,
};

// Dark theme optimized
export const darkVideoConfig: VideoBackgroundConfig = {
  ...defaultVideoConfig,
  opacity: 0.3,
  overlayColor: 'black',
  overlayOpacity: 0.6,
};

// Light theme optimized
export const lightVideoConfig: VideoBackgroundConfig = {
  ...defaultVideoConfig,
  opacity: 0.2,
  overlayColor: 'white',
  overlayOpacity: 0.4,
};


