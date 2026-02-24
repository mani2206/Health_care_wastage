// import React from 'react';
// import { CheckCircle, AlertCircle, Clock, FileText } from 'lucide-react';


// const DashboardTab = ({ clinic }) => {
//   const getBMWExpiryInfo = () => {
//     if (!clinic) return { days: '-', color: 'text-gray-400', message: '' };

//     if (clinic.form2Status === 'Pending' && clinic.form2DaysUntilExpiry < 30) {
//       return {
//         days: clinic.form2DaysUntilExpiry,
//         color: 'text-red-400',
//         message: 'High Risk – Immediate action required'
//       };
//     }

//     if (clinic.form2DaysUntilExpiry <= 45) {
//       return {
//         days: clinic.form2DaysUntilExpiry,
//         color: 'text-yellow-400',
//         message: 'Renewal required soon'
//       };
//     }

//     return {
//       days: clinic.form2DaysUntilExpiry,
//       color: 'text-green-400',
//       message: 'All good'
//     };
//   };

//   const getRiskLevelInfo = () => {
//     const riskLevel = clinic?.riskLevel || 'medium';
//     if (riskLevel === 'low') {
//       return { level: '🟢 Low', bg: 'bg-green-900', text: 'text-green-400', description: 'All systems compliant' };
//     } else if (riskLevel === 'medium') {
//       return { level: '🟡 Medium', bg: 'bg-yellow-900', text: 'text-yellow-400', description: 'Some attention needed' };
//     } else {
//       return { level: '🔴 High', bg: 'bg-red-900', text: 'text-red-400', description: 'Immediate action required' };
//     }
//   };

//   const bmwInfo = getBMWExpiryInfo();
//   const riskInfo = getRiskLevelInfo();

//   return (
//     <>
//       <div>
//         <h2 className="text-3xl font-bold mb-8">Compliance Dashboard</h2>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <StatusCard
//             title="Overall Status"
//             value="ACTIVE"
//             icon={<CheckCircle className="w-5 h-5 text-green-500" />}
//             color="text-green-400"
//             description="All documents compliant"
//           />

//           <div className={`${riskInfo.bg} border border-gray-700 rounded-lg p-6`}>
//             <div className="flex justify-between items-start mb-4">
//               <h3 className="text-gray-400 text-sm font-medium">Compliance Risk Level</h3>
//               <AlertCircle className={`w-5 h-5 ${riskInfo.text}`} />
//             </div>
//             <p className={`text-3xl font-bold ${riskInfo.text}`}>{riskInfo.level}</p>
//             <p className="text-xs text-gray-400 mt-2">{riskInfo.description}</p>
//           </div>

//           <StatusCard
//             title="BMW Auth. Expiry"
//             value={`${bmwInfo.days} Days`}
//             icon={<Clock className="w-5 h-5 text-yellow-500" />}
//             color={bmwInfo.color}
//             description={bmwInfo.message}
//           />

//           <StatusCard
//             title="Documents"
//             value="6/8"
//             icon={<FileText className="w-5 h-5 text-blue-500" />}
//             color="text-blue-400"
//             description="2 documents pending"
//           />
//         </div>

//         <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
//           <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//             <AlertCircle className="w-5 h-5 text-orange-500" /> Compliance Reminders
//           </h3>
//           <div className="space-y-3">
//             <ReminderItem
//               title="BMW Authorization Expiring"
//               message="Renewal due in 45 days - Action required"
//             />
//             <ReminderItem
//               title="Annual Report Submission"
//               message="Due in 60 days - Form II required"
//             />
//           </div>
//         </div>
//       </div>

      
//     </>
//   );
// };

// const StatusCard = ({ title, value, icon, color, description }) => (
//   <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
//     <div className="flex justify-between items-start mb-4">
//       <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
//       {icon}
//     </div>
//     <p className={`text-3xl font-bold ${color}`}>{value}</p>
//     <p className="text-xs text-gray-500 mt-2">{description}</p>
//   </div>
// );

// const ReminderItem = ({ title, message }) => (
//   <div className="bg-gray-700 p-4 rounded border border-yellow-600/30">
//     <p className="font-medium text-yellow-400">{title}</p>
//     <p className="text-sm text-gray-300 mt-1">{message}</p>
//   </div>
// );

// export default DashboardTab;

import React from "react";
import {
  Bell,
  FileText,
  ClipboardCheck,
  AlertTriangle,
  Info,
} from "lucide-react";

const DashboardTab = ({ clinic }) => {
  return (
    <div className="p-6 md:p-10 bg-white">
      {/* Top Header */}
      <h2 className="text-3xl font-bold text-gray-700">
        Compliance Dashboard
      </h2>
      <p className="text-gray-500 mb-10">
        Manage Regulatory Documents And Track Upcoming Deadlines.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <DashCard
          title="Total Documents"
          value="24"
          icon={<FileText className="w-6 h-6 text-teal-500" />}
        />

        <DashCard
          title="Pending Review"
          value="2"
          icon={<ClipboardCheck className="w-6 h-6 text-blue-500" />}
        />

        <DashCard
          title="Critical Alerts"
          value="2"
          icon={<Bell className="w-6 h-6 text-red-400" />}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Urgent Alerts */}
        <div className="border rounded-xl p-6 shadow-sm bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="flex items-center gap-2 text-gray-700 font-semibold">
              <Info className="text-blue-500 w-5 h-5" /> Urgent Alerts
            </h3>
            <span className="bg-red-100 text-red-500 px-3 py-1 rounded text-sm font-medium">
              Action Required
            </span>
          </div>

          <AlertItem
            icon={<AlertTriangle className="text-red-500" />}
            title="HIPAA Risk Assessment 2024"
            message="Expires in 2 days • Needs Review"
          />

          <AlertItem
            icon={<div className="w-3 h-3 bg-yellow-400 rounded-full" />}
            title="Employee Vaccination Records"
            message="Expires in 2 days • Needs Review"
          />

          <AlertItem
            icon={<div className="w-3 h-3 bg-yellow-400 rounded-full" />}
            title="Employee Vaccination Records"
            message="Expires in 2 days • Needs Review"
          />
        </div>

        {/* Compliance Circular Chart */}
        <div className="border rounded-xl p-6 shadow-sm bg-white flex flex-col justify-center items-center">
          <h3 className="text-gray-700 font-semibold mb-4">
            Overall Compliance Status
          </h3>

          {/* Circle Chart */}
          <div className="w-48 h-48 rounded-full border-8 border-teal-400 border-t-gray-200 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-teal-600">94%</p>
              <p className="text-gray-500 text-sm">Healthy</p>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-4 w-64">
            Here’s The Text Exactly As Shown:  
            Your Clinic Is Meeting Most Regulatory Requirements.  
            3 Documents Need Immediate Attention To Maintain Status.
          </p>
        </div>
      </div>
    </div>
  );
};

/* ---- Reusable Components ---- */

const DashCard = ({ title, value, icon }) => (
  <div className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition">
    <div className="flex items-center gap-3 mb-3">
      {icon}
      <p className="text-gray-600 font-medium">{title}</p>
    </div>
    <p className="text-3xl font-bold text-teal-600">{value}</p>
  </div>
);

const AlertItem = ({ icon, title, message }) => (
  <div className="flex items-start gap-3 py-3 border-b last:border-0">
    <div className="mt-1">{icon}</div>
    <div className="flex-1">
      <p className="font-medium text-gray-700">{title}</p>
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
    <button className="text-sm text-blue-500 hover:underline">View</button>
  </div>
);

export default DashboardTab;
