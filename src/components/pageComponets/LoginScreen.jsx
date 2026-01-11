import React, { useState } from 'react';
import { Shield, Lock, User, UserCog, AlertCircle } from 'lucide-react';

const LoginScreen = ({ onLogin }) => {
  const [userType, setUserType] = useState('admin');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const users = {
    admin: { username: 'admin', password: 'admin123' },
    superadmin: { username: 'superadmin', password: 'super123' }
  };

  const handleLogin = () => {
    setError('');
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password.');
      return;
    }
    const validUser = users[userType];
    if (credentials.username === validUser.username && credentials.password === validUser.password) {
      onLogin(userType);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-blue-400" /> Healthcare Compliance
          </h1>
          <p className="text-gray-400">Medical Waste Management System</p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button 
              onClick={() => setUserType('admin')} 
              className={`py-3 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2 ${userType === 'admin' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              <User className="w-4 h-4" /> Admin
            </button>
            <button 
              onClick={() => setUserType('superadmin')} 
              className={`py-3 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2 ${userType === 'superadmin' ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              <UserCog className="w-4 h-4" /> Super Admin
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                <input 
                  type="text" 
                  value={credentials.username} 
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} 
                  onKeyPress={handleKeyPress} 
                  className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
                  placeholder="Enter username" 
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                <input 
                  type="password" 
                  value={credentials.password} 
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} 
                  onKeyPress={handleKeyPress} 
                  className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
                  placeholder="Enter password" 
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-900 border border-red-700 rounded-lg p-3 text-red-300 text-sm flex gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button 
              onClick={handleLogin} 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 mt-6"
            >
              <Lock className="w-4 h-4" /> Sign In
            </button>
          </div>

          <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
            <p className="text-xs font-medium text-gray-400 mb-2">Demo Credentials:</p>
            <div className="text-xs text-gray-300 space-y-1">
              <p>✓ Admin: admin / admin123</p>
              <p>✓ Super Admin: superadmin / super123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;