import React from 'react';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, ArrowRight, CheckCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/mian logo.png" alt="Company Logo" className="h-20 w-20 object-contain" />
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Security Service
                </h3>
                <p className="text-xs text-slate-400 font-medium tracking-wider uppercase">
                  Security Solutions
                </p>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">
              Comprehensive cybersecurity solutions protecting businesses worldwide 
              with advanced threat detection and prevention technologies.
            </p>
            <p className="text-blue-400 font-semibold text-sm">
              Trusted by 1000+ organizations globally
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-slate-400 hover:text-white transition-all duration-300 hover:scale-110">
                <Twitter size={16} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-all duration-300 hover:scale-110">
                <Linkedin size={16} />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-all duration-300 hover:scale-110">
                <Github size={16} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Security Products</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group text-sm">
                  <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Security Service Anti-Virus Suite
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group text-sm">
                  <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  GASHA Web Application Firewall
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group text-sm">
                  <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Security Service VPN Solutions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group text-sm">
                  <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  NISIR SIEM Platform
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group text-sm">
                  <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  ENYUMA Identity Management
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group text-sm">
                  <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Biometrics ABIS System
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Support & Resources</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group text-sm">
                  <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Technical Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group text-sm">
                  <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  API Reference Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group text-sm">
                  <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group text-sm">
                  <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  System Status
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group text-sm">
                  <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Security Advisories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group text-sm">
                  <ArrowRight size={12} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Training & Certification
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Contact Information</h4>
            <div className="space-y-3 text-slate-400">
              <div className="flex items-start space-x-2">
                <Mail size={14} className="text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white text-sm">Email</p>
                  <p className="text-sm">contact@securityservice.com</p>
                  <p className="text-xs text-slate-500">General inquiries</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Phone size={14} className="text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white text-sm">Phone</p>
                  <p className="text-sm">+1 (555) 123-4567</p>
                  <p className="text-xs text-slate-500">24/7 Emergency</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={14} className="text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white text-sm">Headquarters</p>
                  <p className="text-sm">123 Security Street</p>
                  <p className="text-sm">Cyber City, CC 12345</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Debug panel removed as payments are not in use */}

        {/* Bottom Section */}
        <div className="border-t border-slate-800/50 pt-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-slate-400 text-sm">
              © 2024 Security Service. All rights reserved. 
              <span className="text-slate-500 ml-2">Protecting digital assets worldwide.</span>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-4 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Security Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
