import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage.jsx';
import ProductManager from './pages/ProductManager';
import CategoryManager from './pages/CategoryManager';
import { Shield, Package, FolderOpen, LogOut } from 'lucide-react';

const AdminApp = ({ onLogout }) => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState('products');

  const navigation = [
    { key: 'products', label: 'Product Management', icon: <Package className="w-5 h-5" /> },
    { key: 'categories', label: 'Category Management', icon: <FolderOpen className="w-5 h-5" /> }
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'products':
        return <ProductManager />;
      case 'categories':
        return <CategoryManager />;
      default:
        return <ProductManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-red-600" />
              <h1 className="text-xl font-bold text-gray-900">CMS Admin Panel</h1>
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Management</h2>
              <div className="space-y-2">
                {navigation.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setCurrentPage(item.key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      currentPage === item.key
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderPage()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminApp;