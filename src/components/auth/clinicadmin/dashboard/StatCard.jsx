import React from 'react';

function StatCard({ icon: Icon, title, value, change, color = "blue" }) {
  const colorMap = {
    blue:   "bg-blue-50 text-blue-600",
    green:  "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-black">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorMap[color] || colorMap.blue}`}>
          <Icon size={24} />
        </div>
      </div>
      <p className="mt-4">
        <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
        <span className="text-sm text-gray-500 ml-1">this month</span>
      </p>
    </div>
  );
}

export default StatCard;