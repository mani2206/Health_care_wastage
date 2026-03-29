import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Key, Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { forgotPassword } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import bg from "../../assets/login_bg.jpeg"

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const validateEmail = () => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return false;
    }
    setError('');
    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail()) return;

    setLoading(true);

    try {
      await forgotPassword(email);

      toast.success("OTP sent successfully!");

      setSent(true); // ADD THIS

      navigate("/reset-password", { state: { email } });
    } catch (error) {
      toast.error(error?.message || "Something went wrong!");
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
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          {!sent ? (
            <>
              <div className="text-center mb-6">
                <Key className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                <h2 className="text-2xl font-bold text-black">Reset Password</h2>
                <p className="text-gray-600 mt-2">Enter your email to receive a reset link</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-black mb-2 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 outline-none transition ${error ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="Enter your registered email"
                    />
                  </div>
                  {error && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {error}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <Link
                    to="/login"
                    className="flex-1 py-3 rounded-lg font-medium transition bg-gray-200 text-gray-700 hover:bg-gray-300 text-center flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-semibold py-3 rounded-lg transition text-white disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-black mb-2">Check Your Email</h2>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to <br />
                <span className="font-semibold">{email}</span>
              </p>
              <Link
                to="/login"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;