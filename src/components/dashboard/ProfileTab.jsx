// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { createProfileData, getProfileData, updateProfileData } from "../../services/api";
// import { Mail, Phone, MapPin, Building2, User, FileText } from "lucide-react";

// const ProfileTab = () => {
//   const [profile, setProfile] = useState(null);

//   const [form, setForm] = useState({
//     clinicName: "",
//     email: "",
//     phone: "",
//     yearEstablished: "",
//     location: "",
//     address: "",
//     city: "",
//     state: "",
//     staffName: "",
//     qualification: "",
//   });

//   const [file, setFile] = useState(null);

//   useEffect(() => {
//     loadProfile();
//   }, []);



//   const loadProfile = async () => {
//     try {
//       const clinicId = localStorage.getItem("clinicId");

//       if (!clinicId) {
//         console.log("⚠ No clinicId — Create profile first");
//         return;
//       }

//       const res = await getProfileData(); // get existing profile

//       if (Array.isArray(res.data) && res.data.length > 0) {
//         const clinic = res.data[0];
//         const staff = clinic.staff?.[0] || {};

//         setProfile(clinic);

//         setForm({
//           clinicName: clinic.clinicName || "",
//           email: clinic.email || "",
//           phone: clinic.phone || "",
//           yearEstablished: clinic.yearEstablished || "",
//           location: clinic.location || "",
//           address: clinic.address || "",
//           city: clinic.city || "",
//           state: clinic.state || "",
//           staffName: staff.name || "",
//           qualification: staff.qualification || "",
//         });
//       }
//     } catch (err) {
//       toast.error("Failed to load profile");
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//     Object.entries(form).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     const userId = localStorage.getItem("userId");
//     if (userId) {
//       formData.append("userId", userId);
//     }

//     if (file) {
//       formData.append("proofDocument", file);
//     }

//     try {
//       const clinicId = localStorage.getItem("clinicId");
//       let res;

//       if (clinicId) {
//         // 🔥 UPDATE PROFILE API
//         formData.append("clinicId", clinicId);

//         res = await updateProfileData(formData);
//         toast.success("Profile updated successfully!");

//         // ❌ Do NOT auto fetch again
//         // ❌ Do NOT reset UI
//       } else {
//         // 🔥 CREATE PROFILE
//         res = await createProfileData(formData);

//         if (res?.data?._id) {
//           localStorage.setItem("clinicId", res.data._id);
//         }

//         toast.success("Profile created successfully!");
//       }

//     } catch (err) {
//       toast.error("Something went wrong");
//     }
//   };
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
//       {/* HEADER */}
//       <div className="max-w-4xl mx-auto mb-8">
//         <h1 className="text-2xl font-bold text-teal-700 mb-2">Clinic Info</h1>
//         <p className="text-sm text-teal-600 mb-6">
//           Setting Up Your Profile For Compliance Tracking
//         </p>
//       </div>

//       {/* FORM */}
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white border border-teal-100 rounded-lg p-8">
//           <h2 className="text-2xl font-bold text-center text-teal-700 mb-2">
//             Set up your clinic profile
//           </h2>
//           <p className="text-center text-teal-600 text-sm mb-8">
//             Please Provide Basic Details To Begin Your Compliance Journey
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* BASIC DETAILS */}
//             <div>
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-10 h-10 rounded-full border-2 border-teal-600 flex items-center justify-center">
//                   <Building2 className="w-5 h-5 text-teal-600" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-teal-700">
//                   Basic Details
//                 </h3>
//               </div>

//               <div className="space-y-4">
//                 {/* Clinic Name */}
//                 <div>
//                   <label className="text-sm font-semibold text-teal-700 block mb-2">
//                     Clinic Name
//                   </label>
//                   <div className="relative">
//                     <Building2 className="absolute left-4 top-3.5 w-5 h-5 text-teal-600" />
//                     <input
//                       type="text"
//                       name="clinicName"
//                       placeholder="Clinic Name"
//                       value={form.clinicName}
//                       onChange={handleChange}
//                       className="w-full pl-12 pr-4 py-3 bg-blue-100 border border-blue-200 rounded-lg text-black"
//                     />
//                   </div>
//                 </div>

