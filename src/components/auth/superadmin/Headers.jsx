// components/Header.jsx
import React from 'react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';

const Headers = () => {
  return (
    <header className="flex items-center justify-between mb-8 pb-4 animate-fadeIn">
      <div className="relative">
        <h1 className="text-2xl font-bold text-slate-800">
          Super Admin
        </h1>
        <div className="absolute -bottom-2 left-0 w-10 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" />
      </div>

      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative group">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search organizations, users, or documents..."
            className="w-96 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Notification Button */}
        <button className="relative p-2.5 hover:bg-slate-100 rounded-xl transition-all group">
          <Bell size={20} className="text-slate-600 group-hover:text-blue-500 transition-colors" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Profile Dropdown */}
        <div className="flex items-center gap-3 px-3 py-2 hover:bg-slate-100 rounded-xl cursor-pointer transition-all group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
            <User size={18} />
          </div>
          <span className="font-medium text-slate-700">Super Admin</span>
          <ChevronDown size={16} className="text-slate-500 group-hover:rotate-180 transition-transform" />
        </div>
      </div>
    </header>
  );
};

export default Headers;