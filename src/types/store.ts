export interface ProductVariant {
  id: string;
  name: string;
  priceModifier?: number;
}

export interface Product {
  id: string;
  name: string;
  artist: string;
  price: number;
  salePrice?: number;
  category: string;
  image: string;
  additionalImages?: string[];
  description: string;
  dimensions?: string;
  medium?: string;
  year?: number;
  inStock: boolean;
  stockCount: number;
  featured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  badge?: string;
  sizes?: string[];
  frames?: string[];
  rating: number;
  reviewsCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedFrame?: string;
}

export type PaymentMethod = 'credit_card' | 'paypal' | 'apple_pay' | 'google_pay';

export interface ShippingDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod?: PaymentMethod;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  shippingDetails: ShippingDetails;
  paymentMethod: PaymentMethod;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
}