//                 {/* Email + Phone */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-sm font-semibold text-teal-700 block mb-2">
//                       Email
//                     </label>
//                     <div className="relative">
//                       <Mail className="absolute left-4 top-3.5 w-5 h-5 text-teal-600" />
//                       <input
//                         type="email"
//                         name="email"
//                         placeholder="abc@gmail.com"
//                         value={form.email}
//                         onChange={handleChange}
//                         className="w-full pl-12 pr-4 py-3 bg-blue-100 border border-blue-200 rounded-lg text-black"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="text-sm font-semibold text-teal-700 block mb-2">
//                       Phone
//                     </label>
//                     <div className="relative">
//                       <Phone className="absolute left-4 top-3.5 w-5 h-5 text-teal-600" />
//                       <input
//                         type="tel"
//                         name="phone"
//                         placeholder="9876543210"
//                         value={form.phone}
//                         onChange={handleChange}
//                         className="w-full pl-12 pr-4 py-3 bg-blue-100 border border-blue-200 rounded-lg text-black"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Year + Location */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-sm font-semibold text-teal-700 block mb-2">
//                       Year Established
//                     </label>
//                     <input
//                       type="text"
//                       name="yearEstablished"
//                       value={form.yearEstablished}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 bg-blue-100 border border-blue-200 rounded-lg text-black"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-semibold text-teal-700 block mb-2">
//                       Location
//                     </label>
//                     <input
//                       type="text"
//                       name="location"
//                       value={form.location}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 bg-blue-100 border border-blue-200 rounded-lg text-black"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* ADDRESS */}
//             <div className="border-t border-gray-200 pt-8">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-10 h-10 rounded-full border-2 border-teal-600 flex items-center justify-center">
//                   <MapPin className="w-5 h-5 text-teal-600" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-teal-700">
//                   Address & Contact
//                 </h3>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className="text-sm font-semibold text-teal-700 block mb-2">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     name="address"
//                     value={form.address}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-blue-100 border border-blue-200 rounded-lg text-black"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-sm font-semibold text-teal-700 block mb-2">
//                       City
//                     </label>
//                     <input
//                       type="text"
//                       name="city"
//                       value={form.city}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 bg-blue-100 border border-blue-200 rounded-lg text-black"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-semibold text-teal-700 block mb-2">
//                       State
//                     </label>
//                     <input
//                       type="text"
//                       name="state"
//                       value={form.state}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 bg-blue-100 border border-blue-200 rounded-lg text-black"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* STAFF */}
//             <div className="border-t border-gray-200 pt-8">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-10 h-10 rounded-full border-2 border-teal-600 flex items-center justify-center">
//                   <User className="w-5 h-5 text-teal-600" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-teal-700">
//                   Staff Credentials
//                 </h3>
//               </div>

//               <div className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-sm font-semibold text-teal-700 block mb-2">
//                       Staff Name
//                     </label>
//                     <input
//                       type="text"
//                       name="staffName"
//                       value={form.staffName}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 bg-blue-100 border border-blue-200 rounded-lg text-black"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-semibold text-teal-700 block mb-2">
//                       Qualification
//                     </label>
//                     <input
//                       type="text"
//                       name="qualification"
//                       value={form.qualification}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 bg-blue-100 border border-blue-200 rounded-lg text-black"
//                     />
//                   </div>
//                 </div>

//                 {/* File Upload */}
//                 <div>
//                   <label className="text-sm font-semibold text-teal-700 block mb-2">
//                     Proof Document (PDF)
//                   </label>
//                   <input
//                     type="file"
//                     accept="application/pdf"
//                     onChange={(e) => setFile(e.target.files[0])}
//                     className="w-full px-4 py-3 bg-blue-100 border border-blue-200 rounded-lg text-black"
//                   />
//                   {file && (
//                     <p className="text-sm text-teal-600 mt-2">
//                       ✓ {file.name}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>



//             {/* BUTTONS */}
//             <div className="border-t border-gray-200 pt-8 flex gap-4 justify-center">
//               {/* Clear Button */}
//               <button
//                 type="button"
//                 onClick={() => {
//                   setForm({
//                     clinicName: "",
//                     email: "",
//                     phone: "",
//                     yearEstablished: "",
//                     location: "",
//                     address: "",
//                     city: "",
//                     state: "",
//                     staffName: "",
//                     qualification: "",
//                   });
//                   setFile(null);
//                 }}
//                 className="px-8 py-2.5 border-2 border-teal-600 text-teal-600 font-semibold rounded-lg flex items-center gap-2"
//               >
//                 Clear
//               </button>

//               {/* Always Show Only CREATE PROFILE BUTTON */}
//               <button
//                 type="submit"
//                 className="px-8 py-2.5 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 flex items-center gap-2"
//               >
//                 <User className="w-5 h-5" />
//                 Create Profile
//               </button>
//             </div>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileTab;


import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createProfileData,
  getProfileData,
  updateProfileData,
} from "../../services/api";
import { Mail, Phone, MapPin, Building2, User } from "lucide-react";

