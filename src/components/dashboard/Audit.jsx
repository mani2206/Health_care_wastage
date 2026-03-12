import React, { useEffect, useState } from "react";
import { FileText, AlarmClock, AlertTriangle } from "lucide-react";

const Audit = () => {
  const [summary, setSummary] = useState({
    activeDocuments: 0,
    expiringSoon: 0,
    criticalExpired: 0,
  });

  const [logs, setLogs] = useState([]);

  const API_KEY = "mnbvcxzasdfghjkpoiuytrewq1234567890";

  const fetchAuditData = async () => {
    try {
      const token = localStorage.getItem("authToken"); 
      const response = await fetch(
        "https://project01-a7ht.onrender.com/dev/v1/getDashBoardDocument",
        {
          method: "GET",
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`, // ✔ required
          },
        }
      );

      const data = await response.json();
      console.log("AUDIT API RESPONSE:", data);

      if (response.ok) {
        setSummary(data.data.summary);
        setLogs(data.data.logs);
      }
    } catch (error) {
      console.log("Error fetching dashboard:", error);
    }
  };

  useEffect(() => {
    fetchAuditData();
  }, []);

  return (
    <div className="p-10 bg-white h-screen">
      {/* Title */}
      <h2 className="text-3xl font-semibold text-gray-700">Audit Log</h2>

      <p className="text-gray-500 text-sm flex items-center mt-1">
        <span className="text-xs mr-1">🔒</span> Secure Auditor Session
      </p>

      <p className="text-gray-500 mt-2 mb-10 max-w-3xl">
        Real-Time Monitoring Of Sensitive Document Access And Administrative Actions
        Within The CompliancePro Ecosystem.
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <SummaryCard
          icon={<FileText className="w-6 h-6 text-teal-500" />}
          title="Active Documents"
          value={summary.activeDocuments}
        />

        <SummaryCard
          icon={<AlarmClock className="w-6 h-6 text-green-600" />}
          title="Expiring Soon"
          value={summary.expiringSoon}
        />

        <SummaryCard
          icon={<AlertTriangle className="w-6 h-6 text-red-500" />}
          title="Critical Expired"
          value={summary.criticalExpired}
        />
      </div>

      {/* Table */}
      <div className="border rounded-xl overflow-hidden">
        <div className="grid grid-cols-5 bg-teal-700 text-white font-semibold py-3 px-4 text-sm">
          <div>S.No</div>
          <div>Timestamp</div>
          <div>Document Uploaded</div>
          <div>IP Address</div>
          <div>Status</div>
        </div>

        {logs.map((row) => (
          <div
            key={row.sNo}
            className="grid grid-cols-5 border-b py-3 px-4 text-gray-600 text-sm"
          >
            <div>{row.sNo}</div>

            <div>
              {new Date(row.timestamp).toLocaleString("en-GB")}
            </div>

            <div>{row.documentUploaded}</div>

            <div>{row.ipAddress}</div>

            <div
              className={`font-semibold ${row.status === "Active"
                  ? "text-green-600"
                  : row.status === "Expiring Soon"
                    ? "text-orange-600"
                    : "text-red-600"
                }`}
            >
              {row.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SummaryCard = ({ icon, title, value }) => (
  <div className="border rounded-xl p-6 bg-white shadow-sm flex flex-col items-start">
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <span className="text-gray-700 font-medium">{title}</span>
    </div>
    <p className="text-4xl font-bold text-teal-700">{value}</p>
  </div>
);

export default Audit;
