// src/components/BranchesDashboard.jsx
import React, { useState } from 'react';
import { Eye, Edit, Trash2, Plus, Search, Filter } from 'lucide-react'; // or use heroicons / your icon lib

// Mock data (you can replace with real API data)
const branches = [
    {
        id: 1,
        name: 'Fortis Wellness Clinic',
        location: 'Delhi, Delhi',
        code: 'FWC-003',
        status: 'Pending',
        contact: 'Dr. Anita Singh',
        lastUpdated: 'Feb 25, 2026',
    },
    {
        id: 2,
        name: 'Medanta Care Center',
        location: 'Kolkata, West Bengal',
        code: 'MCC-007',
        status: 'Pending',
        contact: 'Dr. Amit Banerjee',
        lastUpdated: 'Feb 24, 2026',
    },
    // ... you can add more
];

const statusColors = {
    Active: 'bg-green-100 text-green-800',
    Inactive: 'bg-red-100 text-red-800',
    Pending: 'bg-yellow-100 text-yellow-800',
};

export default function BranchesDashboard() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Pending');
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(null);

    const [branchesData, setBranchesData] = useState(branches);
    const [openAddModal, setOpenAddModal] = useState(false);

    const [newBranch, setNewBranch] = useState({
        branchName: "",
        branchAddress: "",
        phoneNumber: "",
        email: ""
    });

    const handleOpenDrawer = (branch) => {
        setSelectedBranch(branch);
        setOpenDrawer(true);
    };

    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [branchToDelete, setBranchToDelete] = useState(null);

    // const filteredBranches = branches.filter((branch) => {
    const filteredBranches = branchesData.filter((branch) => {
        const matchesSearch =
            branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            branch.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || branch.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: 8,
        active: 5,
        inactive: 1,
        pending: 2,
    };

    const addBranchAPI = async () => {
        try {
            const token = localStorage.getItem("token");
            const adminId = localStorage.getItem("userId");
            const clinicEmail = localStorage.getItem("userEmail");

            const response = await fetch(
                "https://project01-a7ht.onrender.com/dev/v1/addBranchName",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        apiKey: "mnbvcxzasdfghjkpoiuytrewq1234567890",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        // email: clinicEmail,
                        email: newBranch.email,
                        branchName: newBranch.branchName,
                        branchAddress: newBranch.branchAddress,
                        phoneNumber: newBranch.phoneNumber,
                        adminUserId: adminId
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                const branchObj = {
                    id: Date.now(),
                    name: newBranch.branchName,
                    location: newBranch.branchAddress,
                    code: "BR-" + Math.floor(Math.random() * 1000),
                    status: "Pending",
                    contact: newBranch.email,
                    lastUpdated: new Date().toLocaleDateString()
                };

                setBranchesData([...branchesData, branchObj]);

                setOpenAddModal(false);

                setNewBranch({
                    branchName: "",
                    branchAddress: "",
                    phoneNumber: "",
                    email: ""
                });

            } else {
                console.log(data.message);
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header + Stats Cards */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Registered Branches</h1>
                        <p className="text-gray-600 mt-1">
                            Manage all hospital branches across your network
                        </p>
                    </div>
                    <button className="flex items-center gap-2 bg-blue-600 text-dark px-5 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium" onClick={() => setOpenAddModal(true)}>
                        <Plus size={18} />
                        Add New Branch
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <p className="text-sm font-medium text-gray-500 text-dark">Total Branches</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <p className="text-sm font-medium text-gray-500 text-dark">Active Branches</p>
                        <p className="text-3xl font-bold text-green-700 mt-2">{stats.active}</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <p className="text-sm font-medium text-gray-500 text-dark">Inactive Branches</p>
                        <p className="text-3xl font-bold text-red-700 mt-2">{stats.inactive}</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
                        <p className="text-3xl font-bold text-yellow-700 mt-2">{stats.pending}</p>
                    </div>
                </div>
            </div>

            {/* Filters + Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Filter Bar */}
                <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by branch name or code..."
                            className="text-black w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2">
                            <Filter size={16} className="text-gray-600" />

                            <select
                                className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-black"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="All" className="text-black">All Status</option>
                                <option value="Active" className="text-black">Active</option>
                                <option value="Inactive" className="text-black">Inactive</option>
                                <option value="Pending" className="text-black">Pending</option>
                            </select>
                        </div>

                        {/* City Filter */}
                        <select className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-black">
                            <option className="text-black">All Cities</option>
                        </select>

                        {/* State Filter */}
                        <select className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-black">
                            <option className="text-black">All States</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Branch Name</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Location</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Branch Code</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Contact Person</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Last Updated</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredBranches.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                                        No branches found matching your filters
                                    </td>
                                </tr>
                            ) : (
                                filteredBranches.map((branch) => (
                                    <tr key={branch.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-medium text-gray-900">{branch.name}</td>
                                        <td className="px-6 py-4 text-gray-600">{branch.location}</td>
                                        <td className="px-6 py-4 text-gray-600">{branch.code}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${statusColors[branch.status] || 'bg-gray-100 text-gray-800'}`}
                                            >
                                                {branch.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{branch.contact}</td>
                                        <td className="px-6 py-4 text-gray-600">{branch.lastUpdated}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                {/* <button className="text-blue-600 hover:text-blue-800">
                                                    <Eye size={18} />
                                                </button> */}
                                                <button
                                                    className="text-blue-600 hover:text-blue-800"
                                                    onClick={() => handleOpenDrawer(branch)}
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                {/* <button className="text-indigo-600 hover:text-indigo-800">
                                                    <Edit size={18} />
                                                </button> */}
                                                <button
                                                    className="text-indigo-600 hover:text-indigo-800"
                                                    onClick={() => {
                                                        setSelectedBranch(branch);
                                                        setOpenEditModal(true);
                                                    }}
                                                >
                                                    <Edit size={18} />
                                                </button>

                                                <button
                                                    className="text-red-600 hover:text-red-800"
                                                    onClick={() => {
                                                        setBranchToDelete(branch);
                                                        setOpenDeleteModal(true);
                                                    }}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


            {/* Right Sidebar Drawer */}
            {openDrawer && (
                <div className="fixed inset-0 flex justify-end bg-black/40 backdrop-blur-sm z-50">

                    {/* Drawer Panel */}
                    <div className="w-full sm:w-[420px] h-full bg-white p-6 shadow-xl animate-slideLeft overflow-y-auto relative">

                        {/* Close Button */}
                        <button
                            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 text-xl"
                            onClick={() => setOpenDrawer(false)}
                        >
                            ✕
                        </button>

                        {/* Drawer Content */}
                        {selectedBranch && (
                            <>
                                <h2 className="text-xl font-semibold text-gray-900 mt-6">
                                    {selectedBranch.name}
                                </h2>

                                <p className="text-gray-500 text-sm">
                                    Code: {selectedBranch.code}
                                </p>

                                <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                                    {selectedBranch.status}
                                </span>

                                <div className="mt-6 p-4 bg-gray-50 border rounded-xl">
                                    <p className="font-semibold text-gray-800">Location</p>
                                    <p className="text-gray-600">{selectedBranch.location}</p>
                                </div>

                                <div className="mt-6">
                                    <p className="font-semibold text-gray-800">Contact Person</p>
                                    <p className="text-gray-600">{selectedBranch.contact}</p>
                                </div>

                                <p className="mt-8 text-xs text-gray-400">
                                    Last Updated: {selectedBranch.lastUpdated}
                                </p>
                            </>
                        )}

                    </div>
                </div>
            )}


            {openEditModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <div className="bg-white w-[90%] sm:w-[400px] p-6 rounded-xl shadow-lg animate-fadeIn relative">

                        {/* Close */}
                        <button
                            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                            onClick={() => setOpenEditModal(false)}
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Edit Branch
                        </h2>

                        <label className="text-sm font-medium text-gray-600">Branch Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg mt-1 mb-4"
                            defaultValue={selectedBranch?.name}
                        />

                        <label className="text-sm font-medium text-gray-600">Location</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg mt-1 mb-4"
                            defaultValue={selectedBranch?.location}
                        />

                        <label className="text-sm font-medium text-gray-600">Branch Code</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg mt-1 mb-4"
                            defaultValue={selectedBranch?.code}
                        />

                        <button
                            className="w-full bg-blue-600 text-white py-2 rounded-lg mt-3 hover:bg-blue-700"
                            onClick={() => {
                                console.log("Updated:", selectedBranch);
                                setOpenEditModal(false);
                            }}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            )}

            {openDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <div className="bg-white w-[90%] sm:w-[350px] p-6 rounded-xl shadow-lg animate-fadeIn">
                        <h2 className="text-lg font-semibold text-gray-900">Delete Branch?</h2>
                        <p className="text-gray-600 mt-2">
                            Are you sure you want to delete <b>{branchToDelete?.name}</b>?
                        </p>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                                onClick={() => setOpenDeleteModal(false)}
                            >
                                No
                            </button>

                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                                onClick={() => {
                                    // DELETE Action here
                                    console.log('Deleted:', branchToDelete);
                                    setOpenDeleteModal(false);
                                }}
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {openAddModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

                    <div className="bg-white w-[90%] sm:w-[400px] p-6 rounded-xl shadow-lg text-dark">

                        <h2 className="text-xl font-semibold mb-4 text-black">
                            Add New Branch
                        </h2>

                        <input
                            type="text"
                            placeholder="Branch Name"
                            className="w-full border px-3 py-2 rounded-lg mb-3 text-black"
                            value={newBranch.branchName}
                            onChange={(e) =>
                                setNewBranch({ ...newBranch, branchName: e.target.value })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Branch Address"
                            className="w-full border px-3 py-2 rounded-lg mb-3 text-black"
                            value={newBranch.branchAddress}
                            onChange={(e) =>
                                setNewBranch({ ...newBranch, branchAddress: e.target.value })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Phone Number"
                            className="w-full border px-3 py-2 rounded-lg mb-3 text-black"
                            value={newBranch.phoneNumber}
                            onChange={(e) =>
                                setNewBranch({ ...newBranch, phoneNumber: e.target.value })
                            }
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border px-3 py-2 rounded-lg mb-3 text-black"
                            value={newBranch.email}
                            onChange={(e) =>
                                setNewBranch({ ...newBranch, email: e.target.value })
                            }
                        />

                        <div className="flex justify-end gap-3 mt-4">

                            <button
                                className="px-4 py-2 bg-gray-200 rounded-lg text-black"
                                onClick={() => setOpenAddModal(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                onClick={addBranchAPI}
                            >
                                Add Branch
                            </button>

                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}