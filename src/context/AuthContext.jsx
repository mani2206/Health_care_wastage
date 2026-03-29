import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedClinic, setSelectedClinic] = useState('clinic_a');

  useEffect(() => {
    // Check for stored token on mount
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (token && userRole) {
      setUser({ role: userRole, token });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // This will be called from Login component
      // The actual API call happens there, we just set the user
      const token = localStorage.getItem('authToken');
      const role = localStorage.getItem('userRole');
      
      if (token && role) {
        setUser({ role, token });
        toast.success('Login successful!');
        return true;
      }
      return false;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setUser(null);
    toast.info('Logged out successfully');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    selectedClinic,
    setSelectedClinic
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};