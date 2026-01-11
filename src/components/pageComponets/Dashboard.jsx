import React from 'react';
import { Shield, LogOut, Building2, BarChart3, FileText, Bell, History, User } from 'lucide-react';
import DashboardContent from './DashboardTab';
import BMWTab from './BMWTab';
import DocumentsTab from './DocumentsTab';
import NotificationsTab from './NotificationsTab';
import HistoryTab from './HistoryTab';
import ProfileTab from './ProfileTab';

const Dashboard = ({ 
  loggedInUser, 
  activeTab, 
  selectedClinic, 
  clinics, 
  onLogout, 
  onTabChange, 
  onClinicChange 
}) => {
  const currentClinic = clinics.find(c => c.id === selectedClinic);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Shield className="w-6 h-6" /> Healthcare Compliance System
            </h1>
            <p className="text-sm text-gray-300">
              Welcome, {loggedInUser === 'superadmin' ? 'Super Admin' : 'Clinic Admin'}
            </p>
          </div>
          <button 
            onClick={onLogout} 
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Clinic Selector */}
        <div className="bg-gray-800 border-t border-gray-700 px-6 py-3">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium">Select Clinic:</span>
            <select 
              value={selectedClinic} 
              onChange={(e) => onClinicChange(e.target.value)} 
              className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {clinics.map(clinic => (
                <option key={clinic.id} value={clinic.id}>{clinic.name}</option>
              ))}
            </select>
            <span className="text-xs text-gray-400 ml-2">{currentClinic?.name}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-6 flex overflow-x-auto">
          <TabButton 
            icon={<BarChart3 className="w-4 h-4" />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => onTabChange('dashboard')} 
          />
          <TabButton 
            icon={<FileText className="w-4 h-4" />} 
            label="BMW Authorization" 
            active={activeTab === 'bmw'} 
            onClick={() => onTabChange('bmw')} 
          />
          <TabButton 
            icon={<FileText className="w-4 h-4" />} 
            label="Documents" 
            active={activeTab === 'documents'} 
            onClick={() => onTabChange('documents')} 
          />
          <TabButton 
            icon={<Bell className="w-4 h-4" />} 
            label="Notifications" 
            active={activeTab === 'notifications'} 
            onClick={() => onTabChange('notifications')} 
          />
          <TabButton 
            icon={<History className="w-4 h-4" />} 
            label="History/Logs" 
            active={activeTab === 'history'} 
            onClick={() => onTabChange('history')} 
          />
          <TabButton 
            icon={<User className="w-4 h-4" />} 
            label="Profile" 
            active={activeTab === 'profile'} 
            onClick={() => onTabChange('profile')} 
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && <DashboardContent clinic={currentClinic} />}
        {activeTab === 'bmw' && <BMWTab />}
        {activeTab === 'documents' && <DocumentsTab />}
        {activeTab === 'notifications' && <NotificationsTab />}
        {activeTab === 'history' && <HistoryTab />}
        {activeTab === 'profile' && <ProfileTab />}
      </div>
    </div>
  );
};

const TabButton = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick} 
    className={`py-4 px-2 font-medium transition border-b-2 whitespace-nowrap ${active ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}
  >
    {icon} <span className="inline ml-2">{label}</span>
  </button>
);

export default Dashboard;