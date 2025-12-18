import React, { useState } from 'react';
import { Activity, Lock, User, Stethoscope, Shield, UserCog, FileText, Bell, BarChart3, CheckCircle, AlertCircle, Clock, LogOut, History, Building2, Mail, MessageCircle, Download, Eye, AlertTriangle } from 'lucide-react';

const HealthcareLogin = () => {
  const [userType, setUserType] = useState('admin');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedClinic, setSelectedClinic] = useState('clinic_a');

  const users = {
    admin: { username: 'admin', password: 'admin123' },
    superadmin: { username: 'superadmin', password: 'super123' }
  };

  const clinics = [
    { id: 'clinic_a', name: 'Apollo Health Clinic - Chennai' },
    { id: 'clinic_b', name: 'Apollo Health Clinic - Bangalore' },
    { id: 'clinic_c', name: 'Apollo Health Clinic - Hyderabad' }
  ];

  const complianceHistory = [
    { date: '15-Nov-2024', action: 'BMW Authorization Renewed', status: 'success', details: 'TN/BMW/2024/001 extended to 31-Dec-2025' },
    { date: '10-Nov-2024', action: 'Annual Report Submitted', status: 'success', details: 'Form II uploaded to TNPCB' },
    { date: '05-Nov-2024', action: 'TNPCB License Verified', status: 'success', details: 'License TN/PCB/2023/05 verified' },
    { date: '25-Oct-2024', action: 'Document Upload - Compliance Certificate', status: 'success', details: 'Certificate uploaded successfully' },
    { date: '20-Oct-2024', action: 'Audit Inspection Completed', status: 'warning', details: 'Minor non-conformances noted - corrected' },
    { date: '15-Oct-2024', action: 'Vendor Agreement Uploaded', status: 'success', details: 'New BMW vendor agreement registered' }
  ];

  const notifications = [
    { id: 1, type: 'email', title: 'BMW Authorization Renewal', message: 'Reminder: Renewal due in 45 days', time: '2 hours ago', status: 'sent' },
    { id: 2, type: 'whatsapp', title: 'Form II Submission', message: 'WhatsApp reminder scheduled for tomorrow', time: '5 hours ago', status: 'scheduled' },
    { id: 3, type: 'email', title: 'TNPCB License Expiry', message: 'License expires in 90 days - prepare renewal', time: '1 day ago', status: 'sent' },
    { id: 4, type: 'whatsapp', title: 'Annual Report Due', message: 'WhatsApp reminder for annual report submission', time: '2 days ago', status: 'sent' },
    { id: 5, type: 'email', title: 'Compliance Summary', message: 'Monthly compliance status report sent', time: '3 days ago', status: 'sent' }
  ];

  // Documents with status and dates
  const documents = [
    { name: 'BMW Authorization', status: 'Uploaded', date: '01-Jan-2022', expiry: '31-Dec-2024', daysLeft: 13 },
    { name: 'Form II', status: 'Pending', date: '-', expiry: 'Due: 30-Dec-2024', daysLeft: 12 },
    { name: 'Annual Report', status: 'Uploaded', date: '15-Jan-2024', expiry: '15-Jan-2025', daysLeft: 28 },
    { name: 'Vendor Agreement', status: 'Uploaded', date: '10-Feb-2024', expiry: '-', daysLeft: null },
    { name: 'Compliance Certificate', status: 'Pending', date: '-', expiry: '-', daysLeft: null },
    { name: 'TNPCB License', status: 'Uploaded', date: '05-Mar-2023', expiry: '05-Mar-2025', daysLeft: 78 }
  ];

  // Calculate Risk Level based on intelligent logic
  const calculateRiskLevel = () => {
    const form2 = documents.find(d => d.name === 'Form II');
    const bmwAuth = documents.find(d => d.name === 'BMW Authorization');
    
    // High Risk: Form II pending + expiry < 30 days
    if (form2?.status === 'Pending' && form2?.daysLeft && form2.daysLeft < 30) {
      return { level: 'High', color: 'red', icon: '🔴', details: 'Form II pending with critical deadline' };
    }
    
    // High Risk: BMW expiring in < 15 days
    if (bmwAuth?.daysLeft && bmwAuth.daysLeft < 15) {
      return { level: 'High', color: 'red', icon: '🔴', details: 'BMW Authorization expiring critically soon' };
    }
    
    // Medium Risk: Form II pending OR BMW expiring in < 30 days
    if (form2?.status === 'Pending' || (bmwAuth?.daysLeft && bmwAuth.daysLeft < 30)) {
      return { level: 'Medium', color: 'yellow', icon: '🟡', details: 'Action required for pending documents' };
    }
    
    // Low Risk: All documents in order
    return { level: 'Low', color: 'green', icon: '🟢', details: 'All compliance documents are in order' };
  };

  const riskIndicator = calculateRiskLevel();

  const handleLogin = () => {
    setError('');
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password.');
      return;
    }
    const validUser = users[userType];
    if (credentials.username === validUser.username && credentials.password === validUser.password) {
      setLoggedInUser(userType);
      setIsLoggedIn(true);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setCredentials({ username: '', password: '' });
    setError('');
    setActiveTab('dashboard');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  if (isLoggedIn) {
    const currentClinic = clinics.find(c => c.id === selectedClinic);

    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 border-b border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2"><Shield className="w-6 h-6" /> Healthcare Compliance System</h1>
              <p className="text-sm text-gray-300">Welcome, {loggedInUser === 'superadmin' ? 'Super Admin' : 'Clinic Admin'}</p>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"><LogOut className="w-4 h-4" /> Logout</button>
          </div>

          {/* Clinic Selector */}
          <div className="bg-gray-800 border-t border-gray-700 px-6 py-3">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium">Select Clinic:</span>
              <select value={selectedClinic} onChange={(e) => setSelectedClinic(e.target.value)} className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                {clinics.map(clinic => <option key={clinic.id} value={clinic.id}>{clinic.name}</option>)}
              </select>
              <span className="text-xs text-gray-400 ml-2">{currentClinic?.name}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gray-800 border-b border-gray-700 sticky top-20 z-40">
          <div className="max-w-7xl mx-auto px-6 flex overflow-x-auto">
            <button onClick={() => setActiveTab('dashboard')} className={`py-4 px-2 font-medium transition border-b-2 whitespace-nowrap ${activeTab === 'dashboard' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}><BarChart3 className="w-4 h-4 inline mr-2" /> Dashboard</button>
            <button onClick={() => setActiveTab('bmw')} className={`py-4 px-2 font-medium transition border-b-2 whitespace-nowrap ${activeTab === 'bmw' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}><FileText className="w-4 h-4 inline mr-2" /> BMW Authorization</button>
            <button onClick={() => setActiveTab('documents')} className={`py-4 px-2 font-medium transition border-b-2 whitespace-nowrap ${activeTab === 'documents' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}><FileText className="w-4 h-4 inline mr-2" /> Documents</button>
            <button onClick={() => setActiveTab('notifications')} className={`py-4 px-2 font-medium transition border-b-2 whitespace-nowrap ${activeTab === 'notifications' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}><Bell className="w-4 h-4 inline mr-2" /> Notifications</button>
            <button onClick={() => setActiveTab('history')} className={`py-4 px-2 font-medium transition border-b-2 whitespace-nowrap ${activeTab === 'history' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}><History className="w-4 h-4 inline mr-2" /> History/Logs</button>
            <button onClick={() => setActiveTab('profile')} className={`py-4 px-2 font-medium transition border-b-2 whitespace-nowrap ${activeTab === 'profile' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-white'}`}><User className="w-4 h-4 inline mr-2" /> Profile</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Compliance Dashboard</h2>
              
              {/* Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-gray-400 text-sm font-medium">Overall Status</h3>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-3xl font-bold text-green-400">ACTIVE</p>
                  <p className="text-xs text-gray-500 mt-2">All documents compliant</p>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-gray-400 text-sm font-medium">BMW Auth. Expiry</h3>
                    <Clock className="w-5 h-5 text-yellow-500" />
                  </div>
                  <p className="text-3xl font-bold text-yellow-400">45 Days</p>
                  <p className="text-xs text-gray-500 mt-2">Renewal required soon</p>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-gray-400 text-sm font-medium">Documents</h3>
                    <FileText className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-3xl font-bold text-blue-400">6/8</p>
                  <p className="text-xs text-gray-500 mt-2">2 documents pending</p>
                </div>

                {/* Risk Indicator Card - NEW */}
                <div className={`bg-gray-800 border rounded-lg p-6 ${riskIndicator.color === 'red' ? 'border-red-600' : riskIndicator.color === 'yellow' ? 'border-yellow-600' : 'border-green-600'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-gray-400 text-sm font-medium">Compliance Risk</h3>
                    {riskIndicator.color === 'red' ? (
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                    ) : riskIndicator.color === 'yellow' ? (
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <p className={`text-3xl font-bold ${riskIndicator.color === 'red' ? 'text-red-400' : riskIndicator.color === 'yellow' ? 'text-yellow-400' : 'text-green-400'}`}>
                    {riskIndicator.icon} {riskIndicator.level}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">{riskIndicator.details}</p>
                </div>
              </div>

              {/* Compliance Reminders */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><AlertCircle className="w-5 h-5 text-orange-500" /> Compliance Reminders</h3>
                <div className="space-y-3">
                  <div className="bg-gray-700 p-4 rounded border border-yellow-600/30">
                    <p className="font-medium text-yellow-400">BMW Authorization Expiring</p>
                    <p className="text-sm text-gray-300 mt-1">Renewal due in 45 days - Action required</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-yellow-600/30">
                    <p className="font-medium text-yellow-400">Annual Report Submission</p>
                    <p className="text-sm text-gray-300 mt-1">Due in 60 days - Form II required</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Notification Preview</h2>
              <p className="text-gray-400 mb-6">Automation system for email and WhatsApp reminders</p>
              
              <div className="space-y-4">
                {notifications.map(notif => (
                  <div key={notif.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        <div className="mt-1">
                          {notif.type === 'email' ? <Mail className="w-5 h-5 text-blue-500" /> : <MessageCircle className="w-5 h-5 text-green-500" />}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{notif.title}</h3>
                          <p className="text-sm text-gray-300 mt-1">{notif.message}</p>
                          <div className="flex gap-4 mt-3">
                            <span className="text-xs text-gray-500">{notif.time}</span>
                            <span className={`text-xs px-2 py-1 rounded ${notif.status === 'sent' ? 'bg-green-900 text-green-300' : 'bg-blue-900 text-blue-300'}`}>
                              {notif.status === 'sent' ? '✓ Sent' : '⏱ Scheduled'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* History/Logs Tab */}
          {activeTab === 'history' && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Compliance History & Audit Logs</h2>
              <p className="text-gray-400 mb-6">Complete audit trail for regulatory compliance</p>
              
              <div className="space-y-3">
                {complianceHistory.map((item, idx) => (
                  <div key={idx} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {item.status === 'success' ? (
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
                ))}
              </div>
            </div>
          )}

          {/* BMW Authorization Tab */}
          {activeTab === 'bmw' && (
            <div>
              <h2 className="text-3xl font-bold mb-8">BMW Authorization Tracking</h2>
              
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div><p className="text-gray-400 text-sm">Authorization Number</p><p className="font-semibold text-lg mt-2">TN/BMW/2024/001</p></div>
                  <div><p className="text-gray-400 text-sm">Status</p><p className="font-semibold text-lg text-yellow-400 mt-2">Expiring Soon</p></div>
                  <div><p className="text-gray-400 text-sm">Authorization Start Date</p><p className="font-semibold text-lg mt-2">01-Jan-2022</p></div>
                  <div><p className="text-gray-400 text-sm">Expiry Date</p><p className="font-semibold text-lg text-yellow-400 mt-2">31-Dec-2024</p></div>
                  <div><p className="text-gray-400 text-sm">Days Until Renewal</p><p className="font-semibold text-lg text-orange-400 mt-2">45 Days</p></div>
                  <div><p className="text-gray-400 text-sm">Last Updated</p><p className="font-semibold text-lg mt-2">15-Nov-2024</p></div>
                </div>
              </div>
              
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition flex items-center gap-2">
                <FileText className="w-4 h-4" /> Renew Authorization
              </button>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Document Management System</h2>
              
              <div className="space-y-3">
                {documents.map((doc, idx) => (
                  <div key={idx} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{doc.name}</h3>
                        <div className="text-sm text-gray-400 mt-2">Uploaded: {doc.date} | Expiry: {doc.expiry}</div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span className={`text-xs px-3 py-1 rounded font-medium ${doc.status === 'Uploaded' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                          {doc.status}
                        </span>
                        <button className="text-blue-400 hover:text-blue-300 flex items-center gap-1"><Eye className="w-4 h-4" /> {doc.status === 'Uploaded' ? 'View' : 'Upload'}</button>
                        {doc.status === 'Uploaded' && <button className="text-gray-400 hover:text-gray-300"><Download className="w-4 h-4" /></button>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Clinic / Hospital Profile</h2>
              
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-4">
                <div><p className="text-gray-400 text-sm">Clinic Name</p><p className="font-semibold text-lg mt-1">Apollo Health Clinic</p></div>
                <div><p className="text-gray-400 text-sm">Type</p><p className="font-semibold text-lg mt-1">Multi-Specialty Clinic</p></div>
                <div><p className="text-gray-400 text-sm">Address</p><p className="font-semibold text-lg mt-1">123 Health Street, Chennai</p></div>
                <div><p className="text-gray-400 text-sm">TNPCB District</p><p className="font-semibold text-lg mt-1">Chennai</p></div>
                <div><p className="text-gray-400 text-sm">Bed Count</p><p className="font-semibold text-lg mt-1">50 Beds</p></div>
                <div><p className="text-gray-400 text-sm">Authorization Number</p><p className="font-semibold text-lg mt-1">TN/BMW/2024/001</p></div>
                <div><p className="text-gray-400 text-sm">Departments</p><p className="font-semibold text-lg mt-1">General Medicine, Surgery, Pediatrics, Cardiology, Orthopedics</p></div>
              </div>
              
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition mt-6">Edit Profile</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3 mb-2"><Shield className="w-8 h-8 text-blue-400" /> Healthcare Compliance</h1>
          <p className="text-gray-400">Medical Waste Management System</p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button onClick={() => setUserType('admin')} className={`py-3 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2 ${userType === 'admin' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}><User className="w-4 h-4" /> Admin</button>
            <button onClick={() => setUserType('superadmin')} className={`py-3 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2 ${userType === 'superadmin' ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}><UserCog className="w-4 h-4" /> Super Admin</button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                <input type="text" value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} onKeyPress={handleKeyPress} className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="Enter username" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                <input type="password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} onKeyPress={handleKeyPress} className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="Enter password" />
              </div>
            </div>

            {error && (
              <div className="bg-red-900 border border-red-700 rounded-lg p-3 text-red-300 text-sm flex gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button onClick={handleLogin} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 mt-6">
              <Lock className="w-4 h-4" /> Sign In
            </button>
          </div>

          <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
            <p className="text-xs font-medium text-gray-400 mb-2">Demo Credentials:</p>
            <div className="text-xs text-gray-300 space-y-1">
              <p>✓ Admin: admin / admin123</p>
              <p>✓ Super Admin: superadmin / super123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthcareLogin;
