import React from 'react';
import { Header } from './components/Header';
import { ProductFilters } from './components/ProductFilters';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { Login } from './components/Login';
import { Checkout } from './components/Checkout';
import { useStore } from './store/useStore';

function App() {
  const { currentView } = useStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Cart />
      <Login />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'products' ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Discover Amazing Products
              </h1>
              <p className="text-gray-600">
                Find the perfect items for your lifestyle with our curated collection
              </p>
            </div>
            
            <ProductFilters />
            <ProductGrid />
          </>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Checkout
              </h1>
              <p className="text-gray-600">
                Complete your purchase securely
              </p>
            </div>
            
            <Checkout />
          </>
        )}
      </main>
    </div>
  );
}

export default App;