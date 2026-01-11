import React, { useState } from 'react';
import LoginScreen from './LoginScreen';
import Dashboard from './Dashboard';

const HealthcareLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedClinic, setSelectedClinic] = useState('clinic_a');

  const clinics = [
    {
      id: 'clinic_a',
      name: 'Apollo Health Clinic - Chennai',
      riskLevel: 'medium',
      form2Status: 'Pending',
      form2DaysUntilExpiry: 25,
      bmwDaysUntilExpiry: 25
    },
    {
      id: 'clinic_b',
      name: 'Apollo Health Clinic - Bangalore',
      riskLevel: 'low',
      form2Status: 'Uploaded',
      form2DaysUntilExpiry: 60,
      bmwDaysUntilExpiry: 60
    },
    {
      id: 'clinic_c',
      name: 'Apollo Health Clinic - Hyderabad',
      riskLevel: 'high',
      form2Status: 'Pending',
      form2DaysUntilExpiry: 15,
      bmwDaysUntilExpiry: 15
    }
  ];

  const handleLogin = (userType) => {
    setLoggedInUser(userType);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setActiveTab('dashboard');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <Dashboard
      loggedInUser={loggedInUser}
      activeTab={activeTab}
      selectedClinic={selectedClinic}
      clinics={clinics}
      onLogout={handleLogout}
      onTabChange={setActiveTab}
      onClinicChange={setSelectedClinic}
    />
  );
};

export default HealthcareLogin;