// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import Header from '../layout/Header';
// import Navigation from '../layout/Navigation';
// import DashboardTab from './DashboardTab';
// import BMWTab from './BMWTab';
// import DocumentsTab from './DocumentsTab';
// import NotificationsTab from './NotificationsTab';
// import HistoryTab from './HistoryTab';
// import ProfileTab from './ProfileTab';
// import { CLINICS } from '../../utils/constants';

// const Dashboard = () => {
//   const { selectedClinic } = useAuth();
//   const currentClinic = CLINICS.find(c => c.id === selectedClinic);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Header />
//       <Navigation />
      
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         <Routes>
//           <Route path="/" element={<DashboardTab clinic={currentClinic} />} />
//           <Route path="/bmw" element={<BMWTab />} />
//           <Route path="/documents" element={<DocumentsTab />} />
//           <Route path="/notifications" element={<NotificationsTab />} />
//           <Route path="/history" element={<HistoryTab />} />
//           <Route path="/profile" element={<ProfileTab />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import Header from '../layout/Header';
// import Navigation from '../layout/Navigation';
// import DashboardTab from './DashboardTab';
// import BMWTab from './BMWTab';
// import DocumentsTab from './DocumentsTab';
// import NotificationsTab from './NotificationsTab';
// import HistoryTab from './HistoryTab';
// import ProfileTab from './ProfileTab';
// import { CLINICS } from '../../utils/constants';

// const Dashboard = () => {
//   const { selectedClinic } = useAuth();
//   const currentClinic = CLINICS.find(c => c.id === selectedClinic);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Header />
//       <Navigation />
      
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         <Routes>
//           {/* Default dashboard route */}
//           <Route path="/" element={<DashboardTab clinic={currentClinic} />} />
          
//           {/* All other routes are relative to /dashboard */}
//           <Route path="/bmw" element={<BMWTab />} />
//           <Route path="/documents" element={<DocumentsTab />} />
//           <Route path="/notifications" element={<NotificationsTab />} />
//           <Route path="/history" element={<HistoryTab />} />
//           <Route path="/profile" element={<ProfileTab />} />
          
//           {/* Redirect any unknown dashboard routes to dashboard home */}
//           <Route path="*" element={<Navigate to="/dashboard" replace />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import Header from '../layout/Header';
// import Navigation from '../layout/Navigation';
// import { CLINICS } from '../../utils/constants';

// const Dashboard = () => {
//   const { selectedClinic } = useAuth();
//   const currentClinic = CLINICS.find(c => c.id === selectedClinic);

//   return (
//     <div className="min-h-screen  text-white">
//       <Header />
//       <Navigation />

//       <div className="p-5">
//         {/* Render active tab here */}
//         <Outlet context={{ currentClinic }} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../layout/Header';
import Navigation from '../layout/Navigation';
import { CLINICS } from '../../utils/constants';

const Dashboard = () => {
  const { selectedClinic } = useAuth();
  const currentClinic = CLINICS.find(c => c.id === selectedClinic);

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* HEADER FIXED */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* NAVIGATION FIXED BELOW HEADER */}
      <div className="fixed top-[85px] left-0 right-0 z-40" style={{background:"white"}}>
        <Navigation />
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="pt-[145px] overflow-y-auto h-screen">
        <Outlet context={{ currentClinic }} />
      </div>
    </div>
  );
};

export default Dashboard;

