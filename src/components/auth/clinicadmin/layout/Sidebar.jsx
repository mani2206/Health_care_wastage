
// src/components/layout/Sidebar.jsx
import React from 'react';
import { LayoutDashboard, Building2, Users, FileText, Settings, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "../../../../assets/logo.jpeg"

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/clinicadmin/clinicdashboard' },
  { icon: Building2, label: 'Branches', path: '/clinicadmin/appointments' },
  { icon: Users, label: 'Patients', path: '/clinicadmin/patients' },
  { icon: FileText, label: 'Documents', path: '/clinicadmin/documents' },
  { icon: Settings, label: 'Settings', path: '/clinicadmin/settings' },
];


export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {
    // localStorage.removeItem("userDetails");
    localStorage.clear(); // complete reset
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">

      {/* LOGO SECTION */}
      <div className="p-2 border-b">
        <div className="flex items-center gap-3">

          <img src={logo} className="w-20 rounded-full" />
          <div>
            <h1 className="font-semibold text-lg text-black">Compilecare</h1>
            <p className="text-xs text-gray-500">Clinic Admin</p>
          </div>
        </div>
      </div>

      {/* MENU LIST */}
      <nav className="flex-1 px-3 py-6">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.label}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                    ${isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* FOOTER PROFILE + LOGOUT */}
      <div className="p-6 border-t mt-auto space-y-4">

        {/* Profile */}
        <div className="flex items-center gap-3">
          {/* <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-medium">
            SA
          </div> */}
          <div>
            <p className="font-medium text-black">Clinic Admin</p>
            {/* <p className="text-xs text-gray-500">admin@healthhub.com</p> */}
            <p className="text-xs text-gray-500">
              {userEmail || "No Email"}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}