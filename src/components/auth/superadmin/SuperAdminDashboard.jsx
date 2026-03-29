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
// import { API_BASE_URL } from "../../../utils/constants";

const SuperAdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [logs, setLogs] = useState([]);

  // 🔥 Fetch Dashboard Data
  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const res = await fetch(
        // "https://project01-a7ht.onrender.com/dev/v1/getDashBoardDocument",
        `${import.meta.env.VITE_API_BASE_URL}/dev/v1/getDashBoardDocument`,
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
    // <div className="space-y-6 animate-fadeIn">
    <div className="space-y-6 animate-fadeIn min-h-screen pb-20">
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
                className={`flex items-center gap-1 text-sm ${stat.trend === "up" ? "text-green-600" : "text-orange-600"
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
                    className={`p-2 border font-bold ${item.status === "Active"
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