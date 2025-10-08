import React, { useState } from 'react';
import { Send, Shield, CheckCircle, ArrowRight, AlertCircle, Loader } from 'lucide-react';
import Button from '../ui/Button';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Contact form submitted:', formData);
      
      setSubmitStatus('success');
      setSubmitMessage('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
      setErrors({});
      
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Sorry, there was an error sending your message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-black via-slate-950 to-black text-white relative overflow-hidden">
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
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm font-medium mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Contact Our Security Experts
          </div>
          
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-white">
            Ready to Secure Your Organization?
          </h2>
          
          <p className="text-base text-slate-300 max-w-2xl mx-auto">
            Our security experts are standing by to help you design and implement 
            comprehensive security solutions tailored to your specific needs.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-xl">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Send us a Message
                </h3>
                <p className="text-slate-300 text-sm">
                  Tell us about your security requirements and we'll get back to you 
                  with a customized solution proposal.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-slate-700 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400 transition-all text-sm ${
                        errors.name ? 'border-red-500' : 'border-slate-600'
                      }`}
                      placeholder="John Doe"
                      required
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-400 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-slate-700 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400 transition-all text-sm ${
                        errors.email ? 'border-red-500' : 'border-slate-600'
                      }`}
                      placeholder="john@company.com"
                      required
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-400 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400 transition-all text-sm"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 bg-slate-700 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-400 resize-none transition-all text-sm ${
                      errors.message ? 'border-red-500' : 'border-slate-600'
                    }`}
                    placeholder="Tell us about your security requirements, compliance needs, and any specific challenges you're facing..."
                    required
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="bg-blue-900/20 rounded-md p-2 border border-blue-500/30">
                  <p className="text-slate-300 mb-2 font-semibold text-xs flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-400 mr-1" />
                    What happens next?
                  </p>
                  <ul className="text-slate-300 space-y-1 text-xs">
                    <li className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      <span>Our security experts will review your inquiry within 2 hours</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      <span>You'll receive a detailed response within 24 hours</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      <span>We'll schedule a free consultation if needed</span>
                    </li>
                  </ul>
                </div>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-900/20 border border-green-500/30 rounded-md p-3 mb-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                      <p className="text-green-300 text-xs font-medium">Success!</p>
                    </div>
                    <p className="text-green-200 text-xs mt-1">{submitMessage}</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-900/20 border border-red-500/30 rounded-md p-3 mb-3">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-red-400 mr-2" />
                      <p className="text-red-300 text-xs font-medium">Error</p>
                    </div>
                    <p className="text-red-200 text-xs mt-1">{submitMessage}</p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  size="lg"
                  className={`w-full py-4 text-base font-semibold transition-all ${
                    isSubmitting 
                      ? 'bg-slate-600 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader size={16} className="mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Send Message
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;