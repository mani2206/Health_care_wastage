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
// super admin 
import Headers from './components/auth/superadmin/Headers';
import AuditLog from './components/auth/superadmin/AuditLog';
import SuperAdminDashboard from './components/auth/superadmin/SuperAdminDashboard';
import UserManagement from './components/auth/superadmin/UserManagement';
import DocumentManagement from './components/auth/superadmin/DocumentManagement';
import Sidebar from './components/auth/superadmin/Sidebar';



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
                {/* <div className={`flex-1 transition-all duration-300 ${isMobile ? 'ml-0' : 'ml-72'}`}> */}
                <div className={`flex-1 transition-all duration-300 `}>
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
            <Route path="profile" element={<ProfileTab />} />
          </Route>


          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        
      </AuthProvider>
    </Router>
  );
}

export default App;
