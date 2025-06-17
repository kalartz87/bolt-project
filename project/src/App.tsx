import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { AuthModal } from './components/Auth/AuthModal';
import { CartSidebar } from './components/Cart/CartSidebar';
import { HomePage } from './pages/HomePage';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { VendorDashboard } from './pages/VendorDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

function AppContent() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const { user, isAuthenticated } = useAuth();

  const renderDashboardContent = () => {
    if (!isAuthenticated) {
      return <HomePage />;
    }

    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'vendor':
        return <VendorDashboard />;
      case 'customer':
        return <CustomerDashboard />;
      default:
        return <HomePage />;
    }
  };

  const renderMainContent = () => {
    if (!isAuthenticated) {
      return <HomePage />;
    }

    if (activeView === 'dashboard') {
      return renderDashboardContent();
    }

    // Other views would be implemented here based on activeView
    return renderDashboardContent();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onAuthClick={() => setIsAuthModalOpen(true)} 
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <div className="flex">
        {isAuthenticated && (
          <Sidebar 
            activeView={activeView} 
            onViewChange={setActiveView} 
          />
        )}
        
        <main className="flex-1 p-6">
          {renderMainContent()}
        </main>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        onAuthClick={() => {
          setIsCartOpen(false);
          setIsAuthModalOpen(true);
        }}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;