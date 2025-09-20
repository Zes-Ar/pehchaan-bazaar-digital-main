import React, { useState } from 'react';
import { X, Eye, EyeOff, User, Store } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  userType: 'buyer' | 'seller';
  onModeChange: (mode: 'login' | 'signup') => void;
  onUserTypeChange: (type: 'buyer' | 'seller') => void;
  onSubmit?: (formData: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  mode, 
  userType, 
  onModeChange, 
  onUserTypeChange,
  onSubmit
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      // Fallback for demo authentication
      console.log(`${mode} as ${userType}:`, formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/50 backdrop-blur-md p-4">
      <div className="card-warm w-full max-w-md mx-auto p-4 sm:p-6 animate-fade-in max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-playfair font-bold text-gray-800 dark:text-foreground">
            {mode === 'login' ? 'Welcome Back' : 'Join Pehchaan'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Type Toggle */}
        <div className="flex rounded-lg bg-muted p-1 mb-4 sm:mb-6">
          <button
            onClick={() => onUserTypeChange('buyer')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md transition-all ${
              userType === 'buyer' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-gray-600 dark:text-muted-foreground hover:text-gray-800 dark:hover:text-foreground'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">Buyer</span>
          </button>
          <button
            onClick={() => onUserTypeChange('seller')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md transition-all ${
              userType === 'seller' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-gray-600 dark:text-muted-foreground hover:text-gray-800 dark:hover:text-foreground'
            }`}
          >
            <Store className="w-4 h-4" />
            <span className="text-sm font-medium">Artisan</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                {userType === 'buyer' ? 'Full Name' : 'Artisan Name'}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={userType === 'buyer' ? 'Enter your full name' : 'e.g., Ramesh Kumhar'}
                required
              />
            </div>
          )}

          {mode === 'signup' && userType === 'seller' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                Workshop/Business Name
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Rajasthan Blue Pottery Co."
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
              required
            />
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="+91 XXXXX XXXXX"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 pr-10 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full btn-saffron py-3 font-medium"
          >
            {mode === 'login' 
              ? `Sign In as ${userType === 'buyer' ? 'Buyer' : 'Artisan'}` 
              : `Create ${userType === 'buyer' ? 'Buyer' : 'Artisan'} Account`
            }
          </button>
        </form>

        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-muted-foreground">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => onModeChange(mode === 'login' ? 'signup' : 'login')}
              className="ml-1 text-primary hover:underline font-medium"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};