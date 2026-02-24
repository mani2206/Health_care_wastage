// components/Dashboard.jsx
// import React from 'react';
// import { 
//   Building2, 
//   Users, 
//   FileText, 
//   Clock, 
//   AlertTriangle,
//   TrendingUp,
//   TrendingDown
// } from 'lucide-react';

// const SuperAdminDashboard = () => {
//   const stats = [
//     {
//       title: 'Total Organizations',
//       value: '247',
//       change: '+12',
//       trend: 'up',
//       icon: Building2,
//       color: 'blue'
//     },
    
//     {
//       title: 'Total Documents',
//       value: '18,294',
//       change: '+1,024',
//       trend: 'up',
//       icon: FileText,
//       color: 'purple'
//     },
//   ];

//   const expiringDocs = [
//     { period: 'Within 7 days', count: 23, color: 'red' },
//     { period: 'Within 15 days', count: 45, color: 'orange' },
//     { period: 'Within 30 days', count: 87, color: 'yellow' }
//   ];

//   const highRiskOrgs = [
//     { name: 'St. Mary\'s Hospital', riskScore: 87, issues: 12 },
//     { name: 'Central Medical Clinic', riskScore: 76, issues: 8 },
//     { name: 'Riverside Healthcare', riskScore: 68, issues: 6 }
//   ];

//   return (
//     <div className="space-y-6 animate-fadeIn">
//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 animate-slideIn"
//             style={{ animationDelay: `${index * 100}ms` }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className={`p-3 bg-${stat.color}-100 rounded-xl`}>
//                 <stat.icon size={24} className={`text-${stat.color}-600`} />
//               </div>
//               <span className={`flex items-center gap-1 text-sm ${
//                 stat.trend === 'up' ? 'text-green-600' : 'text-orange-600'
//               }`}>
//                 {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
//                 {stat.change}
//               </span>
//             </div>
//             <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
//             <p className="text-sm text-slate-500 mt-1">{stat.title}</p>
//           </div>
//         ))}
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Global Compliance Health */}
//         <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
//           <h2 className="text-lg font-semibold text-slate-800 mb-4">Global Compliance Health</h2>
//           <div className="space-y-4">
//             <div className="relative pt-1">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm font-medium text-slate-700">Overall Compliance</span>
//                 <span className="text-sm font-bold text-blue-600">83%</span>
//               </div>
//               <div className="overflow-hidden h-3 text-xs flex rounded-full bg-slate-100">
//                 <div style={{ width: "70%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 rounded-l-full transition-all duration-500" />
//                 <div style={{ width: "13%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500 transition-all duration-500" />
//                 <div style={{ width: "17%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500 rounded-r-full transition-all duration-500" />
//               </div>
//             </div>
            
//             <div className="grid grid-cols-3 gap-4 mt-4">
//               <div className="text-center p-3 bg-green-50 rounded-xl">
//                 <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2" />
//                 <span className="text-sm text-slate-600">Fully Compliant</span>
//                 <span className="block font-bold text-green-600">70%</span>
//               </div>
//               <div className="text-center p-3 bg-yellow-50 rounded-xl">
//                 <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-2" />
//                 <span className="text-sm text-slate-600">Minor Issues</span>
//                 <span className="block font-bold text-yellow-600">13%</span>
//               </div>
//               <div className="text-center p-3 bg-red-50 rounded-xl">
//                 <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-2" />
//                 <span className="text-sm text-slate-600">Critical Issues</span>
//                 <span className="block font-bold text-red-600">17%</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Expiring Documents */}
//         <div className="bg-white rounded-2xl p-6 shadow-sm">
//           <h2 className="text-lg font-semibold text-slate-800 mb-4">Expiring Documents</h2>
//           <div className="space-y-4">
//             {expiringDocs.map((doc, index) => (
//               <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all group">
//                 <span className="text-sm text-slate-600">{doc.period}</span>
//                 <span className={`font-bold text-${doc.color}-600 bg-${doc.color}-100 px-3 py-1 rounded-full text-sm group-hover:scale-105 transition-transform`}>
//                   {doc.count} documents
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* High Risk Organizations */}
//       <div className="bg-white rounded-2xl p-6 shadow-sm">
//         <h2 className="text-lg font-semibold text-slate-800 mb-4">High-Risk Organizations</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {highRiskOrgs.map((org, index) => (
//             <div key={index} className="p-4 border border-slate-200 rounded-xl hover:border-red-200 hover:shadow-lg transition-all group animate-slideIn" style={{ animationDelay: `${index * 100}ms` }}>
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="font-semibold text-slate-800">{org.name}</h3>
//                 <AlertTriangle size={18} className="text-red-500 group-hover:rotate-12 transition-transform" />
//               </div>
//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-slate-600">Risk Score:</span>
//                 <span className={`font-bold ${
//                   org.riskScore > 80 ? 'text-red-600' : org.riskScore > 70 ? 'text-orange-600' : 'text-yellow-600'
//                 }`}>{org.riskScore}/100</span>
//               </div>
//               <div className="flex items-center justify-between text-sm mt-2">
//                 <span className="text-slate-600">Open Issues:</span>
//                 <span className="font-bold text-red-600">{org.issues}</span>
//               </div>
//               <div className="mt-3 w-full bg-slate-200 rounded-full h-1.5">
//                 <div 
//                   className={`h-1.5 rounded-full ${
//                     org.riskScore > 80 ? 'bg-red-500' : org.riskScore > 70 ? 'bg-orange-500' : 'bg-yellow-500'
//                   }`}
//                   style={{ width: `${org.riskScore}%` }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuperAdminDashboard;


