import { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { productCategories } from '../../data/products.js';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

const CategoryManager = () => {
  const { t } = useLanguage();
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    nameKey: '',
    icon: ''
  });

  // Load categories on component mount
  useEffect(() => {
    setCategories(productCategories.map(cat => ({
      id: cat.id,
      nameKey: cat.nameKey,
      icon: cat.icon,
      productCount: cat.products.length
    })));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (category) => {
    setEditingCategory(category.id);
    setFormData({
      id: category.id,
      nameKey: category.nameKey,
      icon: category.icon
    });
  };

  const handleSave = () => {
    // In a real application, this would save to a backend
    const updatedCategories = categories.map(category => 
      category.id === editingCategory
        ? {
            ...category,
            nameKey: formData.nameKey,
            icon: formData.icon
          }
        : category
    );
    
    setCategories(updatedCategories);
    setEditingCategory(null);
    setFormData({
      id: '',
      nameKey: '',
      icon: ''
    });
    
    alert('Category updated successfully! (Note: Changes are temporary in demo mode)');
  };

  const handleAdd = () => {
    const newCategory = {
      id: formData.id,
      nameKey: formData.nameKey,
      icon: formData.icon,
      productCount: 0
    };
    
    setCategories([...categories, newCategory]);
    setShowAddForm(false);
    setFormData({
      id: '',
      nameKey: '',
      icon: ''
    });
    
    alert('Category added successfully! (Note: Changes are temporary in demo mode)');
  };

  const handleDelete = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (category && category.productCount > 0) {
      alert('Cannot delete category with existing products. Please move or delete products first.');
      return;
    }
    
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(category => category.id !== categoryId));
      alert('Category deleted successfully! (Note: Changes are temporary in demo mode)');
    }
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setShowAddForm(false);
    setFormData({
      id: '',
      nameKey: '',
      icon: ''
    });
  };

  const commonIcons = ['🔧', '🛑', '🔩', '⚡', '🔍', '💡', '🚗', '🔋', '⚙️', '🛠️'];

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Category Management</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingCategory) && (
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {showAddForm ? 'Add New Category' : 'Edit Category'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category ID
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                disabled={editingCategory}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., engine-new"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name Key (for translations)
              </label>
              <input
                type="text"
                name="nameKey"
                value={formData.nameKey}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., engineSystem"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon (Emoji)
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {commonIcons.map(icon => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, icon }))}
                    className={`p-2 text-xl border rounded-md hover:bg-gray-100 ${
                      formData.icon === icon ? 'bg-primary-100 border-primary-500' : 'border-gray-300'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Select from above or enter custom emoji"
              />
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={showAddForm ? handleAdd : handleSave}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              {showAddForm ? 'Add Category' : 'Save Changes'}
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{t(category.nameKey)}</h3>
                    <p className="text-sm text-gray-500">{category.nameKey}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Products: {category.productCount}</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                  ID: {category.id}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {categories.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No categories found. Add your first category to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManager;