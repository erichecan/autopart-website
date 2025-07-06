import { Car, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage.jsx';
import { productCategories } from '../data/products';

const Footer = ({ setCurrentPage }) => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { key: 'home', label: t('home') },
    { key: 'products', label: t('products') },
    { key: 'about', label: t('about') },
    { key: 'contact', label: t('contact') },
    { key: 'quote', label: t('quote') }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Car className="w-8 h-8 text-primary-400" />
              <h3 className="text-lg font-bold">{t('companyName')}</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('footerDescription')}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span className="bg-primary-600 px-2 py-1 rounded text-white text-xs font-medium">
                {t('factoryTitle')}
              </span>
              <span>{t('experienceYears')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => {
                      setCurrentPage(link.key);
                      scrollToTop();
                    }}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('productCategories')}</h3>
            <ul className="space-y-2">
              {productCategories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => {
                      setCurrentPage('products');
                      scrollToTop();
                    }}
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2"
                  >
                    <span>{category.icon}</span>
                    <span>{t(category.nameKey)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('contactInfo')}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary-400 mt-0.5" />
                <div>
                  <p className="text-gray-300">+86 138 0013 8000</p>
                  <p className="text-gray-400 text-xs">Mon-Fri: 8:00-18:00 (CST)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary-400 mt-0.5" />
                <div>
                  <p className="text-gray-300">sales@autoparts.com</p>
                  <p className="text-gray-400 text-xs">24/7 Support</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5" />
                <div>
                  <p className="text-gray-300">Guangzhou, China</p>
                  <p className="text-gray-400 text-xs">Manufacturing Hub</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            <p>&copy; 2024 Professional Auto Parts Supplier. All rights reserved.</p>
          </div>
          
          <button
            onClick={scrollToTop}
            className="mt-4 sm:mt-0 flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowUp className="w-4 h-4" />
            <span>{t('backToTop')}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;