import React, { useEffect, useState } from "react";
import {
  Bell,
  FileText,
  ClipboardCheck,
  AlertTriangle,
  Info,
} from "lucide-react";

const DashboardTab = () => {
  const [dashboard, setDashboard] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(
          "https://project01-a7ht.onrender.com/dev/v1/getDashBoardDocument",
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
              apiKey: "mnbvcxzasdfghjkpoiuytrewq1234567890",
            },
          }
        );

        const data = await res.json();
        console.log("Dashboard Data:", data);

        setDashboard(data.data);
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
      }
    };

    fetchDashboard();
  }, [token]);

  const summary = dashboard?.summary;
  const logs = dashboard?.logs ?? [];

  return (
    <div className="p-6 md:p-10 bg-white">
      <h2 className="text-3xl font-bold text-gray-700">Compliance Dashboard</h2>
      <p className="text-gray-500 mb-10">
        Manage Regulatory Documents And Track Upcoming Deadlines.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <DashCard
          title="Total Documents"
          value={logs.length}
          icon={<FileText className="w-6 h-6 text-teal-500" />}
        />

        <DashCard
          title="Expiring Soon"
          value={summary?.expiringSoon ?? 0}
          icon={<ClipboardCheck className="w-6 h-6 text-blue-500" />}
        />

        <DashCard
          title="Critical Alerts"
          value={summary?.criticalExpired ?? 0}
          icon={<Bell className="w-6 h-6 text-red-400" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Alerts */}
        <div className="border rounded-xl p-6 shadow-sm bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="flex items-center gap-2 text-gray-700 font-semibold">
              <Info className="text-blue-500 w-5 h-5" /> Urgent Alerts
            </h3>
            <span className="bg-red-100 text-red-500 px-3 py-1 rounded text-sm font-medium">
              Action Required
            </span>
          </div>

          {/* {logs.length > 0 ? (
            logs.map((log, i) => (
              <AlertItem
                key={i}
                icon={<AlertTriangle className="text-red-500" />}
                title={log.documentUploaded}
                message={`Status: ${log.status} • Expiry: ${new Date(
                  log.expiryDate
                ).toLocaleDateString()}`}
              />
            ))
          ) : (
            <p className="text-gray-500">No urgent alerts.</p>
          )} */}
          {logs.filter(log => log.status === "Critical Expired").length > 0 ? (
            logs
              .filter(log => log.status === "Critical Expired")
              .map((log, i) => (
                <AlertItem
                  key={i}
                  icon={<AlertTriangle className="text-red-500" />}
                  title={log.documentUploaded}
                  message={`Status: ${log.status} • Expiry: ${new Date(
                    log.expiryDate
                  ).toLocaleDateString()}`}
                />
              ))
          ) : (
            <p className="text-gray-500">No urgent alerts.</p>
          )}
        </div>

        {/* Compliance Circle */}
        <div className="border rounded-xl p-6 shadow-sm bg-white flex flex-col justify-center items-center">
          <h3 className="text-gray-700 font-semibold mb-4">
            Overall Compliance Status
          </h3>

          <div className="w-48 h-48 rounded-full border-8 border-teal-400 border-t-gray-200 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-teal-600">
                {summary ? 100 : 0}%
              </p>
              <p className="text-gray-500 text-sm">Healthy</p>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-4 w-64">
            Your clinic is meeting regulatory requirements.
          </p>
        </div>
      </div>
    </div>
  );
};

/* Reusable Components */
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
