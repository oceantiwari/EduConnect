import React, { useState } from 'react';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { role: 'Parent', email: 'parent@demo.com', color: 'bg-sky-400' },
    { role: 'Teacher', email: 'teacher@demo.com', color: 'bg-emerald-400' },
    { role: 'School Admin', email: 'admin@demo.com', color: 'bg-violet-400' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-sky-400 to-emerald-400 rounded-full shadow-md mb-4 animate-bounce-slow">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-1 tracking-tight">KidSafe</h1>
          <p className="text-gray-600 text-sm">Smart Kids Safety & Attendance</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-400 hover:text-sky-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm shadow-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-sky-400 to-emerald-400 text-white py-3 rounded-xl font-semibold shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Demo Accounts */}
        <div className="mt-8 bg-white rounded-3xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Demo Accounts</h3>
          <div className="space-y-3">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                onClick={() => {
                  setEmail(account.email);
                  setPassword('demo123');
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all group"
              >
                <div className={`w-4 h-4 rounded-full ${account.color} group-hover:scale-110 transition-transform`} />
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{account.role}</p>
                  <p className="text-sm text-gray-500">{account.email}</p>
                </div>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Password for all demo accounts:{' '}
            <code className="bg-gray-100 px-2 py-1 rounded">demo123</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
