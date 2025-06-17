export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'vendor' | 'admin';
  avatar?: string;
  createdAt: string;
  isActive: boolean;
}

export interface Customer extends User {
  role: 'customer';
  address?: Address;
  orders: string[];
}

export interface Vendor extends User {
  role: 'vendor';
  businessName: string;
  businessAddress: Address;
  isApproved: boolean;
  products: string[];
  totalSales: number;
}

export interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  vendorId: string;
  vendorName: string;
  stock: number;
  rating: number;
  reviews: Review[];
  createdAt: string;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}