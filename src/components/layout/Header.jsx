import React from 'react';
import { Shield, LogOut, Building2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { CLINICS } from '../../utils/constants';

const Header = () => {
  const { user, logout, selectedClinic, setSelectedClinic } = useAuth();
  const currentClinic = CLINICS.find(c => c.id === selectedClinic);

  return (
    <>
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Shield className="w-6 h-6" /> Healthcare Compliance Systems
            </h1>
            <p className="text-sm text-gray-300">
              {/* Welcome, {user?.role === 'superadmin' ? 'Super Admin' : 'Clinic Admin'} */}
              Welcome Clinic
            </p>
          </div>
          <button 
            onClick={logout} 
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

    </>
  );
};

export default Header;
