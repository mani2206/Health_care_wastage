import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Jan', visits: 4000 },
  { name: 'Feb', visits: 3000 },
  { name: 'Mar', visits: 5000 },
  { name: 'Apr', visits: 4780 },
  { name: 'May', visits: 5890 },
  { name: 'Jun', visits: 6390 },
];

function BranchPerformance() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Branch Performance</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="visits" stroke="#2563eb" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BranchPerformance;