import React from 'react';

const activities = [
  { text: "New patient registered - Branch A", time: "2 hours ago" },
  { text: "Compliance report approved", time: "4 hours ago" },
  { text: "Staff member added - Dr. Priya", time: "Yesterday" },
  { text: "Low stock alert - Medicine X", time: "2 days ago" },
];

function RecentActivities() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Recent Activities</h3>
      <ul className="space-y-4">
        {activities.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-sm">
            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
            <div>
              <p>{item.text}</p>
              <p className="text-gray-500 mt-0.5">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentActivities;