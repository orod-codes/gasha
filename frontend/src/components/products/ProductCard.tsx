import React, { useState } from 'react';
import { Download, Send, Eye, ArrowRight, Star } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ProductModal from './ProductModal';
import ProductRequestForm from './ProductRequestForm';
import { Product } from '../../types';
import { createRequest } from '../../services/requestService';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'gasha': return { bg: 'from-blue-500 to-blue-600', text: 'text-blue-600', badge: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'nisir': return { bg: 'from-green-500 to-green-600', text: 'text-green-600', badge: 'bg-green-50 text-green-700 border-green-200' };
      case 'enyuma': return { bg: 'from-purple-500 to-purple-600', text: 'text-purple-600', badge: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'codepro': return { bg: 'from-orange-500 to-orange-600', text: 'text-orange-600', badge: 'bg-orange-50 text-orange-700 border-orange-200' };
      case 'biometrics': return { bg: 'from-red-500 to-red-600', text: 'text-red-600', badge: 'bg-red-50 text-red-700 border-red-200' };
      default: return { bg: 'from-slate-500 to-slate-600', text: 'text-slate-600', badge: 'bg-slate-50 text-slate-700 border-slate-200' };
    }
  };

  const getProductLogo = (productName: string) => {
    const name = productName.toLowerCase();
    if (name === 'gasha anti-virus') return '/gasha antivirus.png';
    if (name === 'gasha waf') return '/gasha waf.png';
    if (name === 'gasha vpn') return '/gasha vpn.png';
    if (name === 'nisir siem') return '/Nisir.png';
    if (name === 'enyuma iam') return '/Enyuma IAM.png';
    if (name === 'codepro protection') return '/code protection .png';
    if (name === 'biometrics abis') return '/Biometric.png';
    return '/mian logo.png'; // Default logo
  };

  const handleRequestSubmit = async (formData: any) => {
    try {
      console.log('Request submitted:', formData);
      
      // Prepare request data
      const requestData = {
        productId: product.id,
        status: 'pending',
        formData: formData,
        // Add any additional fields from the form
        companyName: formData.companyName || '',
        contactPerson: formData.contactPerson || '',
        email: formData.email || '',
        phone: formData.phone || '',
        priority: formData.priority || 'medium'
      };

      // Submit to backend
      const result = await createRequest(requestData);
      
      if (result.success) {
        alert('Request submitted successfully! You will be contacted soon.');
        console.log('Request created:', result.request);
      } else {
        alert('Failed to submit request. Please try again.');
        console.error('Request submission failed:', result.error);
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('An error occurred while submitting your request. Please try again.');
    }
  };

  const getActionButtons = () => {
    const buttons = [];
    
    if (product.hasRequest) {
      buttons.push(
        <Button 
          key="request" 
          size="sm" 
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
          onClick={() => setIsRequestFormOpen(true)}
        >
          <Send size={16} className="mr-2" />
          Send Request
        </Button>
      );
    }
    
    if (product.hasDownload) {
      buttons.push(
        <Button 
          key="download" 
          variant="secondary" 
          size="sm" 
          className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800"
          onClick={() => setIsRequestFormOpen(true)}
        >
          <Download size={16} className="mr-2" />
          Download
        </Button>
      );
    }
    
    if (product.hasShowProducts) {
      buttons.push(
        <Button 
          key="show" 
          variant="outline" 
          size="sm" 
          className="flex-1 border-2 border-slate-300 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50"
          onClick={() => {
            // Redirect to admin blog page for this module
            window.location.href = `#${product.module}-blog`;
          }}
        >
          <Eye size={16} className="mr-2" />
          Show Products
        </Button>
      );
    }

    return buttons;
  };

  const colors = getCategoryColor(product.category);

  return (
    <>
      <Card hover className="h-full flex flex-col group relative overflow-hidden bg-transparent border-none shadow-none">
        
        
        {/* Modern Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M0 0h40v1H0zm0 8h40v1H0zm0 8h40v1H0zm0 8h40v1H0zm0 8h40v1H0zm0 8h40v1H0zM0 0v40h1V0zm8 0v40h1V0zm8 0v40h1V0zm8 0v40h1V0zm8 0v40h1V0zm8 0v40h1V0z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        <div className="relative p-4 flex-1">
          {/* Modern Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-3">
              <div className="p-2">
                <img 
                  src={getProductLogo(product.name)} 
                  alt={`${product.name} Logo`}
                  className="h-20 w-20 object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-white mb-2 tracking-tight">{product.name}</h3>
                <span className={`inline-block px-3 py-1 rounded-xl text-xs font-bold border-2 ${colors.badge} backdrop-blur-sm shadow-sm`}>
                  {product.category.toUpperCase()}
                </span>
              </div>
            </div>
            
          </div>
          
          {/* Modern Description */}
          <div className="bg-transparent rounded-xl p-2 mb-3">
            <p className="text-white leading-snug text-sm line-clamp-2 font-medium">{product.description}</p>
          </div>
          
          {/* Modern Expandable Features */}
          <div className="space-y-2 mb-4">
            {product.features.slice(0, isExpanded ? product.features.length : 2).map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 group/feature">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0 group-hover/feature:scale-125 transition-transform duration-200"></div>
                <p className="text-white font-semibold text-xs leading-snug">{feature}</p>
              </div>
            ))}
            {product.features.length > 2 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 hover:text-blue-800 font-bold flex items-center space-x-1 text-xs group bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1 rounded-lg border border-blue-200/50 hover:border-blue-300 transition-all duration-300"
              >
                <span>{isExpanded ? 'Show Less' : `+${product.features.length - 2} More Features`}</span>
                <ArrowRight size={14} className={`group-hover:translate-x-1 transition-all duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
              </button>
            )}
          </div>

        </div>
        
        {/* Modern Actions */}
        <div className="relative p-4 pt-0 space-y-2">
          <div className="flex gap-2">
            {getActionButtons()}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsModalOpen(true)}
            className="w-full text-white hover:text-white font-bold text-sm py-2 rounded-xl"
          >
            Learn More About {product.name}
          </Button>
        </div>

        {/* Modern Hover Effect Border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-300/50 rounded-2xl transition-all duration-500 pointer-events-none"></div>
        
        {/* Modern Corner Accent */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </Card>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ProductRequestForm
        product={product}
        isOpen={isRequestFormOpen}
        onClose={() => setIsRequestFormOpen(false)}
        onSubmit={handleRequestSubmit}
      />
    </>
  );
};

export default ProductCard;