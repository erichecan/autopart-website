import { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { 
  getProductsForCMS, 
  getCategoriesForCMS, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../../lib/supabase.js';
import { generateAllLanguageTranslations } from '../../lib/translationService.js';
import { Plus, Edit, Trash2, Save, X, Upload, Globe } from 'lucide-react';

const ProductManager = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    slug: '',
    chineseName: '',
    chineseDescription: '',
    price: '',
    moq: '',
    image: '',
    category_id: '',
    oemCode: '',
    featured: false,
    status: 'active'
  });

  // 加载产品和分类数据
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        getProductsForCMS(),
        getCategoriesForCMS()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('加载数据失败：' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    // 获取中文翻译
    const chineseTranslation = product.product_translations.find(t => t.language === 'zh');
    setFormData({
      slug: product.slug,
      chineseName: chineseTranslation?.name || '',
      chineseDescription: chineseTranslation?.description || '',
      price: product.price?.toString() || '',
      moq: product.moq?.toString() || '',
      image: product.image || '',
      category_id: product.category_id,
      oemCode: product.oemCode || '',
      featured: product.featured || false,
      status: product.status || 'active'
    });
  };

  const handleSave = async () => {
    if (!formData.chineseName.trim()) {
      alert('请输入产品名称');
      return;
    }

    setSaving(true);
    try {
      // 生成所有语言的翻译
      const translations = generateAllLanguageTranslations(
        formData.chineseName, 
        formData.chineseDescription
      );

      const productData = {
        slug: formData.slug || formData.chineseName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        category_id: formData.category_id,
        oemCode: formData.oemCode,
        price: parseFloat(formData.price) || null,
        moq: parseInt(formData.moq) || null,
        image: formData.image,
        featured: formData.featured,
        status: formData.status
      };

      const result = await updateProduct(editingProduct, productData, translations);
      
      if (result.success) {
        alert('产品更新成功！其他语言版本已自动生成。');
        setEditingProduct(null);
        resetForm();
        loadData();
      } else {
        alert('更新失败：' + result.error);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('保存失败：' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = async () => {
    if (!formData.chineseName.trim()) {
      alert('请输入产品名称');
      return;
    }

    setSaving(true);
    try {
      // 生成所有语言的翻译
      const translations = generateAllLanguageTranslations(
        formData.chineseName, 
        formData.chineseDescription
      );

      const productData = {
        slug: formData.slug || formData.chineseName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        category_id: formData.category_id,
        oemCode: formData.oemCode,
        price: parseFloat(formData.price) || null,
        moq: parseInt(formData.moq) || null,
        image: formData.image,
        featured: formData.featured,
        status: formData.status
      };

      const result = await createProduct(productData, translations);
      
      if (result.success) {
        alert('产品添加成功！其他语言版本已自动生成。');
        setShowAddForm(false);
        resetForm();
        loadData();
      } else {
        alert('添加失败：' + result.error);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('添加失败：' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!confirm('您确定要删除这个产品吗？此操作将删除所有语言版本。')) {
      return;
    }

    try {
      const result = await deleteProduct(productId);
      if (result.success) {
        alert('产品删除成功！');
        loadData();
      } else {
        alert('删除失败：' + result.error);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('删除失败：' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      slug: '',
      chineseName: '',
      chineseDescription: '',
      price: '',
      moq: '',
      image: '',
      category_id: '',
      oemCode: '',
      featured: false,
      status: 'active'
    });
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setShowAddForm(false);
    resetForm();
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    const chineseTranslation = category?.category_translations?.find(t => t.language === 'zh');
    return chineseTranslation?.name || category?.slug || '未知分类';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-lg text-gray-600">正在加载产品数据...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">产品管理</h2>
            <p className="text-sm text-gray-600 mt-1">
              <Globe className="w-4 h-4 inline mr-1" />
              支持多语言：输入中文，自动生成英文、法文、西班牙文、阿拉伯文
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            添加产品
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingProduct) && (
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {showAddForm ? '添加新产品' : '编辑产品'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                产品标识符 (Slug)
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="例如：brake-pads-premium（留空自动生成）"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                产品名称 (中文) *
              </label>
              <input
                type="text"
                name="chineseName"
                value={formData.chineseName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="例如：高级刹车片"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                产品描述 (中文)
              </label>
              <textarea
                name="chineseDescription"
                value={formData.chineseDescription}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="例如：采用优质材料制造，确保卓越的制动性能和耐用性"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                价格 (USD)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="25.00"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                最小起订量 (MOQ)
              </label>
              <input
                type="number"
                name="moq"
                value={formData.moq}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                分类 *
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">选择分类</option>
                {categories.map(category => {
                  const chineseTranslation = category.category_translations?.find(t => t.language === 'zh');
                  return (
                    <option key={category.id} value={category.id}>
                      {chineseTranslation?.name || category.slug}
                    </option>
                  );
                })}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OEM 代码
              </label>
              <input
                type="text"
                name="oemCode"
                value={formData.oemCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="例如：BRK-3400-PAD"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                图片链接
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="https://images.unsplash.com/photo-xxx"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">推荐产品</span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  状态
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="active">启用</option>
                  <option value="inactive">禁用</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={showAddForm ? handleAdd : handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? '保存中...' : (showAddForm ? '添加产品' : '保存修改')}
            </button>
            <button
              onClick={handleCancel}
              disabled={saving}
              className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
              取消
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">图片</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">产品名称</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">OEM代码</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">分类</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">价格</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">状态</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">操作</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const chineseTranslation = product.product_translations?.find(t => t.language === 'zh');
                return (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={chineseTranslation?.name || product.slug}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                          <Upload className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {chineseTranslation?.name || product.slug}
                        </p>
                        <p className="text-sm text-gray-500">{product.slug}</p>
                        {product.featured && (
                          <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full mt-1">
                            推荐
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm text-gray-600">{product.oemCode || '-'}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {getCategoryName(product.category_id)}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {product.price ? `$${product.price}` : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        product.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.status === 'active' ? '启用' : '禁用'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            没有找到产品。请添加您的第一个产品。
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManager;