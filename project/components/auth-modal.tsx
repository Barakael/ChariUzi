'use client';

import { useState } from 'react';
import { X, Mail, Lock, User, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'register';
}

export function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'register'>(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    dateOfBirth: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`relative p-8 text-white rounded-t-2xl ${
          mode === 'signin' 
            ? 'bg-gradient-to-r from-sky-500 to-sky-600' 
            : 'bg-gradient-to-r from-emerald-500 to-emerald-600'
        }`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <h2 className="text-3xl font-bold mb-2">
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm opacity-90">
            {mode === 'signin' 
              ? 'Sign in to your account' 
              : 'Join us for amazing experiences'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-3 w-5 h-5 ${
                mode === 'signin' ? 'text-sky-500' : 'text-emerald-500'
              }`} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

       

         
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-3 w-5 h-5 ${
                mode === 'signin' ? 'text-sky-500' : 'text-emerald-500'
              }`} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          {mode === 'register' && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-emerald-500" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>
          )}

          {mode === 'signin' && (
            <div className="mb-6 text-right">
              <button
                type="button"
                className="text-sm text-sky-600 hover:text-sky-700 font-semibold transition-colors"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-2 rounded-lg font-bold text-white transition-all mb-4 ${
              mode === 'signin'
                ? 'bg-gradient-to-r from-sky-500 to-sky-600 hover:shadow-lg hover:shadow-sky-200'
                : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow-lg hover:shadow-emerald-200'
            }`}
          >
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full py-2.5 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 hover:border-gray-300 transition-colors mb-4"
          >
            Continue with Google
          </button>

          <p className="text-center text-gray-600">
            {mode === 'signin' ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-sky-600 font-bold hover:text-sky-700 transition-colors"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </form>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 rounded-b-2xl">
          <p className="text-xs text-gray-500 text-center">
            By {mode === 'signin' ? 'signing in' : 'creating an account'}, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
