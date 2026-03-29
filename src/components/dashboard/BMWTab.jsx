import React from 'react';
import { FileText } from 'lucide-react';
import { toast } from 'react-toastify';

const BMWTab = () => {
  const handleRenew = () => {
    toast.info('Renewal process initiated');
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">BMW Authorization Tracking</h2>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <InfoItem label="Authorization Number" value="TN/BMW/2024/001" />
          <InfoItem label="Status" value="Expiring Soon" color="text-yellow-400" />
          <InfoItem label="Authorization Start Date" value="01-Jan-2022" />
          <InfoItem label="Expiry Date" value="31-Dec-2024" color="text-yellow-400" />
          <InfoItem label="Days Until Renewal" value="45 Days" color="text-orange-400" />
          <InfoItem label="Last Updated" value="15-Nov-2024" />
        </div>
      </div>

      <button 
        onClick={handleRenew}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition flex items-center gap-2"
      >
        <FileText className="w-4 h-4" /> Renew Authorization
      </button>
    </div>
  );
};

const InfoItem = ({ label, value, color = '' }) => (
  <div>
    <p className="text-gray-400 text-sm">{label}</p>
    <p className={`font-semibold text-lg mt-2 ${color}`}>{value}</p>
  </div>
);

export default BMWTab;