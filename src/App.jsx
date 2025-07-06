import { useState } from 'react';
import { LanguageProvider } from './hooks/useLanguage.jsx';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import QuotePage from './pages/QuotePage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

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
      default:
        return <HomePage setCurrentPage={setCurrentPage} setSelectedProduct={setSelectedProduct} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main>
          {renderPage()}
        </main>
        <Footer setCurrentPage={setCurrentPage} />
      </div>
    </LanguageProvider>
  );
}

export default App;