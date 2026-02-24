import React, { useState, useRef, useEffect } from 'react';
import { CloudUpload, Download, Trash2, Share2, MoreVertical } from 'lucide-react';
import { toast } from 'react-toastify';


const DocumentsTab = () => {

  const [documents, setDocuments] = useState([]);
  console.log(documents, "documents---");
  const [showPopup, setShowPopup] = useState(false);
  const [editDoc, setEditDoc] = useState(null);
 
const startUpdate = (doc) => {
  setEditDoc({
    documentId: doc.documentId,
    documentCategory: doc.documentUploaded,
    expiryDate: doc.expiryDate?.split("T")[0],
    file: null
  });

  setShowPopup(true);   // ✅ YOU MISSED THIS

  window.scrollTo({ top: 0, behavior: "smooth" });
};

  const [formData, setFormData] = useState({
    documentCategory: '',
    expiryDate: '',
    file: null
  });

  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const API_KEY = 'mnbvcxzasdfghjkpoiuytrewq1234567890';


  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const validFormats = ['application/pdf', 'image/png', 'image/jpeg', 'image/svg+xml'];

      if (validFormats.includes(file.type)) {
        setFormData({ ...formData, file });
        toast.success(`${file.name} selected`);
      } else {
        toast.error('Only PDF, PNG, JPG, and SVG formats are allowed');
      }
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, file });
      toast.success(`${file.name} selected`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleUpload = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId"); // ✅ userId from localStorage

    if (!userId) {
      toast.error("User ID not found in localStorage");
      return;
    }

    if (!formData.documentCategory || !formData.expiryDate || !formData.file) {
      toast.error('Please fill all fields and select a file');
      return;
    }

    setLoading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('userId', userId);
      uploadFormData.append('documentCategory', formData.documentCategory);
      uploadFormData.append('expiryDate', formData.expiryDate);
      uploadFormData.append('proofDocument', formData.file);

      const response = await fetch(
        "https://project01-a7ht.onrender.com/dev/v1/createDocument",
        {
          method: "POST",
          headers: {
            apiKey: "mnbvcxzasdfghjkpoiuytrewq1234567890" // ✅ pass apiKey in headers
            // ❌ DO NOT add Content-Type (browser sets boundary automatically)
          },
          body: uploadFormData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Document uploaded successfully!");

        await fetchDocuments();
        // Reset Form
        setFormData({
          documentCategory: "",
          expiryDate: "",
          file: null,
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
        fetchDocuments();
      } else {
        toast.error(data.message || "Failed to upload document");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading document");
    } finally {
      setLoading(false);
    }
  };


  const documentCategories = [
    'Medical License',
    'Form II',
    'Annual Report',
    'Vendor Agreement',
    'Compliance Certificate',
    'TNPCB License',
    'Insurance Certificate',
    'Audit Report'
  ];


  const fetchDocuments = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const response = await fetch(
        `https://project01-a7ht.onrender.com/dev/v1/getDocument/${userId}`,
        {
          method: "GET",
          headers: { apiKey: API_KEY },
        }
      );

      const res = await response.json();
      console.log("API RESPONSE:", res);

      // Your array is HERE → res.data.logs
      let docs = res?.data?.logs || [];

      if (!Array.isArray(docs)) docs = [];

      setDocuments(docs);

    } catch (err) {
      console.error("Failed to fetch documents:", err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);


  const updateDocument = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const form = new FormData();
      form.append("userId", userId);
      form.append("documentId", editDoc.documentId);
      form.append("documentCategory", editDoc.documentCategory);
      form.append("expiryDate", editDoc.expiryDate);

      if (editDoc.file) {
        form.append("proofDocument", editDoc.file);
      }

      const response = await fetch(
        "https://project01-a7ht.onrender.com/dev/v1/updateDocument",
        {
          method: "PUT",
          headers: {
            apiKey: API_KEY,
          },
          body: form,
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Document Updated Successfully");
        setEditDoc(null);
        fetchDocuments();
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating document");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
        <div className="max-w-6xl mx-auto">
          {/* HEADER */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-teal-700 mb-3">Upload Compliance Document</h1>
            <p className="text-gray-700 text-base leading-relaxed mb-4">
              Securely Upload Your Clinic's Regulatory Certifications. All Files Are Encrypted And Automatically Processed For Validity.
            </p>
            <div className="flex items-center gap-3 text-teal-600">
              <div className="w-5 h-5 rounded-full border-2 border-teal-600 flex items-center justify-center text-sm">✓</div>
              <span className="font-semibold">Auto Validation:</span>
              <span>Expiry Dates Are Monitored And Alerted</span>
            </div>
          </div>

          {/* UPLOAD FORM */}
          <div className="bg-white border-2 border-teal-100 rounded-lg p-8 mb-12">
            <form onSubmit={handleUpload} className="space-y-6">
              {/* DRAG AND DROP */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-12 text-center transition ${dragActive
                  ? 'border-teal-600 bg-teal-50'
                  : 'border-gray-300 bg-gray-50'
                  }`}
              >
                <div className="flex flex-col items-center justify-center">
                  <CloudUpload className="w-12 h-12 text-teal-600 mb-4" />
                  <p className="text-gray-800 font-semibold mb-1">Drag And Drop Your Document</p>
                  <p className="text-sm text-gray-600 mb-3">
                    Max Size: 10MB | Format: PDF, PNG, JPG, SVG
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-teal-600 font-semibold hover:text-teal-700 underline"
                  >
                    Browse File
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  onChange={handleFileSelect}
                  accept=".pdf,.png,.jpg,.jpeg,.svg"
                />
              </div>

              {/* FILE DISPLAY */}
              {formData.file && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Selected File:</span> {formData.file.name}
                  </p>
                </div>
              )}

              {/* FORM FIELDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-teal-700 mb-2">
                    Document Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="documentCategory"
                    value={formData.documentCategory}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="">Select Category</option>
                    {documentCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-teal-700 mb-2">
                    Document Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      documentCategory: '',
                      expiryDate: '',
                      file: null
                    });
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  className="px-6 py-2.5 border-2 border-teal-600 text-teal-600 font-semibold rounded-lg hover:bg-teal-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg disabled:opacity-50"
                >
                  {loading ? 'Uploading...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>


          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mt-10">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-teal-600 text-white">
                    <th className="px-6 py-3 text-left">Serial No</th>
                    <th className="px-6 py-3 text-left">Uploaded Document Name</th>
                    <th className="px-6 py-3 text-left">Uploaded Date</th>
                    <th className="px-6 py-3 text-left">Expiry Date</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Document</th>
                  </tr>
                </thead>

                <tbody>
                  {documents.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-6 text-gray-500">
                        No documents uploaded yet
                      </td>
                    </tr>
                  )}

                  {documents.map((doc) => (
                    <tr key={doc.documentId} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-3 text-black">{doc.sNo}</td>

                      <td className="px-6 py-3 text-black">{doc.documentUploaded}</td>

                      <td className="px-6 py-3 text-black">
                        {new Date(doc.timestamp).toLocaleDateString("en-GB")}
                      </td>

                      <td className="px-6 py-3 text-black">
                        {new Date(doc.expiryDate).toLocaleDateString("en-GB")}
                      </td>

                      <td className="px-6 py-3 text-black">
                        <span
                          className={`px-3 py-1 text-sm rounded-lg ${doc.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                        >
                          {doc.status}
                        </span>
                      </td>

                      {/* <td className="px-6 py-3">
                      <a
                        href={doc.documentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View / Download
                      </a>
                    </td> */}
                      <td className="px-6 py-3 text-black">
                        <button
                          onClick={() => startUpdate(doc)}
                          className="text-teal-600 underline hover:text-teal-800"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      {showPopup && editDoc && (
          <div className="fixed inset-0 bg-opacity-70 flex justify-center items-center z-50" style={{background:"#ffffffab"}}>

            <div className="bg-[#0f0f0f70] text-white w-[90%] md:w-[500px] p-6 rounded-2xl shadow-xl border border-gray-700">

              <h2 className="text-xl font-bold mb-4 text-teal-400">Update Document</h2>

              {/* Document Category */}
              <label className="text-sm font-semibold">Document Category</label>
              <input
                type="text"
                value={editDoc.documentCategory}
                onChange={(e) =>
                  setEditDoc({ ...editDoc, documentCategory: e.target.value })
                }
                className="w-full px-4 py-2 mb-4 rounded-lg bg-black border border-gray-700 text-white"
              />

              {/* Expiry Date */}
              <label className="text-sm font-semibold">Expiry Date</label>
              <input
                type="date"
                value={editDoc.expiryDate}
                onChange={(e) =>
                  setEditDoc({ ...editDoc, expiryDate: e.target.value })
                }
                className="w-full px-4 py-2 mb-4 rounded-lg bg-black border border-gray-700 text-white"
              />

              {/* File Upload */}
              <label className="text-sm font-semibold">Upload New File (Optional)</label>
              <input
                type="file"
                onChange={(e) =>
                  setEditDoc({ ...editDoc, file: e.target.files?.[0] })
                }
                className="w-full px-4 py-2 mb-4 rounded-lg bg-black border border-gray-700 text-white"
              />

              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 rounded-lg border border-red-500 text-red-400 hover:bg-red-500 hover:text-black"
                >
                  Cancel
                </button>

                <button
                  onClick={updateDocument}
                  className="px-4 py-2 rounded-lg bg-teal-500 text-black font-semibold hover:bg-teal-400"
                >
                  Update
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </>
  );
};

export default DocumentsTab;