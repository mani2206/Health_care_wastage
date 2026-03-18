// components/AuditLog.jsx
import React, { useState } from 'react';
import { Search, Filter, Download, Calendar, Tag, ChevronDown, Globe } from 'lucide-react';

const AuditLog = () => {
  const [dateRange, setDateRange] = useState('Today');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const auditLogs = [
    {
      id: 1,
      action: 'Document Uploaded',
      category: 'Document Management',
      details: 'HIPAA Compliance Certificate 2026',
      user: 'Dr. Sarah Johnson',
      organization: 'St. Mary\'s Hospital',
      ip: '192.168.1.45',
      time: '2 minutes ago',
      icon: '📄'
    },
    {
      id: 2,
      action: 'User Account Created',
      category: 'User Management',
      details: 'New user account for Dr. Michael Brown',
      user: 'System Admin',
      organization: 'Central Medical Clinic',
      ip: '10.0.0.12',
      time: '15 minutes ago',
      icon: '👤'
    },
    {
      id: 3,
      action: 'Document Approved',
      category: 'Compliance Review',
      details: 'Medical Equipment License – MRI Machine',
      user: 'Emily Rodriguez',
      organization: 'Riverside Healthcare',
      ip: '172.16.0.89',
      time: '1 hour ago',
      icon: '✅'
    },
    {
      id: 4,
      action: 'Permission Changed',
      category: 'Security',
      details: 'Modified access rights for Clinical Staff',
      user: 'Michael Chen',
      organization: 'Central Medical Clinic',
      ip: '192.168.1.100',
      time: '3 hours ago',
      icon: '🔐'
    },
    {
      id: 5,
      action: 'Document Deleted',
      category: 'Document Management',
      details: 'Old compliance report - Q4 2025',
      user: 'Linda Martinez',
      organization: 'Metro Health Center',
      ip: '10.0.0.45',
      time: '5 hours ago',
      icon: '🗑️'
    }
  ];

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Document Management': return 'bg-blue-100 text-blue-700';
      case 'User Management': return 'bg-purple-100 text-purple-700';
      case 'Compliance Review': return 'bg-green-100 text-green-700';
      case 'Security': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-bold text-teal-700">Audit Log</h2>
        <p className="text-sm text-slate-500 mt-1">Complete audit trail of all system activities and events</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by user, action, or details..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          {/* Date Range Filter */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
              <Calendar size={18} className="text-slate-500" />
              <span className="text-sm font-medium text-black">{dateRange}</span>
              <ChevronDown size={16} className="text-slate-400" />
            </button>
          </div>

          {/* Category Filter */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
              <Tag size={18} className="text-slate-500" />
              <span className="text-sm font-medium text-black">Action Category</span>
              <ChevronDown size={16} className="text-slate-400" />
            </button>
          </div>

          {/* Export Buttons */}
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all group">
            <Download size={18} className="text-slate-500 group-hover:text-blue-500" />
            <span className="text-sm font-medium text-black">Export CSV</span>
          </button>
          
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all group">
            <Download size={18} className="text-slate-500 group-hover:text-red-500" />
            <span className="text-sm font-medium text-black">Export PDF</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all hover:scale-105">
            <Globe size={18} />
            <span className="text-sm font-medium text-black">All Organizations</span>
          </button>
        </div>
      </div>

      {/* Audit Log Timeline */}
      <div className="space-y-4">
        {auditLogs.map((log, index) => (
          <div 
            key={log.id} 
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 animate-slideIn border-l-4 border-l-blue-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="text-2xl">{log.icon}</div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-slate-800">{log.action}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(log.category)}`}>
                    {log.category}
                  </span>
                  <span className="text-xs text-slate-400">{log.time}</span>
                </div>
                
                <p className="text-slate-600 mb-3">{log.details}</p>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">User:</span>
                    <span className="font-medium text-slate-700">{log.user}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Organization:</span>
                    <span className="font-medium text-slate-700">{log.organization}</span>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <span className="text-slate-400">IP:</span>
                    <code className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">
                      {log.ip}
                    </code>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-medium text-slate-600 hover:text-blue-600">
          Load More Activities
        </button>
      </div>
    </div>
  );
};

export default AuditLog;