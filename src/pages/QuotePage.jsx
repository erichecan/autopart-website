import { useState } from 'react';
import { Send, FileText, CheckCircle, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage.jsx';
import { productCategories } from '../data/products';

const QuotePage = ({ selectedProduct, setSelectedProduct }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    productCategory: selectedProduct?.category || '',
    productName: selectedProduct?.nameKey || '',
    quantity: '',
    specifications: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    // Netlify Forms will handle the submission
    // No need to prevent default - let Netlify handle it
    console.log('Quote form submitted:', formData);
  };

  // Get all products for the dropdown
  const allProducts = productCategories.flatMap(category => 
    category.products.map(product => ({
      ...product,
      categoryName: t(category.nameKey)
    }))
  );

  const benefits = [
    'Free detailed quote within 24 hours',
    'Competitive factory-direct pricing',
    'Flexible MOQ for different products',
    'Quality assurance and warranty',
    'Fast shipping and reliable logistics',
    'Professional technical support'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('quoteTitle')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('quoteDescription')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Quote Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('requestQuote')}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6" name="quote-request" method="POST" data-netlify="true" action="/quote-success">
                <input type="hidden" name="form-name" value="quote-request" />
                
                {/* Product Information */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('productInformation')}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('productCategory')} *
                      </label>
                      <select
                        id="productCategory"
                        name="productCategory"
                        value={formData.productCategory}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                      >
                        <option value="">{t('selectCategory')}</option>
                        {productCategories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {t(category.nameKey)}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('productName')} *
                      </label>
                      <select
                        id="productName"
                        name="productName"
                        value={formData.productName}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                      >
                        <option value="">{t('selectProduct')}</option>
                        {allProducts
                          .filter(product => !formData.productCategory || product.category === formData.productCategory)
                          .map((product) => (
                            <option key={product.id} value={product.nameKey}>
                              {t(product.nameKey)}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('quantity')} *
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        required
                        min="1"
                        className="input-field"
                        placeholder={t('enterQuantity')}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="specifications" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('specifications')}
                      </label>
                      <input
                        type="text"
                        id="specifications"
                        name="specifications"
                        value={formData.specifications}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder={t('specificationsPlaceholder')}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('contactInformation')}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('yourName')} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder={t('enterFullName')}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('yourEmail')} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder={t('enterEmail')}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('yourPhone')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder={t('enterPhone')}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('company')}
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder={t('enterCompany')}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('additionalInformation')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="input-field"
                    placeholder={t('additionalInfoPlaceholder')}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {t('submit')}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Benefits */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('whyChooseUs')}
                </h3>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-primary-600 text-white rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {t('needHelp')}
                </h3>
                <p className="text-blue-100 mb-4">
                  {t('salesTeamReady')}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4" />
                    <span>+86 138 0013 8000</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4" />
                    <span>sales@autoparts.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Mon-Fri: 8:00 AM - 6:00 PM (CST)</span>
                  </div>
                </div>
              </div>

              {/* Selected Product Info */}
              {selectedProduct && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('selectedProduct')}
                  </h3>
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedProduct.image}
                      alt={t(selectedProduct.nameKey)}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {t(selectedProduct.nameKey)}
                      </h4>
                      {/* Price and MOQ commented out for current stage */}
                      {/* <p className="text-sm text-gray-600">
                        ${selectedProduct.price} USD
                      </p>
                      <p className="text-sm text-gray-600">
                        MOQ: {selectedProduct.moq} pcs
                      </p> */}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="mt-4 text-sm text-primary-600 hover:text-primary-700"
                  >
                    {t('clearSelection')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePage;