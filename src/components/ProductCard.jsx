import { DollarSign, Package, ArrowRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage.jsx';

const ProductCard = ({ product, onQuoteClick }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={t(product.nameKey)}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {t(product.category + 'System')}
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t(product.nameKey)}
        </h3>
        {product.oemCode && (
          <p className="text-sm text-gray-500 mb-3 font-mono">
            OEM: {product.oemCode}
          </p>
        )}

        {/* Price and MOQ */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span>{t('price')}:</span>
            </div>
            <span className="text-lg font-bold text-primary-600">
              ${product.price} {t('usd')}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Package className="w-4 h-4" />
              <span>{t('moq')}:</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {product.moq} {t('pieces')}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onQuoteClick(product)}
            className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
          >
            {t('getQuote')}
            <ArrowRight className="w-4 h-4" />
          </button>
          {/* TODO: View Details button - to be implemented later */}
          {/* <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            {t('viewDetails')}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;