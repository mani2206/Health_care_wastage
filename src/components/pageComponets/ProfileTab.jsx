import React from 'react';

const ProfileTab = () => {
  const profileInfo = [
    { label: 'Clinic Name', value: 'Apollo Health Clinic' },
    { label: 'Type', value: 'Multi-Specialty Clinic' },
    { label: 'Address', value: '123 Health Street, Chennai' },
    { label: 'TNPCB District', value: 'Chennai' },
    { label: 'Bed Count', value: '50 Beds' },
    { label: 'Authorization Number', value: 'TN/BMW/2024/001' },
    { label: 'Departments', value: 'General Medicine, Surgery, Pediatrics, Cardiology, Orthopedics' }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Clinic / Hospital Profile</h2>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-4">
        {profileInfo.map((info, idx) => (
          <ProfileInfoItem key={idx} label={info.label} value={info.value} />
        ))}
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition mt-6">
        Edit Profile
      </button>
    </div>
  );
};

const ProfileInfoItem = ({ label, value }) => (
  <div>
    <p className="text-gray-400 text-sm">{label}</p>
    <p className="font-semibold text-lg mt-1">{value}</p>
  </div>
);

export default ProfileTab;