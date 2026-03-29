// components/UserManagement.jsx
import React, { useState } from 'react';
import { Search, Filter, ChevronDown, MoreVertical, UserPlus } from 'lucide-react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrg, setSelectedOrg] = useState('All Organizations');

  const users = [
    {
      id: 1,
      initials: 'DSJ',
      name: 'Dr. Sarah Johnson',
      organization: 'St. Mary\'s Hospital',
      role: 'Administrator',
      status: 'Active',
      lastLogin: '2 hours ago',
      documents: 45,
      avatar: 'bg-purple-100 text-purple-600'
    },
    {
      id: 2,
      initials: 'MC',
      name: 'Michael Chen',
      organization: 'Central Medical Clinic',
      role: 'Compliance Officer',
      status: 'Active',
      lastLogin: '5 hours ago',
      documents: 28,
      avatar: 'bg-blue-100 text-blue-600'
    },
    {
      id: 3,
      initials: 'ER',
      name: 'Emily Rodriguez',
      organization: 'Riverside Healthcare',
      role: 'Staff Member',
      status: 'Active',
      lastLogin: '1 day ago',
      documents: 12,
      avatar: 'bg-green-100 text-green-600'
    },
    {
      id: 4,
      initials: 'DJW',
      name: 'Dr. James Wilson',
      organization: 'Memorial Hospital',
      role: 'Administrator',
      status: 'Inactive',
      lastLogin: '2 weeks ago',
      documents: 67,
      avatar: 'bg-orange-100 text-orange-600'
    },
    {
      id: 5,
      initials: 'LM',
      name: 'Linda Martinez',
      organization: 'Metro Health Center',
      role: 'Staff Member',
      status: 'Active',
      lastLogin: '30 minutes ago',
      documents: 19,
      avatar: 'bg-pink-100 text-pink-600'
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
          <p className="text-sm text-slate-500 mt-1">Manage users across all organizations</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all hover:scale-105">
          <UserPlus size={18} />
          <span>Add User</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or organization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all group">
          <Filter size={18} className="text-slate-500 group-hover:text-blue-500" />
          <span className="text-sm font-medium">Advanced Filters</span>
          <ChevronDown size={16} className="text-slate-400" />
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">User</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Organization</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Role</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Last Login</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Documents</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr 
                  key={user.id} 
                  className="border-b border-slate-100 hover:bg-slate-50 transition-all animate-slideIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${user.avatar} rounded-lg flex items-center justify-center font-semibold`}>
                        {user.initials}
                      </div>
                      <div>
                        <div className="font-medium text-slate-800">{user.name}</div>
                        <div className="text-sm text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{user.organization}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'Administrator' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'Compliance Officer' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`flex items-center gap-1.5`}>
                      <span className={`w-2 h-2 rounded-full ${
                        user.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-slate-400'
                      }`} />
                      <span className="text-sm">{user.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">{user.lastLogin}</td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-slate-800">{user.documents}</span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="p-2 hover:bg-slate-200 rounded-lg transition-all">
                      <MoreVertical size={16} className="text-slate-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;