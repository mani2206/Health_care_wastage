import React from 'react';
import { Eye, Download } from 'lucide-react';

const DocumentsTab = () => {
  const documents = [
    { name: 'BMW Authorization', status: 'Uploaded', date: '01-Jan-2022', expiry: '31-Dec-2024' },
    { name: 'Form II', status: 'Pending', date: '-', expiry: 'Due: 30-Dec-2024' },
    { name: 'Annual Report', status: 'Uploaded', date: '15-Jan-2024', expiry: '15-Jan-2025' },
    { name: 'Vendor Agreement', status: 'Uploaded', date: '10-Feb-2024', expiry: '-' },
    { name: 'Compliance Certificate', status: 'Pending', date: '-', expiry: '-' },
    { name: 'TNPCB License', status: 'Uploaded', date: '05-Mar-2023', expiry: '05-Mar-2025' }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Document Management System</h2>

      <div className="space-y-3">
        {documents.map((doc, idx) => (
          <DocumentItem key={idx} document={doc} />
        ))}
      </div>
    </div>
  );
};

const DocumentItem = ({ document }) => {
  const isUploaded = document.status === 'Uploaded';
  
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold">{document.name}</h3>
          <div className="text-sm text-gray-400 mt-2">
            Uploaded: {document.date} | Expiry: {document.expiry}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <span className={`text-xs px-3 py-1 rounded font-medium ${isUploaded ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
            {document.status}
          </span>
          <button className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
            <Eye className="w-4 h-4" /> {isUploaded ? 'View' : 'Upload'}
          </button>
          {isUploaded && (
            <button className="text-gray-400 hover:text-gray-300">
              <Download className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentsTab;