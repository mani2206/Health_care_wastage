import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, AlertCircle, UserCog, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { registerUser } from '../../services/api';
import bg from "../../assets/login_bg.jpeg"

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'admin'
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await registerUser(formData);
      toast.success('Registration Successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50" style={{
      backgroundImage: `url(${bg})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover", // fills entire screen
    }}>
      <div className="w-full max-w-fit">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <UserPlus className="w-12 h-12 mx-auto mb-3 text-blue-500" />
            <h2 className="text-2xl font-bold text-black">Create Account</h2>
            <p className="text-gray-600 mt-2">Register for healthcare compliance system</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* <div>
              <label className="text-sm font-medium text-black mb-2 block">Select Role</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'admin' })}
                  className={`py-3 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2 ${formData.userType === 'admin'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  <User className="w-4 h-4" /> Admin
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'superAdmin' })}
                  className={`py-3 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2 ${formData.userType === 'superAdmin'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  <UserCog className="w-4 h-4" /> Super Admin
                </button>
              </div>
            </div> */}

            <div>
              <label className="text-sm font-medium text-black mb-2 block">Select Role <span className="text-red-600">*</span></label>

              <div className="grid grid-cols-3 gap-3">

                {/* Admin */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: "clinic" })}
                  className={`py-3 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2 
        ${formData.userType === "clinic"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  <User className="w-4 h-4" /> Clinic
                </button>

                {/* Super Admin */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: "superAdmin" })}
                  className={`py-3 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2 
        ${formData.userType === "superAdmin"
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  <UserCog className="w-4 h-4" /> Super Admin
                </button>

                {/* Clinic Admin */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: "admin" })}
                  className={`py-3 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2 
        ${formData.userType === "admin"
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  <UserPlus className="w-4 h-4" /> Clinic Admin
                </button>

              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-black mb-2 block">
                Username <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 outline-none transition ${errors.username ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Choose username"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.username}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-black mb-2 block">
                Email <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 outline-none transition ${errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter email address"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-black mb-2 block">
                Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 outline-none transition ${errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-black mb-2 block">
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 outline-none transition ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Link
                to="/login"
                className="flex-1 py-3 rounded-lg font-medium transition bg-gray-200 text-gray-700 hover:bg-gray-300 text-center"
              >
                Back to Login
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 font-semibold py-3 rounded-lg transition text-white disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 inline mr-2" /> Register
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;