import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../../data/products';

const ProductsGrid: React.FC = () => {
  return (
    <section id="products" className="py-24 bg-gradient-to-br from-black via-slate-950 to-black relative overflow-hidden">
      {/* Modern Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/3 via-transparent to-slate-600/3"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M0 0h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zM0 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl float-slow"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-slate-500/4 to-blue-500/4 rounded-full blur-3xl float-delayed"></div>
      <div className="absolute top-40 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/3 to-slate-400/3 rounded-full blur-2xl float-fast"></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-gradient-to-r from-slate-500/2 to-blue-500/2 rounded-full blur-2xl bounce-gentle"></div>
      
      {/* Animated Background Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Horizontal Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/10 to-transparent animate-line-glow"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/8 to-transparent animate-line-glow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/10 to-transparent animate-line-glow" style={{animationDelay: '2s'}}></div>
        
        {/* Vertical Lines */}
        <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-400/8 to-transparent animate-line-glow" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent animate-line-glow" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute left-3/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-300/8 to-transparent animate-line-glow" style={{animationDelay: '2.5s'}}></div>
        
        {/* Diagonal Lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/4 to-transparent transform rotate-12 animate-line-sweep" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent transform -rotate-12 animate-line-sweep" style={{animationDelay: '1.8s'}}></div>
        </div>
      </div>
      
      
      <div className="relative max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500/15 to-cyan-500/15 border border-blue-400/25 text-blue-200 text-sm font-semibold mb-12 backdrop-blur-md shadow-lg shadow-blue-500/10">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
            Enterprise Security Solutions
          </div>
          
          <h2 className="text-6xl lg:text-7xl font-black text-white mb-10 leading-[0.9] tracking-tight">
            <span className="block">Comprehensive</span>
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Security Suite
            </span>
          </h2>
          
          <p className="text-2xl text-slate-200 max-w-5xl mx-auto leading-relaxed font-light mb-16">
            Next-generation security platform delivering 
            <span className="text-blue-400 font-semibold"> enterprise-grade protection</span> across your entire infrastructure
          </p>

        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Horizontal Scrolling Logos */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-white mb-4">
              Our Complete Security Ecosystem
            </h3>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              From antivirus protection to biometric authentication - comprehensive security solutions for every enterprise need
            </p>
          </div>
          
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-left">
              {/* First set of logos */}
              <div className="flex items-center space-x-32 flex-shrink-0">
                <img src="/gasha antivirus.png" alt="GASHA Anti-Virus" className="h-40 w-40 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300" />
                <img src="/gasha waf.png" alt="GASHA WAF" className="h-40 w-40 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300" />
                <img src="/gasha vpn.png" alt="GASHA VPN" className="h-40 w-40 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300" />
                <img src="/Nisir.png" alt="NISIR SIEM" className="h-40 w-40 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300" />
                <img src="/Enyuma IAM.png" alt="ENYUMA IAM" className="h-40 w-40 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300" />
                <img src="/code protection .png" alt="CODEPRO Protection" className="h-40 w-40 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300" />
                <img src="/Biometric.png" alt="Biometrics ABIS" className="h-40 w-40 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300" />
                <img src="/mian logo.png" alt="Main Logo" className="h-40 w-40 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="flex items-center space-x-32 flex-shrink-0 ml-32">
                <img src="/gasha antivirus.png" alt="GASHA Anti-Virus" className="h-40 w-40 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300" />
                <img src="/gasha waf.png" alt="GASHA WAF" className="h-40 w-40 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300" />
                <img src="/gasha vpn.png" alt="GASHA VPN" className="h-40 w-40 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300" />
                <img src="/Nisir.png" alt="NISIR SIEM" className="h-40 w-40 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300" />
                <img src="/Enyuma IAM.png" alt="ENYUMA IAM" className="h-40 w-40 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300" />
                <img src="/code protection .png" alt="CODEPRO Protection" className="h-40 w-40 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300" />
                <img src="/Biometric.png" alt="Biometrics ABIS" className="h-40 w-40 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300" />
                <img src="/mian logo.png" alt="Main Logo" className="h-40 w-40 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Compact Features Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-slate-700/20 to-slate-600/20 border border-slate-500/30 text-slate-300 text-xs font-semibold mb-4 backdrop-blur-md">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2 animate-pulse"></div>
              Platform Capabilities
            </div>
            <h3 className="text-3xl font-black text-white mb-4 leading-tight">
              Why Choose Our
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Security Platform?
              </span>
            </h3>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Built for enterprise scale with cutting-edge technology and proven reliability
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="group text-center p-5 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-600/30 backdrop-blur-md hover:border-blue-400/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20">
              <h4 className="text-lg font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">Enterprise Grade</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Military-grade encryption and security protocols</p>
              <div className="mt-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Bank-Level Security</div>
            </div>
            
            <div className="group text-center p-5 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-600/30 backdrop-blur-md hover:border-green-400/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-500/20">
              <h4 className="text-lg font-bold text-white mb-3 group-hover:text-green-300 transition-colors">24/7 Support</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Round-the-clock expert assistance and monitoring</p>
              <div className="mt-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Always Available</div>
            </div>
            
            <div className="group text-center p-5 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-600/30 backdrop-blur-md hover:border-yellow-400/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/20">
              <h4 className="text-lg font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors">Real-time Monitoring</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Instant threat detection and automated response</p>
              <div className="mt-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Zero Latency</div>
            </div>
            
            <div className="group text-center p-5 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-600/30 backdrop-blur-md hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
              <h4 className="text-lg font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">Easy Integration</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Seamless deployment with existing infrastructure</p>
              <div className="mt-3 text-xs text-slate-500 font-semibold uppercase tracking-wider">Plug & Play</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid;