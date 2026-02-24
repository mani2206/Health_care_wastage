import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, FileText, Bell, History, User } from 'lucide-react';

const Navigation = () => {
    const tabs = [
        { path: '/dashboard', icon: <BarChart3 className="w-4 h-4" />, label: 'Dashboard' },
        // { path: '/bmw', icon: <FileText className="w-4 h-4" />, label: 'BMW Authorization' },
        { path: '/documents', icon: <FileText className="w-4 h-4" />, label: 'Documents' },
        // { path: '/notifications', icon: <Bell className="w-4 h-4" />, label: 'Notifications' },
        { path: '/audit', icon: <History className="w-4 h-4" />, label: 'Audit' },
        { path: '/profile', icon: <User className="w-4 h-4" />, label: 'Profile' }
    ];


    return (
        // <div className="bg-gray-800 border-b border-gray-700 sticky top-20 z-40">
        <div className=" border-b border-gray-700 ">
            <div className="max-w-7xl mx-auto px-6 flex overflow-x-auto">
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.path}
                        to={tab.path}
                        end={tab.end}
                        className={({ isActive }) =>
                            `py-4 px-4 font-medium transition border-b-2 whitespace-nowrap flex items-center gap-2 ${isActive
                                ? 'border-blue-500 text-blue-400'
                                : 'border-transparent text-black hover:text-black'
                            }`
                        }
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Navigation;
