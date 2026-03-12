// components/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    FileText,
    History,
    Building2,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Shield,
    Menu
} from 'lucide-react';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth <= 768) {
                setCollapsed(true);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Updated menu items with correct admin paths
    const menuItems = [
        { path: '/admin/admindashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/users', icon: Users, label: 'User Management' },
        { path: '/admin/documents', icon: FileText, label: 'Documents' },
        { path: '/admin/audit-log', icon: History, label: 'Audit Log' },
    ];

    const isActive = (path) => location.pathname === path;

    const handleNavigation = (path) => {
        navigate(path);
        if (isMobile) {
            setMobileOpen(false);
        }
    };

    const handleLogout = () => {
        console.log('Logging out...');
        navigate('/login');
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isMobile && mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 animate-fadeIn"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile Menu Button */}
            {isMobile && !mobileOpen && (
                <button
                    onClick={() => setMobileOpen(true)}
                    className="fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all"
                >
                    <Menu size={24} />
                </button>
            )}

            {/* Sidebar */}
            <div className={`
        fixed left-0 top-0 h-screen 
        bg-gradient-to-b from-slate-800 to-slate-900 
        text-white transition-all duration-300 z-50
        ${collapsed ? 'w-20' : 'w-72'}
        ${isMobile && !mobileOpen ? '-translate-x-full' : 'translate-x-0'}
      `} style={{ position: "relative", background: "white" }}>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <Shield size={32} className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse" />
                        {!collapsed && !isMobile && (
                            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                                HealthCompliance
                            </span>
                        )}
                    </div>
                    {!isMobile && (
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110 "
                            style={{ color: "black" }}
                        >
                            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => handleNavigation(item.path)}
                            className={`relative   w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive(item.path)
                                    ? 'bg-blue-600/20 text-blue-500'
                                    : 'text-slate-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <item.icon
                                size={20}
                                className={`transition-all duration-200 ${isActive(item.path) ? 'scale-110' : 'group-hover:scale-110 group-hover:text-black'
                                    }`}
                            />
                            {(!collapsed || isMobile) && (
                                <span className="font-medium flex-1 text-left group-hover:text-black">{item.label}</span>
                            )}
                            {isActive(item.path) && (
                                <div className="absolute right-0 w-1 h-6 bg-blue-500 rounded-l-full animate-pulse" />
                            )}
                        </button>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-white/10 space-y-1">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl 
               text-slate-400 hover:bg-red-500/10 hover:text-black transition-all group"
                    >
                        <LogOut
                            size={20}
                            className="transition-transform group-hover:scale-110 group-hover:rotate-12 group-hover:text-black"
                        />
                        {(!collapsed || isMobile) && (
                            <span className="font-medium flex-1 text-left">Sign Out</span>
                        )}
                    </button>
                </div>

            </div>
        </>
    );
};

export default Sidebar;



// components/Sidebar.jsx
// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import {
//     LayoutDashboard,
//     Users,
//     FileText,
//     History,
//     Shield,
//     Settings,
//     LogOut,
//     ChevronLeft,
//     ChevronRight,
//     Menu
// } from 'lucide-react';

// const Sidebar = () => {
//     const [collapsed, setCollapsed] = useState(false);
//     const [mobileOpen, setMobileOpen] = useState(false);
//     const [isMobile, setIsMobile] = useState(false);
//     const location = useLocation();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const checkMobile = () => {
//             const mobile = window.innerWidth <= 768;
//             setIsMobile(mobile);
//             if (mobile) setCollapsed(true);
//         };

//         checkMobile();
//         window.addEventListener('resize', checkMobile);
//         return () => window.removeEventListener('resize', checkMobile);
//     }, []);

//     const menuItems = [
//         { path: "/admin/admindashboard", icon: LayoutDashboard, label: "Dashboard" },
//         { path: "/admin/users", icon: Users, label: "User Management" },
//         { path: "/admin/documents", icon: FileText, label: "Documents" },
//         { path: "/admin/audit-log", icon: History, label: "Audit Log" }
//     ];

//     const isActive = (path) => location.pathname === path;

//     const handleNavigation = (path) => {
//         navigate(path);
//         if (isMobile) setMobileOpen(false);
//     };

//     const handleLogout = () => navigate("/login");

//     return (
//         <>
//             {/* Mobile Overlay */}
//             {isMobile && mobileOpen && (
//                 <div
//                     className="fixed inset-0 bg-black/50 z-40"
//                     onClick={() => setMobileOpen(false)}
//                 />
//             )}

//             {/* Mobile Menu Button */}
//             {isMobile && !mobileOpen && (
//                 <button
//                     onClick={() => setMobileOpen(true)}
//                     className="fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg"
//                 >
//                     <Menu size={24} />
//                 </button>
//             )}

//             {/* SIDEBAR */}
//             <div
//                 className={`
//           relative
//           h-screen
//           bg-white shadow-xl
//           border-r border-gray-200
//           transition-all duration-300 ease-in-out
//           flex flex-col
//           z-50
//           ${collapsed ? "w-20" : "w-72"}
//           ${isMobile && !mobileOpen ? "-translate-x-full" : "translate-x-0"}
//         `}
//             >
//                 {/* Header */}
//                 <div className="relative p-6 border-b border-gray-200 flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                         <Shield size={30} className="text-blue-600" />
//                         {!collapsed && !isMobile && (
//                             <span className="text-lg font-bold text-blue-600">
//                                 HealthCompliance
//                             </span>
//                         )}
//                     </div>

//                     {!isMobile && (
//                         <button
//                             onClick={() => setCollapsed(!collapsed)}
//                             className="absolute right-3 top-1/2 -translate-y-1/2 
//                 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
//                         >
//                             {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
//                         </button>
//                     )}
//                 </div>

//                 {/* Nav Items */}
//                 <nav className="flex-1 p-4 space-y-1">
//                     {menuItems.map((item) => (
//                         <button
//                             key={item.path}
//                             onClick={() => handleNavigation(item.path)}
//                             className={`
//                 w-full flex items-center gap-3 px-4 py-3 rounded-lg transition
//                 ${isActive(item.path)
//                                     ? "bg-blue-50 text-blue-600 font-medium border border-blue-200"
//                                     : "text-gray-600 hover:bg-gray-100"
//                                 }
//               `}
//                         >
//                             <item.icon
//                                 size={20}
//                                 className={isActive(item.path) ? "text-blue-600" : ""}
//                             />
//                             {(!collapsed || isMobile) && <span>{item.label}</span>}
//                         </button>
//                     ))}
//                 </nav>

//                 {/* Footer */}
//                 <div className="p-4 border-t border-gray-200">
//                     <button
//                         onClick={handleLogout}
//                         className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-100 hover:text-red-600 transition"
//                     >
//                         <LogOut size={20} />
//                         {(!collapsed || isMobile) && <span>Sign Out</span>}
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Sidebar;