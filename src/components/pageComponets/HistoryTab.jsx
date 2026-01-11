// src/components/pageComponents/HistoryTab.jsx
import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const HistoryTab = () => {
  const complianceHistory = [
    { date: '15-Nov-2024', action: 'BMW Authorization Renewed', status: 'success', details: 'TN/BMW/2024/001 extended to 31-Dec-2025' },
    { date: '10-Nov-2024', action: 'Annual Report Submitted', status: 'success', details: 'Form II uploaded to TNPCB' },
    { date: '05-Nov-2024', action: 'TNPCB License Verified', status: 'success', details: 'License TN/PCB/2023/05 verified' },
    { date: '25-Oct-2024', action: 'Document Upload - Compliance Certificate', status: 'success', details: 'Certificate uploaded successfully' },
    { date: '20-Oct-2024', action: 'Audit Inspection Completed', status: 'warning', details: 'Minor non-conformances noted - corrected' },
    { date: '15-Oct-2024', action: 'Vendor Agreement Uploaded', status: 'success', details: 'New BMW vendor agreement registered' }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Compliance History & Audit Logs</h2>
      <p className="text-gray-400 mb-6">Complete audit trail for regulatory compliance</p>

      <div className="space-y-3">
        {complianceHistory.map((item, idx) => (
          <HistoryItem key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

const HistoryItem = ({ item }) => {
  const isSuccess = item.status === 'success';

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      <div className="flex items-start gap-4">
        <div className="mt-1">
          {isSuccess ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-yellow-500" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-white">{item.action}</h3>
              <p className="text-sm text-gray-300 mt-1">{item.details}</p>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{item.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default HistoryTab;