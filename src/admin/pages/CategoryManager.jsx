import { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage.jsx';
import { 
  getCategoriesForCMS, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from '../../lib/supabase.js';
import { generateAllLanguageTranslations } from '../../lib/translationService.js';
import { Plus, Edit, Trash2, Save, X, Globe } from 'lucide-react';

const CategoryManager = () => {
  const { t } = useLanguage();
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    slug: '',
    chineseName: '',
    icon: '',
    sort_order: 0
  });

  // 加载分类数据
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const categoriesData = await getCategoriesForCMS();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading categories:', error);
      alert('加载数据失败：' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (category) => {
    setEditingCategory(category.id);
    // 获取中文翻译
    const chineseTranslation = category.category_translations.find(t => t.language === 'zh');
    setFormData({
      slug: category.slug,
      chineseName: chineseTranslation?.name || '',
      icon: category.icon || '',
      sort_order: category.sort_order || 0
    });
  };

  const handleSave = async () => {
    if (!formData.chineseName.trim()) {
      alert('请输入分类名称');
      return;
    }

    setSaving(true);
    try {
      // 生成所有语言的翻译
      const translations = generateAllLanguageTranslations(formData.chineseName);

      const categoryData = {
        slug: formData.slug || formData.chineseName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        icon: formData.icon,
        sort_order: parseInt(formData.sort_order) || 0
      };

      const result = await updateCategory(editingCategory, categoryData, translations);
      
      if (result.success) {
        alert('分类更新成功！其他语言版本已自动生成。');
        setEditingCategory(null);
        resetForm();
        loadData();
      } else {
        alert('更新失败：' + result.error);
      }
    } catch (error) {
      console.error('Error saving category:', error);
      alert('保存失败：' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = async () => {
    if (!formData.chineseName.trim()) {
      alert('请输入分类名称');
      return;
    }

    setSaving(true);
    try {
      // 生成所有语言的翻译
      const translations = generateAllLanguageTranslations(formData.chineseName);

      const categoryData = {
        slug: formData.slug || formData.chineseName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        icon: formData.icon,
        sort_order: parseInt(formData.sort_order) || 0
      };

      const result = await createCategory(categoryData, translations);
      
      if (result.success) {
        alert('分类添加成功！其他语言版本已自动生成。');
        setShowAddForm(false);
        resetForm();
        loadData();
      } else {
        alert('添加失败：' + result.error);
      }
    } catch (error) {
      console.error('Error adding category:', error);
      alert('添加失败：' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (categoryId) => {
    if (!confirm('您确定要删除这个分类吗？此操作将删除所有语言版本。')) {
      return;
    }

    try {
      const result = await deleteCategory(categoryId);
      if (result.success) {
        alert('分类删除成功！');
        loadData();
      } else {
        alert('删除失败：' + result.error);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('删除失败：' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      slug: '',
      chineseName: '',
      icon: '',
      sort_order: 0
    });
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setShowAddForm(false);
    resetForm();
  };

  const commonIcons = ['🔧', '🛑', '🔩', '⚡', '🔍', '💡', '🚗', '🔋', '⚙️', '🛠️'];

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-lg text-gray-600">正在加载分类数据...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">分类管理</h2>
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
            添加分类
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingCategory) && (
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {showAddForm ? '添加新分类' : '编辑分类'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                分类标识符 (Slug)
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="例如：engine（留空自动生成）"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                分类名称 (中文) *
              </label>
              <input
                type="text"
                name="chineseName"
                value={formData.chineseName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="例如：发动机系统"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                排序
              </label>
              <input
                type="number"
                name="sort_order"
                value={formData.sort_order}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                图标（表情符号）
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
                placeholder="从上面选择或输入自定义表情符号"
              />
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={showAddForm ? handleAdd : handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? '保存中...' : (showAddForm ? '添加分类' : '保存修改')}
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

      {/* Categories Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => {
            const chineseTranslation = category.category_translations?.find(t => t.language === 'zh');
            const productCount = 0; // TODO: 从Supabase获取产品数量
            
            return (
              <div key={category.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {chineseTranslation?.name || category.slug}
                      </h3>
                      <p className="text-sm text-gray-500">{category.slug}</p>
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
                  <span className="text-gray-600">产品数量：{productCount}</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    排序: {category.sort_order}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        {categories.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            没有找到分类。请添加您的第一个分类。
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManager;