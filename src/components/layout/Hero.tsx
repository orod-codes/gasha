import React from 'react';
import { ArrowRight, Zap, Star, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import VideoBackground from './VideoBackground';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden text-white">
      {/* Video Background - Only for Hero Section */}
      <div className="absolute inset-0">
        <VideoBackground 
          videoSrc="/video.mp4"
          opacity={0.4}
          overlay={true}
          overlayColor="black"
          overlayOpacity={0.5}
        />
      </div>
      
      {/* Additional overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20 z-10"></div>
      
      {/* Minimal animated grid pattern for tech feel */}
      <div className="absolute inset-0 opacity-10 z-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M0 0h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zM0 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      {/* Futuristic Floating Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-slate-500/4 to-blue-500/4 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-40 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/3 to-slate-400/3 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-gradient-to-r from-slate-500/2 to-blue-500/2 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
      
      {/* Futuristic Animated Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Horizontal Glowing Lines */}
        <div className="absolute top-1/6 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-pulse"></div>
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-pulse"></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/20 to-transparent animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/20 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-5/6 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400/15 to-transparent animate-pulse" style={{animationDelay: '2.5s'}}></div>
        
        {/* Vertical Glowing Lines */}
        <div className="absolute left-1/6 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-400/15 to-transparent animate-pulse" style={{animationDelay: '0.3s'}}></div>
        <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-400/15 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute left-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-pulse" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute left-2/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-300/15 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute left-3/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-300/15 to-transparent animate-pulse" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute left-5/6 top-0 w-px h-full bg-gradient-to-b from-transparent via-slate-400/10 to-transparent animate-pulse" style={{animationDelay: '3s'}}></div>
        
        {/* Futuristic Diagonal Lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/8 to-transparent transform rotate-12 animate-pulse" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent transform rotate-6 animate-pulse" style={{animationDelay: '1.2s'}}></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/8 to-transparent transform -rotate-12 animate-pulse" style={{animationDelay: '1.8s'}}></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400/6 to-transparent transform -rotate-6 animate-pulse" style={{animationDelay: '2.2s'}}></div>
        </div>
        
        {/* Cross Pattern Lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/5 left-1/5 w-full h-px bg-gradient-to-r from-transparent via-blue-400/5 to-transparent transform rotate-45 animate-pulse" style={{animationDelay: '0.6s'}}></div>
          <div className="absolute top-2/5 left-2/5 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/6 to-transparent transform -rotate-45 animate-pulse" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute top-3/5 left-3/5 w-full h-px bg-gradient-to-r from-transparent via-blue-300/5 to-transparent transform rotate-45 animate-pulse" style={{animationDelay: '2.2s'}}></div>
          <div className="absolute top-4/5 left-4/5 w-full h-px bg-gradient-to-r from-transparent via-slate-400/4 to-transparent transform -rotate-45 animate-pulse" style={{animationDelay: '2.8s'}}></div>
        </div>
        
      </div>
      
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 z-30">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            {/* Cybersecurity Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 text-green-300 text-sm font-medium backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span className="font-mono text-xs">SECURE_CONNECTION_ESTABLISHED</span>
            </div>

            <div className="space-y-8">
              <h1 className="text-6xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
                <span className="block text-white font-mono">SECURE</span>
                <span className="block bg-gradient-to-r from-green-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent font-mono">
                  YOUR_SYSTEMS
                </span>
                <span className="block text-4xl lg:text-5xl text-gray-300 font-light mt-4">
                  with Advanced Solutions
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl font-light">
                Our advanced security products utilize innovative technologies and expertise to safeguard national interests and critical infrastructures. Trust our homegrown solutions to 
                <span className="text-green-400 font-medium font-mono"> secure your systems</span>.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Button size="lg" className="px-8 py-4 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-base font-medium border border-slate-400 text-slate-300 hover:text-white hover:border-white">
                Learn More
              </Button>
            </div>

            {/* Cybersecurity Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center group">
                <div className="text-4xl font-bold text-green-400 mb-2 font-mono">7+</div>
                <div className="text-sm text-gray-400 font-medium">SECURITY_MODULES</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-blue-400 mb-2 font-mono">1000+</div>
                <div className="text-sm text-gray-400 font-medium">PROTECTED_ASSETS</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-cyan-400 mb-2 font-mono">24/7</div>
                <div className="text-sm text-gray-400 font-medium">MONITORING_ACTIVE</div>
              </div>
            </div>
          </div>

          {/* Right Side - Cybersecurity Product Showcase */}
          <div className="relative">
            <div className="text-center mb-8">
              <img src="/mian logo.png" alt="Main Logo" className="h-25 w-25 mx-auto mb-4 object-contain" />
              <h3 className="text-2xl font-bold text-white mb-2 font-mono">SECURITY_SUITE</h3>
              <p className="text-gray-400">Comprehensive protection for your enterprise</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center group">
                <img src="/gasha antivirus.png" alt="GASHA Suite" className="h-20 w-20 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 object-contain" />
                <h4 className="font-semibold text-white text-sm mb-1 font-mono">GASHA_SUITE</h4>
                <p className="text-xs text-gray-400 mb-2">ANTIVIRUS.WAF.VPN</p>
                <div className="text-xs text-green-300 font-medium font-mono">ENTERPRISE_GRADE</div>
              </div>
              
              <div className="text-center group">
                <img src="/Nisir.png" alt="NISIR SIEM" className="h-20 w-20 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 object-contain" />
                <h4 className="font-semibold text-white text-sm mb-1 font-mono">NISIR_SIEM</h4>
                <p className="text-xs text-gray-400 mb-2">SECURITY_MONITORING</p>
                <div className="text-xs text-blue-300 font-medium font-mono">REAL_TIME</div>
              </div>
              
              <div className="text-center group">
                <img src="/Enyuma IAM.png" alt="ENYUMA IAM" className="h-20 w-20 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 object-contain" />
                <h4 className="font-semibold text-white text-sm mb-1 font-mono">ENYUMA_IAM</h4>
                <p className="text-xs text-gray-400 mb-2">IDENTITY_MANAGEMENT</p>
                <div className="text-xs text-purple-300 font-medium font-mono">ZERO_TRUST</div>
              </div>
              
              <div className="text-center group">
                <img src="/Biometric.png" alt="Biometrics" className="h-20 w-20 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 object-contain" />
                <h4 className="font-semibold text-white text-sm mb-1 font-mono">BIOMETRICS</h4>
                <p className="text-xs text-gray-400 mb-2">IDENTITY_VERIFICATION</p>
                <div className="text-xs text-orange-300 font-medium font-mono">ADVANCED_AI</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;