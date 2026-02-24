import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, User, Lock, Eye, EyeOff, AlertCircle, HelpCircle, UserPlus } from 'lucide-react';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import bg from "../../assets/login_bg.jpeg"

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!credentials.email) newErrors.email = 'Email is required';
    if (!credentials.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   if (!validateForm()) return;

  //   setLoading(true);
  //   try {
  //     const data = await loginUser(credentials.email, credentials.password);

  //     localStorage.setItem("authToken", data.token);
  //     localStorage.setItem("userRole", data.role || "admin");

  //     await login(credentials.email, credentials.password);

  //     // Redirect based on role
  //     if (data.role === "superadmin") {
  //       navigate("/super-admin-dashboard");
  //     } else {
  //       navigate("/dashboard");
  //     }

  //   } catch (error) {
  //     toast.error(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const data = await loginUser(credentials.email, credentials.password);

      // ✅ Correct role capture
      const role = data.data.role;
      const token = data.data.token;

      // Store in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role);

      await login(credentials.email, credentials.password);

      // 🔥 Redirect based on EXACT role from LocalStorage
      if (role === "superAdmin") {
        navigate("/admin/admindashboard");
      } else if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      // style={{
      //   backgroundImage: `url(${bg})`,
      // }}
      style={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover", // fills entire screen
      }}
    >

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3 mb-2 text-black">
            <Shield className="w-8 h-8" /> Healthcare Compliance
          </h1>
          <p className="text-gray-600 font-semibold">Medical Waste Management System</p>
        </div>

        <div className=" rounded-2xl p-8 shadow-2xl" style={{ background: "rgb(255 255 255 / 40%)" }}>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-black mb-2 block">
                Email <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                {/* <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  onKeyPress={handleKeyPress}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter email"
                /> */}
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  onKeyPress={handleKeyPress}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg 
    text-black placeholder-black 
    focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition
    ${errors.email ? 'border-red-500' : 'border-black'}
  `}
                  placeholder="Enter email"
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
                {/* <input
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  onKeyPress={handleKeyPress}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter password"
                /> */}
                <input
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  onKeyPress={handleKeyPress}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg 
    text-black placeholder-black
    focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition
    ${errors.password ? 'border-red-500' : 'border-black'}
  `}
                  placeholder="Enter password"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Sign In
                </>
              )}
            </button>

            {/* <div className="flex justify-between mt-4">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-500 hover:text-blue-400 transition font-medium flex items-center gap-1"
              >
                Forgot Password?
              </Link>
              <Link
                to="/register"
                className="text-sm text-green-500 hover:text-green-400 transition font-medium flex items-center gap-1"
              >
                Create Account
              </Link>
            </div> */}

            <div className="flex justify-between mt-4">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-700 hover:text-blue-900 transition font-medium flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4" />
                Forgot Password?
              </Link>

              <Link
                to="/register"
                className="text-sm text-green-700 hover:text-green-900 transition font-medium flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Create Account
              </Link>
            </div>

          </form>


        </div>

      </div>
    </div>
  );
};

export default Login;
