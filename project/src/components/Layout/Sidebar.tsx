import React from 'react';
import { 
  Home, 
  ShoppingBag, 
  Users, 
  Package, 
  BarChart3, 
  Settings,
  UserCheck,
  Store,
  Heart,
  Clock
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const { user } = useAuth();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'users', label: 'Users', icon: Users },
          { id: 'vendors', label: 'Vendors', icon: Store },
          { id: 'products', label: 'Products', icon: Package },
          { id: 'orders', label: 'Orders', icon: ShoppingBag },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      case 'vendor':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'products', label: 'My Products', icon: Package },
          { id: 'orders', label: 'Orders', icon: ShoppingBag },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'profile', label: 'Profile', icon: UserCheck },
        ];
      case 'customer':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'orders', label: 'My Orders', icon: ShoppingBag },
          { id: 'wishlist', label: 'Wishlist', icon: Heart },
          { id: 'history', label: 'Order History', icon: Clock },
          { id: 'profile', label: 'Profile', icon: UserCheck },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 capitalize">
          {user?.role} Dashboard
        </h2>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                activeView === item.id
                  ? 'bg-blue-50 border-r-4 border-blue-600 text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}