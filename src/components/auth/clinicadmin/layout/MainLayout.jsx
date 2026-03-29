// // src/components/layout/MainLayout.jsx
// import React from 'react';
// import Sidebar from './Sidebar';
// import Header from './Header';

// export default function MainLayout({ children }) {
//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />
      
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />
        
//         <main className="flex-1 overflow-y-auto p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}