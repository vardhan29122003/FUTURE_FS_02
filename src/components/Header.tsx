import React from 'react';
import { ShoppingCart, User, Search, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Header: React.FC = () => {
  const { 
    cartItemsCount, 
    toggleCart, 
    user, 
    toggleLogin, 
    logout,
    currentView,
    setCurrentView 
  } = useStore();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => setCurrentView('products')}
          >
            <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-2 rounded-lg mr-3 group-hover:shadow-lg transition-all duration-300">
              <Search className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              ShopHub
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => setCurrentView('products')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                currentView === 'products'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Products
            </button>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-300 group"
            >
              <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              {cartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartItemsCount()}
                </span>
              )}
            </button>

            {/* User */}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 hidden sm:block">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={toggleLogin}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:block">Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};