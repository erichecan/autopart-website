import { ArrowRight, CheckCircle, Factory, Truck, DollarSign, Award } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage.jsx';
import { featuredProducts, productCategories } from '../data/products';
import ProductCard from '../components/ProductCard';

const HomePage = ({ setCurrentPage, setSelectedProduct }) => {
  const { t } = useLanguage();

  const handleQuoteClick = (product) => {
    setSelectedProduct(product);
    setCurrentPage('quote');
  };

  const advantages = [
    {
      icon: <Factory className="w-8 h-8 text-primary-400" />,
      title: t('factoryTitle'),
      description: t('experienceYears')
    },
    {
      icon: <Award className="w-8 h-8 text-primary-400" />,
      title: t('qualityAssurance'),
      description: t('strictQualityControl')
    },
    {
      icon: <DollarSign className="w-8 h-8 text-primary-400" />,
      title: t('competitivePrice'),
      description: t('highQualityMaterials')
    },
    {
      icon: <Truck className="w-8 h-8 text-primary-400" />,
      title: t('fastDelivery'),
      description: t('fastDelivery')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {t('heroTitle')}
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-blue-100">
                {t('heroSubtitle')}
              </p>
              <p className="text-lg mb-8 text-blue-100">
                {t('heroDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setCurrentPage('quote')}
                  className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  {t('getQuote')}
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentPage('products')}
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  {t('viewProducts')}
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop"
                alt="Auto Parts"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-primary-600 bg-opacity-20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('ourAdvantages')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('aboutDescription')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {advantage.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {advantage.title}
                </h3>
                <p className="text-gray-600">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('productCategories')}
            </h2>
            <p className="text-lg text-gray-600">
              Explore our comprehensive range of automotive parts
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {productCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setCurrentPage('products')}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-center group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {t(category.nameKey)}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600">
              Our most popular auto parts with competitive prices
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 6).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuoteClick={handleQuoteClick}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={() => setCurrentPage('products')}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center gap-2"
            >
              {t('viewProducts')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            {t('contactDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('quote')}
              className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {t('getQuote')}
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {t('contactTitle')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;