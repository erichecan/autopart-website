import { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { productCategories } from '../../data/products.js';
import { Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react';

const ProductManager = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    nameKey: '',
    price: '',
    moq: '',
    image: '',
    category: '',
    oemCode: ''
  });

  // Load products on component mount
  useEffect(() => {
    const allProducts = productCategories.flatMap(category => 
      category.products.map(product => ({
        ...product,
        categoryName: category.nameKey
      }))
    );
    setProducts(allProducts);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setFormData({
      id: product.id,
      nameKey: product.nameKey,
      price: product.price.toString(),
      moq: product.moq.toString(),
      image: product.image,
      category: product.category,
      oemCode: product.oemCode || ''
    });
  };

  const handleSave = () => {
    // In a real application, this would save to a backend
    const updatedProducts = products.map(product => 
      product.id === editingProduct
        ? {
            ...product,
            nameKey: formData.nameKey,
            price: parseFloat(formData.price),
            moq: parseInt(formData.moq),
            image: formData.image,
            category: formData.category,
            oemCode: formData.oemCode
          }
        : product
    );
    
    setProducts(updatedProducts);
    setEditingProduct(null);
    setFormData({
      id: '',
      nameKey: '',
      price: '',
      moq: '',
      image: '',
      category: '',
      oemCode: ''
    });
    
    alert('产品更新成功！（注意：演示模式下修改为临时效果）');
  };

  const handleAdd = () => {
    const newProduct = {
      id: formData.id,
      nameKey: formData.nameKey,
      price: parseFloat(formData.price),
      moq: parseInt(formData.moq),
      image: formData.image,
      category: formData.category,
      oemCode: formData.oemCode,
      categoryName: productCategories.find(cat => cat.id === formData.category)?.nameKey || ''
    };
    
    setProducts([...products, newProduct]);
    setShowAddForm(false);
    setFormData({
      id: '',
      nameKey: '',
      price: '',
      moq: '',
      image: '',
      category: '',
      oemCode: ''
    });
    
    alert('产品添加成功！（注意：演示模式下修改为临时效果）');
  };

  const handleDelete = (productId) => {
    if (confirm('您确定要删除这个产品吗？')) {
      setProducts(products.filter(product => product.id !== productId));
      alert('产品删除成功！（注意：演示模式下修改为临时效果）');
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setShowAddForm(false);
    setFormData({
      id: '',
      nameKey: '',
      price: '',
      moq: '',
      image: '',
      category: '',
      oemCode: ''
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">产品管理</h2>
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
                产品ID
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                disabled={editingProduct}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="例如：brake-pads-new"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                产品名称键值
              </label>
              <input
                type="text"
                name="nameKey"
                value={formData.nameKey}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="例如：brakePads"
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
                分类
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">选择分类</option>
                {productCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {t(category.nameKey)}
                  </option>
                ))}
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
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={showAddForm ? handleAdd : handleSave}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              {showAddForm ? '添加产品' : '保存修改'}
            </button>
            <button
              onClick={handleCancel}
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
                <th className="text-left py-3 px-4 font-semibold text-gray-900">最小起订量</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">操作</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <img
                      src={product.image}
                      alt={product.nameKey}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{t(product.nameKey)}</p>
                      <p className="text-sm text-gray-500">{product.nameKey}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-sm text-gray-600">{product.oemCode}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {t(product.categoryName)}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium">${product.price}</td>
                  <td className="py-3 px-4">{product.moq} pcs</td>
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
              ))}
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