// components/SuperAdminDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Building2,
  Users,
  FileText,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const SuperAdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [logs, setLogs] = useState([]);

  // 🔥 Fetch Dashboard Data
  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const res = await fetch(
        "https://project01-a7ht.onrender.com/dev/v1/getDashBoardDocument",
        {
          method: "GET",
          headers: {
            apiKey: "mnbvcxzasdfghjkpoiuytrewq1234567890",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log("Dashboard API Response:", data);

      setSummary(data?.data?.summary || {});
      setLogs(data?.data?.logs || []);
    } catch (error) {
      console.log("Dashboard fetch error:", error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!summary) return <p className="text-center p-10">Loading...</p>;

  // 🔥 Convert summary to UI stats
  const stats = [
    {
      title: "Total Organizations",
      value: summary.totalOrganizations,
      change: "+12",
      trend: "up",
      icon: Building2,
      color: "blue",
    },
    {
      title: "Total Documents",
      value: summary.totalDocuments,
      change: "+1024",
      trend: "up",
      icon: FileText,
      color: "purple",
    },
    {
      title: "Active Documents",
      value: summary.activeDocuments,
      change: "+5",
      trend: "up",
      icon: Clock,
      color: "green",
    },
    {
      title: "Critical Expired",
      value: summary.criticalExpired,
      change: "-3",
      trend: "down",
      icon: AlertTriangle,
      color: "red",
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-${stat.color}-100 rounded-xl`}>
                <stat.icon size={24} className={`text-${stat.color}-600`} />
              </div>
              <span
                className={`flex items-center gap-1 text-sm ${
                  stat.trend === "up" ? "text-green-600" : "text-orange-600"
                }`}
              >
                {stat.trend === "up" ? (
                  <TrendingUp size={16} />
                ) : (
                  <TrendingDown size={16} />
                )}
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            <p className="text-sm text-slate-500 mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Expiring Documents Box */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Expiring Documents
        </h2>

        <div className="space-y-3">
          <p className="p-3 bg-yellow-100 rounded-xl text-yellow-700 font-medium">
            Expiring Soon: {summary.expiringSoon}
          </p>
          <p className="p-3 bg-red-100 rounded-xl text-red-700 font-medium">
            Critical Expired: {summary.criticalExpired}
          </p>
        </div>
      </div>

      {/* Document Logs Table */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mt-8">
        <h2 className="text-lg font-semibold mb-4 text-black">Recent Document Activities</h2>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-2 border text-black">S.No</th>
                <th className="p-2 border text-black">Document Name</th>
                <th className="p-2 border text-black">Uploaded Date</th>
                <th className="p-2 border text-black">Expiry Date</th>
                <th className="p-2 border text-black">Status</th>
                <th className="p-2 border text-black">Download</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2 border text-black">{item.sNo}</td>
                  <td className="p-2 border text-black">{item.documentUploaded}</td>
                  <td className="p-2 border text-black">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </td>
                  <td className="p-2 border text-black">
                    {new Date(item.expiryDate).toLocaleDateString()}
                  </td>
                  <td
                    className={`p-2 border font-bold ${
                      item.status === "Active"
                        ? "text-green-600"
                        : item.status === "Expiring Soon"
                        ? "text-orange-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.status}
                  </td>
                  <td className="p-2 border text-black">
                    <a
                      href={item.documentLink}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
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

export default SuperAdminDashboard;