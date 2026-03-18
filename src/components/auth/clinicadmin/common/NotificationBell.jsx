import React from 'react';
import { Bell } from 'lucide-react';

function NotificationBell({ count = 0 }) {
  return (
    <div className="relative cursor-pointer">
      <Bell size={22} className="text-gray-600 hover:text-gray-900 transition-colors" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );
}

export default NotificationBell;