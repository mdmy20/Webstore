import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem, Order, ShippingDetails } from '../types/store';
import { PRODUCTS, CATEGORIES } from '../data/products';

interface StoreContextType {
  products: Product[];
  categories: typeof CATEGORIES;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedFrame?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string, selectedFrame?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string, selectedFrame?: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  orders: Order[];
  placeOrder: (shippingDetails: ShippingDetails) => Order;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Load cart from localStorage if available
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('follow_art_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('follow_art_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedSize?: string,
    selectedFrame?: string
  ) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === (selectedSize || product.sizes?.[0]) &&
          item.selectedFrame === (selectedFrame || product.frames?.[0])
      );

      const size = selectedSize || product.sizes?.[0];
      const frame = selectedFrame || product.frames?.[0];

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            product,
            quantity,
            selectedSize: size,
            selectedFrame: frame,
          },
        ];
      }
    });

    showToast(`Added "${product.name}" to cart`);
  };

  const removeFromCart = (productId: string, selectedSize?: string, selectedFrame?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            (selectedSize === undefined || item.selectedSize === selectedSize) &&
            (selectedFrame === undefined || item.selectedFrame === selectedFrame)
          )
      )
    );
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    selectedSize?: string,
    selectedFrame?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize, selectedFrame);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        (selectedSize === undefined || item.selectedSize === selectedSize) &&
        (selectedFrame === undefined || item.selectedFrame === selectedFrame)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => {
    const price = item.product.salePrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const placeOrder = (shippingDetails: ShippingDetails): Order => {
    const subtotal = cartTotal;
    const shippingFee = subtotal > 500 ? 0 : 35;
    const total = subtotal + shippingFee;

    const newOrder: Order = {
      id: `FA-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...cart],
      subtotal,
      shippingFee,
      total,
      shippingDetails,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      status: 'Processing',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        products: PRODUCTS,
        categories: CATEGORIES,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        isCartOpen,
        setIsCartOpen,
        selectedProduct,
        setSelectedProduct,
        isAccountModalOpen,
        setIsAccountModalOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        orders,
        placeOrder,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
