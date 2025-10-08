import React, { useState } from 'react';
import { X, Send, Download } from 'lucide-react';
import Button from '../ui/Button';
import { Product } from '../../types';
import { chapaAPI, generateTxRef, debugAllPayments } from '../../api/chapa';

interface ProductRequestFormProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

const ProductRequestForm: React.FC<ProductRequestFormProps> = ({ 
  product, 
  isOpen, 
  onClose, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState<any>({});
  const [isDownloadMode, setIsDownloadMode] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'failed'>('pending');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData((prev: Record<string, any>) => ({ ...prev, [field]: value }));
  };

  // Chapa Payment Integration
  const initiateChapaPayment = async (email: string, name: string, amount: number, platform: string) => {
    try {
      setPaymentStatus('processing');
      
      const tx_ref = generateTxRef(platform);
      
      // Initialize Chapa payment
      const paymentData = await chapaAPI.initializePayment({
        amount: amount,
        currency: 'ETB',
        email: email,
        first_name: name.split(' ')[0] || 'User',
        last_name: name.split(' ').slice(1).join(' ') || 'Name',
        phone_number: '0912345678', // Default for demo
        tx_ref: tx_ref,
        callback_url: `${window.location.origin}/payment/callback`,
        return_url: `${window.location.origin}/payment/success`,
        customization: {
          title: 'GASHA VPN Premium',
          description: `GASHA VPN ${platform} Premium License`,
          logo: `${window.location.origin}/mian logo.png`
        }
      });
      
      if (paymentData.status === 'success' && paymentData.data?.checkout_url) {
        // Redirect to Chapa checkout
        console.log('🔗 Opening Chapa checkout:', paymentData.data.checkout_url);
        window.open(paymentData.data.checkout_url, '_blank');
        
        // Poll for payment status
        pollPaymentStatus(tx_ref);
      } else {
        console.error('❌ Payment initialization failed:', paymentData.message);
        throw new Error(paymentData.message);
      }
      
      return paymentData;
    } catch (error) {
      console.error('Chapa payment error:', error);
      setPaymentStatus('failed');
      alert('Payment failed. Please try again.');
    }
  };

  const pollPaymentStatus = async (tx_ref: string) => {
    const maxAttempts = 30; // 5 minutes max
    let attempts = 0;
    
    const poll = async () => {
      try {
        const status = await chapaAPI.verifyPayment(tx_ref);
        
        if (status.status === 'success' && status.data?.status === 'successful') {
          console.log('✅ Payment successful!');
          setPaymentStatus('success');
          handleSuccessfulPayment(tx_ref);
        } else if (status.data?.status === 'failed') {
          console.log('❌ Payment failed');
          setPaymentStatus('failed');
          alert('Payment was cancelled or failed.');
        } else if (attempts < maxAttempts) {
          console.log(`⏳ Payment still pending... (attempt ${attempts + 1}/${maxAttempts})`);
          attempts++;
          setTimeout(poll, 10000); // Poll every 10 seconds
        } else {
          console.log('⏰ Payment timeout');
          setPaymentStatus('failed');
          alert('Payment timeout. Please try again.');
        }
      } catch (error) {
        console.error('Payment status check error:', error);
        setPaymentStatus('failed');
      }
    };
    
    poll();
  };

  const handleSuccessfulPayment = (tx_ref: string) => {
    const platform = formData.selectedPlatform;
    const platformName = platform === 'android' ? 'Android' : 'Windows';
    const fileType = platform === 'android' ? 'APK' : 'EXE';
    
    alert(`Payment successful! ${platformName} download link sent to your email! (${fileType} file)`);
    
    // Log successful payment
    console.log('Chapa payment completed:', {
      product: product.name,
      platform: platform,
      tx_ref: tx_ref,
      email: customerEmail,
      amount: platform === 'android' ? 50 : 75,
      timestamp: new Date().toISOString()
    });
    
    // Send download link to user's email
    sendDownloadLink(customerEmail, platform, tx_ref);
    
    onClose();
  };

  const sendDownloadLink = async (email: string, platform: string, tx_ref: string) => {
    try {
      await chapaAPI.sendDownloadLink(email, platform, tx_ref);
    } catch (error) {
      console.error('Email sending failed:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleDownloadRequest = async () => {
    console.log('🚀 Download request initiated');
    console.log('Platform selected:', formData.selectedPlatform);
    console.log('Customer email:', customerEmail);
    console.log('Customer name:', customerName);
    console.log('Show payment:', showPayment);
    
    if (!showPayment) {
      // Show payment options after platform selection
      console.log('📱 Showing payment options');
      setShowPayment(true);
    } else {
      // Process Chapa payment
      const platform = formData.selectedPlatform;
      const amount = platform === 'android' ? 50 : 75;
      
      console.log('💳 Processing payment:', { platform, amount, email: customerEmail, name: customerName });
      
      if (!customerEmail) {
        alert('Please enter your email address');
        return;
      }
      
      if (!customerName) {
        alert('Please enter your full name');
        return;
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(customerEmail)) {
        alert('Please enter a valid email address');
        return;
      }
      
      console.log('✅ Customer details validated, initiating payment...');
      await initiateChapaPayment(customerEmail, customerName, amount, platform);
    }
  };

  const renderGashaAntivirusForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('companyName', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Total Computers *
          </label>
          <input
            type="number"
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('totalComputers', parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Windows OS *
          </label>
          <input
            type="number"
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('windowsOS', parseInt(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Linux OS *
          </label>
          <input
            type="number"
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('linuxOS', parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            32-bit Systems
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('bit32', parseInt(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            64-bit Systems
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('bit64', parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Contact Person 1 *
          </label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('contactPerson1', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Contact Person 2 *
          </label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('contactPerson2', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Contact Email *
          </label>
          <input
            type="email"
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('contactEmail', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Website
          </label>
          <input
            type="url"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('website', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Office Number
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('officeNumber', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Job Title
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Department
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('department', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderGashaWafForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Name of Institution *
        </label>
        <input
          type="text"
          required
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => handleInputChange('institutionName', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Does the institution have an internal website or web application that it manages and deploys by itself? *
        </label>
        <select
          required
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => handleInputChange('hasInternalWebsite', e.target.value === 'yes')}
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      {formData.hasInternalWebsite && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Server OS *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => handleInputChange('serverOS', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                OS Version *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => handleInputChange('osVersion', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Web Server *
            </label>
            <select
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => handleInputChange('webServer', e.target.value)}
            >
              <option value="">Select web server</option>
              <option value="apache">Apache</option>
              <option value="nginx">Nginx</option>
              <option value="other">Other</option>
            </select>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Contact Person 1 *
          </label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('contactPerson1', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Contact Person 2 *
          </label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('contactPerson2', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Contact Email *
          </label>
          <input
            type="email"
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('contactEmail', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Website
          </label>
          <input
            type="url"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('website', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Office Number
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('officeNumber', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Job Title
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Department
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('department', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderBiometricsForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Organization *
          </label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('organization', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Contact Email *
          </label>
          <input
            type="email"
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('contactEmail', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Contact Phone *
          </label>
          <input
            type="tel"
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleInputChange('contactPhone', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Service Details *
        </label>
        <textarea
          required
          rows={3}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => handleInputChange('serviceDetails', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Type of Service/Product *
        </label>
        <input
          type="text"
          required
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => handleInputChange('serviceType', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Purpose of Request *
        </label>
        <textarea
          required
          rows={3}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => handleInputChange('purpose', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Number of Users *
        </label>
        <input
          type="number"
          required
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => handleInputChange('numberOfUsers', parseInt(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Integration Requirements
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => handleInputChange('integrationRequirements', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Bio Modalities *
        </label>
        <select
          required
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => handleInputChange('bioModalities', e.target.value)}
        >
          <option value="">Select bio modalities</option>
          <option value="fingerprint">Fingerprint</option>
          <option value="face">Face</option>
          <option value="iris">Iris</option>
          <option value="face-fingerprint">Face and Fingerprint</option>
          <option value="face-iris">Face and Iris</option>
          <option value="fingerprint-iris">Fingerprint and Iris</option>
          <option value="all">Face, Fingerprint, and Iris</option>
        </select>
      </div>
    </div>
  );

  const renderDownloadForm = () => (
    <div className="space-y-4">
      {/* Platform Selection */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Select Your Platform *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
              formData.selectedPlatform === 'android' 
                ? 'border-green-500 bg-green-50' 
                : 'border-slate-300 hover:border-green-400 hover:bg-green-25'
            }`}
            onClick={() => handleInputChange('selectedPlatform', 'android')}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4119 13.8533 7.8408 12 7.8408s-3.5902.5711-5.1367 1.5654L4.841 5.9032a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-8.4396"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Android</h3>
                <p className="text-sm text-slate-600">Download for Android devices</p>
                <div className="text-xs text-slate-500 mt-1">APK File • Android 6.0+</div>
              </div>
            </div>
          </div>
          
          <div 
            className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
              formData.selectedPlatform === 'windows' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-slate-300 hover:border-blue-400 hover:bg-blue-25'
            }`}
            onClick={() => handleInputChange('selectedPlatform', 'windows')}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6 .09v6.81l-6-1.15V13zm17 .25V22l-10-1.91v-6.75l10 .15z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Windows</h3>
                <p className="text-sm text-slate-600">Download for Windows PC</p>
                <div className="text-xs text-slate-500 mt-1">EXE File • Windows 10+</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapa Payment */}
      {showPayment && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Chapa Payment</h3>
          
          {/* Premium Features Display */}
          <div className="mb-4 p-3 bg-blue-100 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Premium GASHA VPN Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-800">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>AI Threat Detection</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Enterprise Features</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Priority Updates</span>
              </div>
            </div>
          </div>

          {/* Price Display */}
          <div className="mb-4 p-3 bg-white rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-slate-900">GASHA VPN Premium</h4>
                <p className="text-sm text-slate-600">{formData.selectedPlatform === 'android' ? 'Android APK' : 'Windows EXE'}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                  {formData.selectedPlatform === 'android' ? '50' : '75'} ETB
                </div>
                <div className="text-sm text-slate-500">One-time payment</div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Download link will be sent to your email after successful payment
          </p>

          {/* Payment Status */}
          {paymentStatus === 'processing' && (
            <div className="mb-4 p-3 bg-yellow-100 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
                <span className="text-sm font-medium text-yellow-800">Processing payment...</span>
              </div>
              <p className="text-xs text-yellow-700 mt-1">
                Please complete the payment in the Chapa checkout window that opened.
              </p>
            </div>
          )}

          {paymentStatus === 'success' && (
            <div className="mb-4 p-3 bg-green-100 rounded-lg">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="text-sm font-medium text-green-800">Payment successful!</span>
              </div>
            </div>
          )}

          {paymentStatus === 'failed' && (
            <div className="mb-4 p-3 bg-red-100 rounded-lg">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
                <span className="text-sm font-medium text-red-800">Payment failed</span>
              </div>
              <p className="text-xs text-red-700 mt-1">
                Please try again or contact support.
              </p>
            </div>
          )}

          {/* Chapa Info */}
          <div className="p-3 bg-blue-100 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              <span className="text-sm font-medium text-blue-800">Secure Chapa Payment</span>
            </div>
            <p className="text-xs text-blue-700">
              You will be redirected to Chapa checkout to complete the payment securely. 
              Supports all major payment methods. Download link will be sent to your email.
            </p>
          </div>
        </div>
      )}

    </div>
  );

  const renderForm = () => {
    if (isDownloadMode) {
      return renderDownloadForm();
    }

    switch (product.id) {
      case 'gasha-antivirus':
      case 'gasha-vpn':
        return renderGashaAntivirusForm();
      case 'gasha-waf':
        return renderGashaWafForm();
      case 'nisir-siem':
        return renderGashaAntivirusForm(); // Same form as antivirus
      case 'biometrics':
        return renderBiometricsForm();
      default:
        return <div>Form not available for this product.</div>;
    }
  };

  return (
    <div className="fixed top-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                {isDownloadMode ? <Download className="h-6 w-6 text-blue-600" /> : <Send className="h-6 w-6 text-blue-600" />}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {isDownloadMode ? `Download ${product.name}` : `Request ${product.name}`}
                </h2>
                <p className="text-sm text-slate-600">
                  {isDownloadMode 
                    ? (!showPayment ? 'Select your platform' : 'Enter your details') 
                    : 'Fill out the form to request this product'
                  }
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-slate-600" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {renderForm()}

          <div className="flex justify-end space-x-3 mt-6">
            {product.hasDownload && !isDownloadMode && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDownloadMode(true)}
              >
                <Download size={16} className="mr-2" />
                Download Instead
              </Button>
            )}
            
            {isDownloadMode ? (
              <div className="flex flex-col space-y-2">
                <Button
                  type="button"
                  onClick={handleDownloadRequest}
                  disabled={!formData.selectedPlatform || (showPayment && (!customerEmail || !customerName)) || paymentStatus === 'processing'}
                >
                  {!showPayment ? 'Continue to Payment' : 'Pay with Chapa'}
                </Button>
                
                {/* Debug Button - Only in development */}
                {process.env.NODE_ENV === 'development' && (
                  <button
                    onClick={() => {
                      debugAllPayments();
                      alert('Check console for payment debug information');
                    }}
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white text-sm py-2 px-4 rounded-lg transition-colors"
                  >
                    🔍 Debug Payments
                  </button>
                )}
              </div>
            ) : (
              <Button type="submit" disabled={Object.keys(formData).length === 0}>
                <Send size={16} className="mr-2" />
                Submit Request
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductRequestForm;
