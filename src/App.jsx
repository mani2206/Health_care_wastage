import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import Dashboard from './components/dashboard/Dashboard';
import BMWTab from './components/dashboard/BMWTab';
import DocumentsTab from './components/dashboard/DocumentsTab';
import NotificationsTab from './components/dashboard/NotificationsTab';
import HistoryTab from './components/dashboard/Audit';
import ProfileTab from './components/dashboard/ProfileTab';
import ResetPassword from './components/auth/ResetPassword';
import DashboardTab from "./components/dashboard/DashboardTab"
import WasteLog from './components/dashboard/WasteLog';
// super admin 
import Headers from './components/auth/superadmin/Headers';
import AuditLog from './components/auth/superadmin/AuditLog';
import SuperAdminDashboard from './components/auth/superadmin/SuperAdminDashboard';
import UserManagement from './components/auth/superadmin/UserManagement';
import DocumentManagement from './components/auth/superadmin/DocumentManagement';
import Sidebar from './components/auth/superadmin/Sidebar';
//clinic admin
import ClinicDashboard from './components/auth/clinicadmin/dashboard/ClinicDashboard';
import MainLayout from './components/auth/clinicadmin/layout/MainLayout';
import BranchesDashboard from './components/auth/clinicadmin/dashboard/BranchesDashboard';



function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* super admin  */}
          <Route
            path="/admin/*"
            element={
              <div className="flex min-h-screen bg-slate-50">
                <Sidebar />
                <div className="flex-1 h-screen overflow-y-auto transition-all duration-300">
                  <Headers />
                  <main className="p-4 lg:p-8">
                    <Routes>
                      <Route path="admindashboard" element={<SuperAdminDashboard />} />
                      <Route path="users" element={<UserManagement />} />
                      <Route path="documents" element={<DocumentManagement />} />
                      <Route path="audit-log" element={<AuditLog />} />
                    </Routes>
                  </main>
                </div>
              </div>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DashboardTab />} />
            <Route path="bmw" element={<BMWTab />} />
            <Route path="documents" element={<DocumentsTab />} />
            <Route path="notifications" element={<NotificationsTab />} />
            <Route path="audit" element={<HistoryTab />} />
            <Route path="wastelog" element={<WasteLog />} />
            <Route path="profile" element={<ProfileTab />} />
          </Route>

          <Route
            path="/clinicadmin"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="clinicdashboard" element={<ClinicDashboard />} />
            <Route path="appointments" element={<BranchesDashboard />} />
            <Route path="patients" element={<div>Patients</div>} />
            <Route path="documents" element={<div>Documents</div>} />
            <Route path="settings" element={<div>Settings</div>} />
            <Route path="*" element={<Navigate to="clinicdashboard" replace />} />
          </Route>


          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>

      </AuthProvider>
    </Router>



    //   <Routes>

    //     {/* Public routes */}
    //     <Route path="/" element={<Login />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/forgot-password" element={<ForgotPassword />} />
    //     <Route path="/reset-password" element={<ResetPassword />} />

    //     {/* ────────────────────────────────────────────────
    //     SUPER ADMIN ─────────────────────────────────────
    // ──────────────────────────────────────────────── */}
    //     <Route
    //       path="/admin/*"
    //       element={
    //         <div className="flex min-h-screen bg-slate-50">
    //           <Sidebar /> {/* super admin sidebar */}
    //           <div className="flex-1 h-screen overflow-y-auto">
    //             <Headers /> {/* super admin header */}
    //             <main className="p-4 lg:p-8">
    //               <Routes>
    //                 <Route path="admindashboard" element={<SuperAdminDashboard />} />
    //                 <Route path="users" element={<UserManagement />} />
    //                 <Route path="documents" element={<DocumentManagement />} />
    //                 <Route path="audit-log" element={<AuditLog />} />
    //                 <Route path="*" element={<Navigate to="admindashboard" replace />} />
    //               </Routes>
    //             </main>
    //           </div>
    //         </div>
    //       }
    //     />

    //     {/* ────────────────────────────────────────────────
    //     CLINIC ADMIN ────────────────────────────────────
    // ──────────────────────────────────────────────── */}
    //     {/* <Route
    //       path="/clinicadmin/*"
    //       element={
    //         <ProtectedRoute>
    //           <MainLayout>
    //             <Routes>
    //               <Route path="clinicdashboard" element={<ClinicDashboard />} />
    //               <Route path="appointments" element={<div>Appointments page (todo)</div>} />
    //               <Route path="patients" element={<div>Patients list (todo)</div>} />
    //               <Route path="documents" element={<div>Clinic documents (todo)</div>} />
    //               <Route path="settings" element={<div>Settings (todo)</div>} />
    //               <Route path="*" element={<Navigate to="clinicdashboard" replace />} />
    //             </Routes>
    //           </MainLayout>
    //         </ProtectedRoute>
    //       }
    //     /> */}

    //     <Route
    //       path="/clinicadmin"
    //       element={
    //         <ProtectedRoute>
    //           <MainLayout />
    //         </ProtectedRoute>
    //       }
    //     >
    //       <Route path="clinicdashboard" element={<ClinicDashboard />} />
    //       <Route path="appointments" element={<div>Appointments page (todo)</div>} />
    //       <Route path="patients" element={<div>Patients list (todo)</div>} />
    //       <Route path="documents" element={<div>Clinic documents (todo)</div>} />
    //       <Route path="settings" element={<div>Settings (todo)</div>} />
    //       <Route path="*" element={<Navigate to="clinicdashboard" replace />} />
    //     </Route>

    //     {/* ────────────────────────────────────────────────
    //     NORMAL ADMIN / USER DASHBOARD (your existing one)
    // ──────────────────────────────────────────────── */}
    //     <Route
    //       path="/"
    //       element={
    //         <ProtectedRoute>
    //           <Dashboard />           {/* ← your main DashboardLayout wrapper? */}
    //         </ProtectedRoute>
    //       }
    //     >
    //       <Route path="dashboard" element={<DashboardTab />} />
    //       <Route path="bmw" element={<BMWTab />} />
    //       <Route path="documents" element={<DocumentsTab />} />
    //       <Route path="notifications" element={<NotificationsTab />} />
    //       <Route path="audit" element={<HistoryTab />} />
    //       <Route path="profile" element={<ProfileTab />} />
    //       <Route path="*" element={<Navigate to="/dashboard" replace />} />
    //     </Route>

    //     {/* Fallbacks */}
    //     <Route path="*" element={<Navigate to="/dashboard" replace />} />

    //   </Routes>
  );
}

export default App;

