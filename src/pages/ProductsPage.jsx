import { useState, useEffect } from 'react';
import { Filter, Grid, List, Search } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage.jsx';
import { getProducts, getCategories } from '../lib/supabase.js';
import ProductCard from '../components/ProductCard';

const ProductsPage = ({ setCurrentPage, setSelectedProduct }) => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // 获取产品和分类数据
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(language, selectedCategory === 'all' ? null : selectedCategory),
          getCategories(language)
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [language, selectedCategory]);

  const handleQuoteClick = (product) => {
    // 转换产品数据格式以兼容现有组件
    const compatibleProduct = {
      id: product.id,
      nameKey: product.product_translations[0]?.name || product.slug,
      price: product.price,
      moq: product.moq,
      image: product.image,
      category: product.category_id,
      oemCode: product.oemCode
    };
    setSelectedProduct(compatibleProduct);
    setCurrentPage('quote');
  };

  // 筛选产品
  const filteredProducts = products.filter(product => {
    const productName = product.product_translations[0]?.name || '';
    const categoryName = product.categories?.category_translations[0]?.name || '';
    
    const matchesSearch = searchTerm === '' || 
      productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.oemCode && product.oemCode.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('products')}
          </h1>
          <p className="text-lg text-gray-600">
            Explore our comprehensive range of professional automotive parts
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-4">
            <Filter className="text-gray-500 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_translations[0]?.name || category.slug}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {filteredProducts.length} products found
            {selectedCategory !== 'all' && (
              <span className="ml-1">
                in {categories.find(c => c.id === selectedCategory)?.category_translations[0]?.name || 'Category'}
              </span>
            )}
          </p>
          
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.category_translations[0]?.name || category.slug}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">{t('loading')}</div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => {
              // 转换Supabase数据格式以兼容ProductCard组件
              const compatibleProduct = {
                id: product.id,
                nameKey: product.product_translations[0]?.name || product.slug,
                price: product.price,
                moq: product.moq,
                image: product.image,
                category: product.categories?.slug || product.category_id,
                oemCode: product.oemCode
              };
              return (
                <ProductCard
                  key={product.id}
                  product={compatibleProduct}
                  onQuoteClick={handleQuoteClick}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;