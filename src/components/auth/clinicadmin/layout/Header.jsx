// src/components/layout/Header.jsx
import React from 'react';
import { Bell } from 'lucide-react';
import SearchBar from '../common/SearchBar';
import NotificationBell from '../common/NotificationBell';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <h2 className="text-xl font-semibold">Dashboard</h2>
      </div>

      <div className="flex items-center gap-6">
        <SearchBar />
        <NotificationBell count={3} />
        <div className="text-sm text-gray-600">
          Thursday, Feb 26, 2026
        </div>
      </div>
    </header>
  );
}