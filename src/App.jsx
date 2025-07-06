import { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './hooks/useLanguage.jsx';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import QuotePage from './pages/QuotePage';
import AdminLogin from './admin/components/AdminLogin';
import AdminApp from './admin/AdminApp';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const { language } = useLanguage();

  // Check for admin route
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin' || path.startsWith('/admin/')) {
      setCurrentPage('admin');
    }
  }, []);

  // Update document direction and language for RTL support
  useEffect(() => {
    const html = document.documentElement;
    
    if (language === 'ar') {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'ar');
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', language);
    }
  }, [language]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} />;
      case 'products':
        return <ProductsPage setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage setCurrentPage={setCurrentPage} />;
      case 'quote':
        return <QuotePage selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />;
      case 'admin':
        return isAdminLoggedIn ? 
          <AdminApp onLogout={() => setIsAdminLoggedIn(false)} /> : 
          <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;