const ProfileTab = () => {
  const [profile, setProfile] = useState(null);
  const [file, setFile] = useState(null);
 

  const [form, setForm] = useState({
    clinicName: "",
    email: "",
    phone: "",
    yearEstablished: "",
    location: "",
    address: "",
    city: "",
    state: "",
    staffName: "",
    qualification: "",
  });



  useEffect(() => {
    const clinicId = localStorage.getItem("clinicId");

    if (clinicId) {
      loadProfile();
    }
  }, []);


  const loadProfile = async () => {
    try {
      const res = await getProfileData();

      if (!res) return; // 🔥 NEW USER → STOP

      if (Array.isArray(res.data) && res.data.length > 0) {
        const clinic = res.data[0];
        const staff = clinic.staff?.[0] || {};

        setProfile(clinic);
        setForm({
          clinicName: clinic.clinicName || "",
          email: clinic.email || "",
          phone: clinic.phone || "",
          yearEstablished: clinic.yearEstablished || "",
          location: clinic.location || "",
          address: clinic.address || "",
          city: clinic.city || "",
          state: clinic.state || "",
          staffName: staff.name || "",
          qualification: staff.qualification || "",
        });
      }
    } catch (error) {
      console.log("Profile fetch skipped / failed:", error.message);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const userId = localStorage.getItem("userId");
    if (userId) formData.append("userId", userId);
    if (file) formData.append("proofDocument", file);

    try {
      const clinicId = localStorage.getItem("clinicId");

      let res;

      if (clinicId) {
        // 🔥 UPDATE MODE
        formData.append("clinicId", clinicId);
        res = await updateProfileData(formData);
        toast.success("Profile updated successfully!");
      } else {
        // 🔥 CREATE MODE
        res = await createProfileData(formData);

        if (res?.data?._id) {
          localStorage.setItem("clinicId", res.data._id);
        }

        toast.success("Profile created successfully!");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-teal-700 mb-2">Clinic Info</h1>
        <p className="text-sm text-teal-600 mb-6">
          Setting Up Your Profile For Compliance Tracking
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-teal-100 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-teal-700 mb-2">
            Set up your clinic profile
          </h2>
          <p className="text-center text-teal-600 text-sm mb-8">
            Please Provide Basic Details To Begin Your Compliance Journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* BASIC DETAILS */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full border-2 border-teal-600 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-teal-700">
                  Basic Details
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-teal-700 block mb-2">
                    Clinic Name
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-3.5 w-5 h-5 text-teal-600" />
                    <input
                      type="text"
                      name="clinicName"
                      value={form.clinicName}
                      placeholder="Clinic Name"
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-blue-100 border border-blue-200 rounded-lg text-black"
                    />
                  </div>
                </div>

                {/* EMAIL + PHONE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-teal-700 block mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 w-5 h-5 text-teal-600" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        placeholder="abc@gmail.com"
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-blue-100 border border-blue-200 rounded-lg text-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-teal-700 block mb-2">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 w-5 h-5 text-teal-600" />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        placeholder="9876543210"
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-blue-100 border border-blue-200 rounded-lg text-black"
                      />
                    </div>
                  </div>
                </div>

                {/* YEAR + LOCATION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-teal-700 block mb-2">
                      Year Established
                    </label>
                    <input
                      type="text"
                      name="yearEstablished"
                      value={form.yearEstablished}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-blue-100 border border-blue-200 rounded-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-teal-700 block mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-blue-100 border border-blue-200 rounded-lg text-black"
                    />
                  </div>

                 
                </div>
              </div>
            </div>

            {/* ADDRESS SECTION */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full border-2 border-teal-600 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-teal-700">
                  Address & Contact
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-teal-700 block mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-blue-100 border border-blue-200 rounded-lg text-black"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-teal-700 block mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-blue-100 border border-blue-200 rounded-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-teal-700 block mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-blue-100 border border-blue-200 rounded-lg text-black"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* STAFF SECTION */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full border-2 border-teal-600 flex items-center justify-center">
                  <User className="w-5 h-5 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-teal-700">
                  Staff Credentials
                </h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-teal-700 block mb-2">
                      Staff Name
                    </label>
                    <input
                      type="text"
                      name="staffName"
                      value={form.staffName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-blue-100 border border-blue-200 rounded-lg text-black"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-teal-700 block mb-2">
                      Qualification
                    </label>
                    <input
                      type="text"
                      name="qualification"
                      value={form.qualification}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-blue-100 border border-blue-200 rounded-lg text-black"
                    />
                  </div>
                </div>

                {/* UPLOAD */}
                <div>
                  <label className="text-sm font-semibold text-teal-700 block mb-2">
                    Proof Document (PDF)
                  </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full px-4 py-3 bg-blue-100 border border-blue-200 rounded-lg text-black"
                  />

                  {file && (
                    <p className="text-sm text-teal-600 mt-2">✓ {file.name}</p>
                  )}
                </div>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="border-t border-gray-200 pt-8 flex gap-4 justify-center">
              <button
                type="button"
                onClick={() => {
                  setForm({
                    clinicName: "",
                    email: "",
                    phone: "",
                    yearEstablished: "",
                    location: "",
                    address: "",
                    city: "",
                    state: "",
                    staffName: "",
                    qualification: "",
                  });
                  setFile(null);
                }}
                className="px-8 py-2.5 border-2 border-teal-600 text-teal-600 font-semibold rounded-lg"
              >
                Clear
              </button>

              <button
                type="submit"
                className="px-8 py-2.5 bg-teal-600 text-white font-semibold rounded-lg"
              >
                {localStorage.getItem("clinicId")
                  ? "Update Profile"
                  : "Create Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
