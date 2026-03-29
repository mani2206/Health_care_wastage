import { useState, useEffect, useRef } from "react";
import { addWasteLog, getWasteLogs, deleteWasteLog, updateWasteLog } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Biohazard, TestTube, Syringe } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";



const categories = [
    {
        id: "infectious",
        label: "Infectious Waste",
        icon: <Biohazard className="w-6 h-6 " />, // added icon
        dotColor: "bg-yellow-400",
        cardBg: "bg-yellow-50",
        border: "border-yellow-300",
        ring: "ring-yellow-400",
        btnBg: "bg-yellow-400 hover:bg-yellow-500",
        textColor: "text-yellow-500",
    },
    {
        id: "contaminated",
        label: "Contaminated Plastic",
        icon: <Biohazard className="w-6 h-6 " />, // added icon
        dotColor: "bg-red-500",
        cardBg: "bg-red-50",
        border: "border-red-200",
        ring: "ring-red-400",
        btnBg: "bg-red-500 hover:bg-red-600",
        textColor: "text-red-500",
    },
    {
        id: "sharps",
        label: "Sharps",
        icon: <Syringe className="w-6 h-6 " />, // added icon
        dotColor: "bg-gray-300",
        cardBg: "bg-gray-50",
        border: "border-gray-200",
        ring: "ring-gray-400",
        btnBg: "bg-gray-400 hover:bg-gray-500",
        textColor: "text-gray-400",
    },
    {
        id: "glass",
        label: "Glass Waste",
        icon: <TestTube className="w-6 h-6 " />, // added icon
        dotColor: "bg-blue-600",
        cardBg: "bg-blue-50",
        border: "border-blue-200",
        ring: "ring-blue-500",
        btnBg: "bg-blue-600 hover:bg-blue-700",
        textColor: "text-blue-600",
    },
];

const initialRecords = [
    { id: "01", category: "Infectious Waste", date: "13/03/2026", qty: "2kg", dept: "ICU" },
    { id: "02", category: "Contaminated Waste", date: "13/03/2026", qty: "2kg", dept: "Lab" },
    { id: "03", category: "Sharps", date: "13/03/2026", qty: "4kg", dept: "Ward" },
    { id: "04", category: "Glass Waste", date: "13/03/2026", qty: "3kg", dept: "OT" },
];

const categoryTextColor = {
    "Infectious Waste": "text-yellow-500",
    "Contaminated Waste": "text-red-500",
    "Sharps": "text-gray-400",
    "Glass Waste": "text-blue-600",
};

