// components/DocumentManagement.jsx
import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Download, Eye, MoreVertical, FileText } from 'lucide-react';

const DocumentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrg, setSelectedOrg] = useState('All Organizations');

  const documents = [
    {
      id: 1,
      name: 'HIPAA Compliance Certificate 2026',
      uploadedBy: 'Dr. Sarah Johnson',
      organization: 'St. Mary\'s Hospital',
      date: 'Feb 15, 2026',
      status: 'Approved',
      type: 'Compliance',
      size: '2.4 MB'
    },
    {
      id: 2,
      name: 'Staff Training Certificate - Emergency Procedures',
      uploadedBy: 'Michael Chen',
      organization: 'Central Medical Clinic',
      date: 'Feb 10, 2026',
      status: 'Expired',
      type: 'Training',
      size: '1.8 MB'
    },
    {
      id: 3,
      name: 'Medical Equipment License - MRI Machine',
      uploadedBy: 'Emily Rodriguez',
      organization: 'Riverside Healthcare',
      date: 'Feb 12, 2026',
      status: 'Approved',
      type: 'License',
      size: '3.2 MB'
    },
    {
      id: 4,
      name: 'Insurance Policy Document Q1 2026',
      uploadedBy: 'Dr. James Wilson',
      organization: 'Memorial Hospital',
      date: 'Jan 28, 2026',
      status: 'Pending',
      type: 'Insurance',
      size: '4.1 MB'
    },
    {
      id: 5,
      name: 'Fire Safety Inspection Report',
      uploadedBy: 'Linda Martinez',
      organization: 'Metro Health Center',
      date: 'Feb 14, 2026',
      status: 'Approved',
      type: 'Safety',
      size: '1.5 MB'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Expired': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Document Management</h2>
          <p className="text-sm text-slate-500 mt-1">Monitor and manage compliance documents across all organizations</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search documents by name, organization, or uploader..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        
        <div className="flex gap-3">
          <select className="px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20">
            <option>All Organizations</option>
            <option>St. Mary's Hospital</option>
            <option>Central Medical Clinic</option>
            <option>Riverside Healthcare</option>
          </select>
          
          <button className="flex items-center gap-2 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all group">
            <Filter size={18} className="text-slate-500 group-hover:text-blue-500" />
            <span className="text-sm font-medium">Advanced Filters</span>
            <ChevronDown size={16} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Document Name</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Uploaded By</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Organization</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr 
                  key={doc.id} 
                  className="border-b border-slate-100 hover:bg-slate-50 transition-all animate-slideIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-800">{doc.name}</div>
                        <div className="text-xs text-slate-400">{doc.type} • {doc.size}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-slate-700">{doc.uploadedBy}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{doc.organization}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{doc.date}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-slate-200 rounded-lg transition-all group">
                        <Eye size={16} className="text-slate-500 group-hover:text-blue-500" />
                      </button>
                      <button className="p-2 hover:bg-slate-200 rounded-lg transition-all group">
                        <Download size={16} className="text-slate-500 group-hover:text-green-500" />
                      </button>
                      <button className="p-2 hover:bg-slate-200 rounded-lg transition-all">
                        <MoreVertical size={16} className="text-slate-500" />
                      </button>
                    </div>
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

export default DocumentManagement;