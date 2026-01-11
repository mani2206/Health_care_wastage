import React from 'react';
import { CheckCircle, AlertCircle, Clock, FileText } from 'lucide-react';

const DashboardTab = ({ clinic }) => {
  const getBMWExpiryInfo = (clinic) => {
    if (!clinic) return { days: '-', color: 'text-gray-400', message: '' };

    if (clinic.form2Status === 'Pending' && clinic.form2DaysUntilExpiry < 30) {
      return {
        days: clinic.form2DaysUntilExpiry,
        color: 'text-red-400',
        message: 'High Risk – Immediate action required'
      };
    }

    if (clinic.form2DaysUntilExpiry <= 45) {
      return {
        days: clinic.form2DaysUntilExpiry,
        color: 'text-yellow-400',
        message: 'Renewal required soon'
      };
    }

    return {
      days: clinic.form2DaysUntilExpiry,
      color: 'text-green-400',
      message: 'All good'
    };
  };

  const getRiskLevelInfo = (riskLevel) => {
    if (riskLevel === 'low') {
      return { level: '🟢 Low', bg: 'bg-green-900', text: 'text-green-400', description: 'All systems compliant' };
    } else if (riskLevel === 'medium') {
      return { level: '🟡 Medium', bg: 'bg-yellow-900', text: 'text-yellow-400', description: 'Some attention needed' };
    } else {
      return { level: '🔴 High', bg: 'bg-red-900', text: 'text-red-400', description: 'Immediate action required' };
    }
  };

  const bmwInfo = getBMWExpiryInfo(clinic);
  const riskInfo = getRiskLevelInfo(clinic?.riskLevel || 'medium');

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Compliance Dashboard</h2>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatusCard 
          title="Overall Status" 
          value="ACTIVE" 
          icon={<CheckCircle className="w-5 h-5 text-green-500" />}
          color="text-green-400"
          description="All documents compliant"
        />

        <div className={`${riskInfo.bg} border border-gray-700 rounded-lg p-6`}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Compliance Risk Level</h3>
            <AlertCircle className={`w-5 h-5 ${riskInfo.text}`} />
          </div>
          <p className={`text-3xl font-bold ${riskInfo.text}`}>{riskInfo.level}</p>
          <p className="text-xs text-gray-400 mt-2">{riskInfo.description}</p>
        </div>

        <StatusCard 
          title="BMW Auth. Expiry" 
          value={`${bmwInfo.days} Days`}
          icon={<Clock className="w-5 h-5 text-yellow-500" />}
          color={bmwInfo.color}
          description={bmwInfo.message}
        />

        <StatusCard 
          title="Documents" 
          value="6/8"
          icon={<FileText className="w-5 h-5 text-blue-500" />}
          color="text-blue-400"
          description="2 documents pending"
        />
      </div>

      {/* Compliance Reminders */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-orange-500" /> Compliance Reminders
        </h3>
        <div className="space-y-3">
          <ReminderItem 
            title="BMW Authorization Expiring" 
            message="Renewal due in 45 days - Action required" 
            color="yellow"
          />
          <ReminderItem 
            title="Annual Report Submission" 
            message="Due in 60 days - Form II required" 
            color="yellow"
          />
        </div>
      </div>
    </div>
  );
};

const StatusCard = ({ title, value, icon, color, description }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
      {icon}
    </div>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
    <p className="text-xs text-gray-500 mt-2">{description}</p>
  </div>
);

const ReminderItem = ({ title, message, color }) => (
  <div className="bg-gray-700 p-4 rounded border border-yellow-600/30">
    <p className="font-medium text-yellow-400">{title}</p>
    <p className="text-sm text-gray-300 mt-1">{message}</p>
  </div>
);

export default DashboardTab;