export default function WasteLog() {
    const [selected, setSelected] = useState(null);
    const [values, setValues] = useState({});
    const [date, setDate] = useState("12/02/2027");
    const [agency, setAgency] = useState("");
    const [dept, setDept] = useState("ICU");
    const [vendorCollected, setVendorCollected] = useState("yes");
    const [records, setRecords] = useState([]);
    console.log(records, "records");

    const [page, setPage] = useState(1);
    const [openMenu, setOpenMenu] = useState(null);
    const menuRefs = useRef({});

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageRecords = records.slice(start, end);

    const totalPages = Math.ceil(records.length / pageSize);


    const [editOpen, setEditOpen] = useState(false);
    const [editData, setEditData] = useState(null);


    // 🔹 Common function
    const exportToExcel = (data, fileName) => {
        // Convert JSON → worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Create workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

        // Convert to binary
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(blob, `${fileName}.xlsx`);
    };


    const handleAnnualReport = () => {
        const currentYear = new Date().getFullYear();

        const yearlyData = records.filter((item) => {
            const date = new Date(item.date.split("/").reverse().join("-"));
            return date.getFullYear() === currentYear;
        });

        exportToExcel(formatExcelData(yearlyData), "Annual_Waste_Report");
    };

    const handleSubmit = async () => {
        if (!selected || !values[selected]) return;

        const category = categories.find((c) => c.id === selected)?.label;

        const payload = {
            wasteCategory: category,
            quantity: Number(values[selected]),
            department: dept,
            wasteCollectionAgency: agency,
            vendorCollected: vendorCollected,
            dateOfGeneration: date, // Must be yyyy-mm-dd
        };

        try {
            const res = await addWasteLog(payload);
            console.log("Waste Log Added:", res);

            toast.success("Waste log added successfully!");

            // Refresh table instantly
            fetchWasteLogs();

            // Reset form
            setSelected(null);
            setValues({});
            setAgency("");
        } catch (err) {
            toast.error(err.message);
        }
    };
    const handleCancel = () => {
        setSelected(null);
        setValues({});
        setAgency("");
    };

    const formatExcelData = (data) => {
        return data.map((item, index) => ({
            "S.No": index + 1,
            "Waste Category": item.category,
            "Upload Date": item.date,
            "Quantity (Kg)": item.qty,
            "Department": item.dept,
        }));
    };

    const handleMonthlyReport = () => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const monthlyData = records.filter((item) => {
            const date = new Date(item.date.split("/").reverse().join("-"));
            return (
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear
            );
        });

        exportToExcel(formatExcelData(monthlyData), "Monthly_Waste_Report");
    };


    const fetchWasteLogs = async () => {
        try {
            const res = await getWasteLogs();
            console.log("API Response:", res);

            // The API response structure - from your console.log
            // res.data is an array directly, not res.data.data
            const apiData = res?.data; // Change this line!

            if (Array.isArray(apiData)) {
                const formatted = apiData.map((item, index) => ({
                    id: index + 1, // Use index+1 for S.No since sNo might not be consistent
                    logId: item.wasteLogId,
                    category: item.wasteCategory,
                    date: new Date(item.uploadDate).toLocaleDateString("en-GB"),
                    rawDate: item.uploadDate, // ✅ ADD THIS
                    qty: item.quantity,
                    dept: item.department,
                }));

                console.log("Formatted Data:", formatted);
                setRecords(formatted);
            } else {
                console.log("API data is not an array:", apiData);
                setRecords([]);
            }

            setOpenMenu(null);
        } catch (err) {
            console.error("API Error:", err);
            setRecords([]);
        }
    };
    useEffect(() => {
        fetchWasteLogs(); // initialRecords shown first → then API updates UI
    }, []);

    useEffect(() => {
        console.log("Records state updated:", records);
    }, [records]);

    // const handleDelete = async (logId) => {
    //     if (!window.confirm("Are you sure you want to delete this log?")) return;

    //     try {
    //         await deleteWasteLog(logId);
    //         toast.success("Waste Log deleted!");

    //         setOpenMenu(null); // 🔥 FIX

    //         fetchWasteLogs();
    //     } catch (err) {
    //         console.error(err);
    //         toast.error("Failed to delete log");
    //     }
    // };


    const handleDelete = async (logId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This waste log will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });

        // ❗ User clicked YES
        if (result.isConfirmed) {
            try {
                await deleteWasteLog(logId);
                Swal.fire("Deleted!", "Waste log has been deleted.", "success");

                setOpenMenu(null);
                fetchWasteLogs();
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to delete log", "error");
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            const menuRef = menuRefs.current[openMenu];
            if (menuRef && !menuRef.contains(e.target)) {
                setOpenMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openMenu]);

    const handleUpdate = async () => {
        const payload = {
            wasteCategory: editData.category,
            quantity: Number(editData.qty),
            department: editData.dept,
            wasteCollectionAgency: editData.agency || "",
            vendorCollected: editData.vendorCollected || "yes",
            dateOfGeneration: editData.date,  // ensure format yyyy-mm-dd
        };

        try {
            const token = localStorage.getItem("token"); // or wherever stored

            await updateWasteLog(editData.logId, payload, token);

            toast.success("Waste Log Updated Successfully!");
            setEditOpen(false);
            fetchWasteLogs(); // refresh table
        } catch (err) {
            toast.error("Failed to update waste log");
        }
    };
    return (
        <div className="px-6 py-8 bg-white min-h-screen">

            {/* Header */}
            <h2 className="text-4xl font-semibold text-teal-700 mb-1">Add Waste Log</h2>
            <p className="text-sm text-gray-500 mb-6">
                "The Health Of Our Future Depends On How We Dispose Of The Waste Of Today."
            </p>

            {/* Category Selection Label */}
            <p className="text-sm font-semibold text-teal-500 mb-3">
                Select Waste Category <span className="text-red-500">*</span>
            </p>

            {/* Category Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        onClick={() => setSelected(selected === cat.id ? null : cat.id)}
                        className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
              ${cat.cardBg} ${cat.border}
              ${selected === cat.id ? `ring-2 ring-offset-1 ${cat.ring} shadow-md` : "hover:shadow-sm"}
            `}
                    >
                        <input
                            type="checkbox"
                            checked={selected === cat.id}
                            onChange={() => { }}
                            onClick={(e) => e.stopPropagation()}
                            className="absolute top-2 left-2 w-3.5 h-3.5 accent-teal-500 cursor-pointer"
                        />

                        {/* <div className={`w-12 h-12 rounded-full mt-1 ${cat.dotColor}`} /> */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${cat.dotColor}`}>
                            {cat.icon}
                        </div>

                        <p className="text-sm font-bold text-gray-800 text-center leading-tight">{cat.label}</p>

                        <div className="flex items-center w-full border border-gray-300 rounded-md overflow-hidden bg-white">
                            <input
                                type="number"
                                placeholder="Enter Value"
                                value={values[cat.id] || ""}
                                onChange={(e) => setValues({ ...values, [cat.id]: e.target.value })}
                                onClick={(e) => e.stopPropagation()}
                                className="flex-1 text-xs px-2 py-1.5 outline-none bg-transparent text-gray-700 min-w-0"
                            />
                            <span className="text-xs px-2 py-1.5 bg-gray-100 border-l border-gray-300 text-gray-500 font-medium">
                                Kg
                            </span>
                        </div>

                        <button
                            onClick={(e) => { e.stopPropagation(); setSelected(cat.id); }}
                            className={`w-full py-1.5 rounded-md text-xs font-semibold text-white transition-colors duration-150 ${cat.btnBg}`}
                        >
                            Pick Me
                        </button>
                    </div>
                ))}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-6">

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-teal-500">
                        Date Of Generation <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2 border border-teal-200 rounded-lg px-3 py-2.5 bg-teal-50 focus-within:ring-1 focus-within:ring-teal-400">
                        <span className="text-gray-400 text-sm">📅</span>
                        <input
                            type="text"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-sm text-gray-700"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-teal-500">
                        Waste Collection Agency <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2 border border-teal-200 rounded-lg px-3 py-2.5 bg-teal-50 focus-within:ring-1 focus-within:ring-teal-400">
                        <span className="text-gray-400 text-sm">👤</span>
                        <input
                            type="text"
                            placeholder="vendor name"
                            value={agency}
                            onChange={(e) => setAgency(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-teal-500">
                        Department <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2 border border-teal-200 rounded-lg px-3 py-2.5 bg-teal-50 focus-within:ring-1 focus-within:ring-teal-400">
                        <span className="text-gray-400 text-sm">🏢</span>
                        <select
                            value={dept}
                            onChange={(e) => setDept(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-sm text-gray-700 cursor-pointer"
                        >
                            {["ICU", "Lab", "Ward", "OT", "ER"].map((d) => (
                                <option key={d}>{d}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-teal-500">
                        Vendor Collected <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2 border border-teal-200 rounded-lg px-3 py-2.5 bg-teal-50 focus-within:ring-1 focus-within:ring-teal-400">
                        <span className="text-teal-500 text-sm">✔</span>
                        <select
                            value={vendorCollected}
                            onChange={(e) => setVendorCollected(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-sm text-gray-700 cursor-pointer"
                        >
                            <option value="yes">yes</option>
                            <option value="no">no</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={handleCancel}
                    className="px-8 py-2.5 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-8 py-2.5 rounded-lg bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800 transition-colors"
                >
                    Submit
                </button>
            </div>

            {/* Table Header */}
            <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-500">
                    A Quick View Of Waste Records.
                </p>

                <button
                    onClick={handleMonthlyReport}
                    className="text-sm font-semibold text-teal-500 hover:text-teal-700 flex items-center gap-1"
                >
                    ⬇ Monthly Report
                </button>

                <button
                    onClick={handleAnnualReport}
                    className="text-sm font-semibold text-teal-500 hover:text-teal-700 flex items-center gap-1"
                >
                    ⬇ Annual Report
                </button>
            </div>

            {/* Table */}
            <div className="rounded-xl overflow-hidden border border-gray-200">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-teal-700 text-white">
                            {["S.No", "Waste Category", "Upload Date", "Quantity", "Dept.", "Action"].map((h) => (
                                <th key={h} className="text-left px-4 py-3 font-semibold text-sm whitespace-nowrap">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {pageRecords.map((r, i) => (
                            <tr

                                key={r.logId}
                                className={`border-b border-gray-100 hover:bg-teal-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                                    }`}
                            >
                                <td className="px-4 py-3 text-gray-700">{r.id}</td>
                                <td className={`px-4 py-3 font-semibold ${categoryTextColor[r.category] || "text-gray-700"}`}>
                                    {r.category}
                                </td>
                                <td className="px-4 py-3 text-gray-600">{r.date}</td>
                                <td className="px-4 py-3 text-gray-600">{r.qty}</td>
                                <td className="px-4 py-3 text-gray-600">{r.dept}</td>


                                <td className="px-4 py-3 text-gray-600 relative">
                                    <div className="inline-block relative">

                                        {/* 3-dot button */}
                                        <button
                                            onClick={() => setOpenMenu(openMenu === r.logId ? null : r.logId)}
                                            className="text-xl px-2 py-1 rounded hover:bg-gray-100"
                                        >
                                            ⋮
                                        </button>

                                        {openMenu === r.logId && (
                                            <div
                                                ref={(el) => (menuRefs.current[r.logId] = el)}
                                                className="absolute right-0 mt-1 bg-white border border-gray-200 
                           rounded-lg shadow-lg z-10 w-60" style={{
                                                    right: "20px",
                                                    bottom: "-9px"
                                                }}
                                            >

                                                {/* Edit Button */}
                                                <button
                                                    className="flex items-center gap-2 w-full px-4 py-2 text-sm 
               text-blue-600 hover:bg-blue-50"
                                                    onClick={() => {
                                                        setEditData(r);   // set data for modal
                                                        setEditOpen(true);
                                                        setOpenMenu(null);
                                                    }}
                                                >
                                                    <span>✏️</span>
                                                    <span>Edit {r.category}</span>
                                                </button>

                                                {/* Delete Button */}
                                                <button
                                                    className="flex items-center gap-2 w-full px-4 py-2 text-sm 
                               text-red-600 hover:bg-red-50"
                                                    onClick={() => {
                                                        handleDelete(r.logId);
                                                        setOpenMenu(null);
                                                    }}
                                                >
                                                    <span>🗑️</span>
                                                    <span>Delete {r.category}</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}

            <div className="flex justify-center items-center gap-2 mt-5">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-md border border-gray-300 text-gray-500 text-sm disabled:opacity-40 hover:bg-gray-50"
                >
                    ‹
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                        key={n}
                        onClick={() => setCurrentPage(n)}
                        className={`px-3 py-1.5 rounded-md ${currentPage === n ? "bg-teal-600 text-white" : "border border-gray-300 text-gray-600"
                            }`}
                    >
                        {n}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-md border border-gray-300 text-gray-500 text-sm disabled:opacity-40 hover:bg-gray-50"
                >
                    ›
                </button>
            </div>



            {editOpen && (
                <div
                    className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50"
                    style={{ background: "#ffffffab" }}
                >
                    <div className="bg-white p-6 rounded-lg w-96 shadow-xl">

                        <h3 className="text-lg font-semibold text-teal-600 mb-4">
                            Edit Waste Log
                        </h3>

                        {/* Category */}
                        <label className="block text-sm font-medium text-black mb-1">
                            Waste Category <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full border border-gray-400 rounded p-2 mb-3 text-black"
                            value={editData.category}
                            onChange={(e) =>
                                setEditData({ ...editData, category: e.target.value })
                            }
                        />

                        {/* Quantity */}
                        <label className="block text-sm font-medium text-black mb-1">
                            Quantity (kg) <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="number"
                            required
                            className="w-full border border-gray-400 rounded p-2 mb-3 text-black"
                            value={editData.qty}
                            onChange={(e) =>
                                setEditData({ ...editData, qty: e.target.value })
                            }
                        />

                        {/* Department */}
                        <label className="block text-sm font-medium text-black mb-1">
                            Department <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full border border-gray-400 rounded p-2 mb-3 text-black"
                            value={editData.dept}
                            onChange={(e) =>
                                setEditData({ ...editData, dept: e.target.value })
                            }
                        />

                        {/* Collection Agency */}
                        <label className="block text-sm font-medium text-black mb-1">
                            Collection Agency <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full border border-gray-400 rounded p-2 mb-3 text-black"
                            value={editData.agency || ""}
                            onChange={(e) =>
                                setEditData({ ...editData, agency: e.target.value })
                            }
                        />

                        {/* Vendor Collected */}
                        <label className="block text-sm font-medium text-black mb-1">
                            Vendor Collected <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                            required
                            className="w-full border border-gray-400 rounded p-2 mb-3 text-black"
                            value={editData.vendorCollected || "yes"}
                            onChange={(e) =>
                                setEditData({ ...editData, vendorCollected: e.target.value })
                            }
                        >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setEditOpen(false)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                style={{ color: "black" }}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                            >
                                Update
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}




