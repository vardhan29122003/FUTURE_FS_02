import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, User, Order } from '../types';
import { products } from '../data/products';

interface StoreState {
  // Products
  products: Product[];
  filteredProducts: Product[];
  searchTerm: string;
  selectedCategory: string;
  priceRange: [number, number];
  
  // Cart
  cartItems: CartItem[];
  isCartOpen: boolean;
  
  // User
  user: User | null;
  isLoginOpen: boolean;
  orders: Order[];
  
  // UI
  currentView: 'products' | 'checkout';
  
  // Actions
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  filterProducts: () => void;
  
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  toggleLogin: () => void;
  
  setCurrentView: (view: 'products' | 'checkout') => void;
  addOrder: (order: Order) => void;
  
  // Computed
  cartTotal: () => number;
  cartItemsCount: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      products,
      filteredProducts: products,
      searchTerm: '',
      selectedCategory: 'All',
      priceRange: [0, 1000],
      
      cartItems: [],
      isCartOpen: false,
      
      user: null,
      isLoginOpen: false,
      orders: [],
      
      currentView: 'products',
      
      // Actions
      setSearchTerm: (term: string) => {
        set({ searchTerm: term });
        get().filterProducts();
      },
      
      setSelectedCategory: (category: string) => {
        set({ selectedCategory: category });
        get().filterProducts();
      },
      
      setPriceRange: (range: [number, number]) => {
        set({ priceRange: range });
        get().filterProducts();
      },
      
      filterProducts: () => {
        const { products, searchTerm, selectedCategory, priceRange } = get();
        
        let filtered = products.filter(product => {
          const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               product.description.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
          const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
          
          return matchesSearch && matchesCategory && matchesPrice;
        });
        
        set({ filteredProducts: filtered });
      },
      
      addToCart: (product: Product) => {
        const { cartItems } = get();
        const existingItem = cartItems.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            cartItems: cartItems.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({
            cartItems: [...cartItems, { product, quantity: 1 }]
          });
        }
      },
      
      removeFromCart: (productId: string) => {
        set({
          cartItems: get().cartItems.filter(item => item.product.id !== productId)
        });
      },
      
      updateCartItemQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        set({
          cartItems: get().cartItems.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          )
        });
      },
      
      clearCart: () => {
        set({ cartItems: [] });
      },
      
      toggleCart: () => {
        set({ isCartOpen: !get().isCartOpen });
      },
      
      login: async (email: string, password: string) => {
        // Simulate login
        if (email && password) {
          const user: User = {
            id: '1',
            name: email.split('@')[0],
            email
          };
          set({ user, isLoginOpen: false });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ user: null });
      },
      
      toggleLogin: () => {
        set({ isLoginOpen: !get().isLoginOpen });
      },
      
      setCurrentView: (view: 'products' | 'checkout') => {
        set({ currentView: view });
      },
      
      addOrder: (order: Order) => {
        set({ orders: [...get().orders, order] });
      },
      
      // Computed
      cartTotal: () => {
        return get().cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },
      
      cartItemsCount: () => {
        return get().cartItems.reduce((total, item) => total + item.quantity, 0);
      }
    }),
    {
      name: 'ecommerce-storage',
      partialize: (state) => ({ 
        cartItems: state.cartItems,
        user: state.user,
        orders: state.orders
      })
    }
  )
);