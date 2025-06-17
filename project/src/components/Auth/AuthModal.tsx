import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { KalartzLogo } from '../UI/KalartzLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [userType, setUserType] = useState<'customer' | 'vendor' | 'admin'>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    businessName: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const success = await login(formData.email, formData.password, userType);
        if (success) {
          onClose();
        } else {
          setError('Invalid credentials');
        }
      } else {
        const success = await register(
          {
            email: formData.email,
            name: formData.name,
          },
          userType as 'customer' | 'vendor'
        );
        if (success) {
          if (userType === 'vendor') {
            setError('Vendor registration successful! Please wait for admin approval.');
          } else {
            onClose();
          }
        } else {
          setError('Registration failed');
        }
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ email: '', password: '', name: '', businessName: '' });
    setError('');
  };

  const handleModeChange = (newMode: 'login' | 'register') => {
    setMode(newMode);
    resetForm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl transform transition-all duration-300">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <KalartzLogo size="sm" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {mode === 'login' ? 'Welcome Back' : 'Join Us'}
              </h2>
              <p className="text-gray-600 text-sm">
                {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Account Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['customer', 'vendor', 'admin'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setUserType(type as any)}
                className={`px-4 py-3 rounded-xl text-sm font-medium capitalize transition-all duration-300 ${
                  userType === type
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-105'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
              />
            </div>
          )}

          {mode === 'register' && userType === 'vendor' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name
              </label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 transform hover:scale-105 shadow-lg font-medium"
          >
            {isLoading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => handleModeChange(mode === 'login' ? 'register' : 'login')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-300"
          >
            {mode === 'login' 
              ? "Don't have an account? Join us" 
              : "Already have an account? Sign in"
            }
          </button>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <KalartzLogo size="sm" className="mr-2" />
            Demo Credentials:
          </h4>
          <div className="text-xs text-gray-600 space-y-1">
            <div>Admin: admin@kalartz.com</div>
            <div>Vendor: vendor@kalartz.com</div>
            <div>Customer: customer@kalartz.com</div>
            <div className="font-medium text-blue-600">Password: any password</div>
          </div>
        </div>
      </div>
    </div>
  );
}