import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { KeyRound, Lock, Mail, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/api";
import bg from "../../assets/login_bg.jpeg"

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const emailFromPrev = location.state?.email || "";

    const [email, setEmail] = useState(emailFromPrev);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();

        if (!email || !otp || !newPassword) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);

        try {
            const res = await resetPassword(email, otp, newPassword);

            if (res?.message?.toLowerCase().includes("success")) {
                toast.success("Password reset successfully!");
                navigate("/login");
            } else {
                toast.error(res.message || "Something went wrong!");
            }

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
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl p-8 shadow-2xl">

                    <div className="text-center mb-6">
                        <KeyRound className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                        <h2 className="text-2xl font-bold text-black">Reset Your Password</h2>
                        <p className="text-gray-600 mt-2">Enter OTP and new password</p>
                    </div>

                    <form onSubmit={handleReset} className="space-y-4">

                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-black mb-2 block">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* OTP */}
                        <div>
                            <label className="text-sm font-medium text-black mb-2 block">OTP</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter the OTP"
                            />
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="text-sm font-medium text-black mb-2 block">New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Enter new password"
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4">
                            <Link
                                to="/forgot-password"
                                className="flex-1 py-3 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg flex items-center justify-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back
                            </Link>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                                ) : (
                                    "Reset Password"
                                )}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
