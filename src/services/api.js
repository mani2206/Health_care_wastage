import {
  API_BASE_URL,
  API_KEY,
  REGISTER_API_KEY,
  Forgot_BASE_URL,
  Reset_BASE_URL,
} from "../utils/constants";

//   const response = await fetch(`${API_BASE_URL}/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       apikey: API_KEY,
//     },
//     body: JSON.stringify({ email, password }),
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Invalid login credentials.");
//   }

//   return data;
// };

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: API_KEY,
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  console.log(data, "data--");

  if (!response.ok) {
    throw new Error(data.message || "Invalid login credentials.");
  }

  // Save token to localStorage
  localStorage.setItem("token", data.data.token);
  // localStorage.setItem("userEmail", data.data.email);
  localStorage.setItem("userRole", data.data.role);
  localStorage.setItem("userId", data.data.userId);

  return data;
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apiKey: REGISTER_API_KEY,
    },
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
      role: userData.userType,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed.");
  }

  return data;
};

export const forgotPassword = async (email) => {
  const response = await fetch(`${Forgot_BASE_URL}/forgetPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apiKey: API_KEY,
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  return data;
};

export const resetPassword = async (email, otp, newPassword) => {
  const response = await fetch(`${Reset_BASE_URL}/resetPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apiKey: API_KEY,
    },
    body: JSON.stringify({
      email: email,
      otp: otp,
      newPassword: newPassword,
    }),
  });

  return await response.json();
};

export const createProfileData = async (formData) => {
  const response = await fetch(
    "https://project01-a7ht.onrender.com/dev/v1/createProfileData",
    {
      method: "POST",
      headers: {
        apiKey: "mnbvcxzasdfghjkpoiuytrewq1234567890",
      },
      body: formData,
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Something went wrong");

  // 🎯 Save clinic _id in localStorage
  if (data?.data?._id) {
    localStorage.setItem("clinicId", data.data._id);
  }

  return data;
};

// export const getProfileData = async () => {
//   const clinicId = localStorage.getItem("clinicId");
//   const token = localStorage.getItem("token");

//   if (!clinicId) throw new Error("Clinic ID not found in localStorage");
//   if (!token) throw new Error("Token not found in localStorage");

//   const response = await fetch(
//     "https://project01-a7ht.onrender.com/dev/v1/getProfileData",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         apiKey: "mnbvcxzasdfghjkpoiuytrewq1234567890",
//         Authorization: `Bearer ${token}`, // ✅ Correct Bearer token
//       },
//       body: JSON.stringify({ clinicId }), // ✅ Raw JSON body
//     }
//   );

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Failed to fetch profile");
//   }

//   return data;
// };

export const getProfileData = async () => {
  const clinicId = localStorage.getItem("clinicId");
  const token = localStorage.getItem("token");

  // 🚫 NEW USER → JUST RETURN null (DON'T THROW ERROR)
  if (!clinicId) return null;
  if (!token) return null;

  const response = await fetch(
    "https://project01-a7ht.onrender.com/dev/v1/getProfileData",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: "mnbvcxzasdfghjkpoiuytrewq1234567890",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ clinicId }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch profile");
  }

  return data;
};

export const updateProfileData = async (formData) => {
  const res = await fetch(
    "https://project01-a7ht.onrender.com/dev/v1/updateProfileData",
    {
      method: "POST",
      headers: {
        apiKey: "mnbvcxzasdfghjkpoiuytrewq1234567890",
      },
      body: formData, // must be FormData
    }
  );

  return res.json();
};

export const getComplianceFiles = async (userId) => {
  const res = await fetch(
    `https://project01-a7ht.onrender.com/dev/v1/getDocument/${userId}`,
    {
      method: "GET",
      headers: {
        apiKey: "mnbvcxzasdfghjkpoiuytrewq1234567890",
      },
    }
  );

  return res.json();
};
