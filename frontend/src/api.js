// src/api.js
import axios from "axios";

// Set a base URL for convenience
const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // your backend URL
  headers: { "Content-Type": "application/json" },
});

// Fetch FRA Pattas
export const fetchFRAPattas = async () => {
  try {
    const response = await api.get("/fra/fra_pattas");
    return response.data; // axios stores response in .data
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch FRA Pattas");
  }
};

// User login
export const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;   // this is correct
    
  } catch (error) {
    console.error(error.response?.data || error);
    throw new Error("Login failed");
  }
};


// User registration
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data; // axios stores response in .data
  } catch (error) {
    console.error(error.response?.data || error);
    throw new Error("Registration failed");
  }
};


// Upload FRA Document
export const uploadFRADocument = async (file) => {
  if (!file) throw new Error("No file provided");

  const formData = new FormData();
  formData.append("file", file); // must match backend param name

  try {
    const response = await api.post("/ocr_ner/upload_fi", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data?.success) {
      return response.data.extracted; // return extracted data
    } else {
      console.error("Upload failed:", response.data);
      throw new Error("Upload failed on server");
    }
  } catch (error) {
    console.error("Upload error:", error.response?.data || error.message || error);
    throw new Error("File upload failed");
  }
};


export const fetchDSSRecommendations = async () => {
  try {
    const response = await api.get("/dss/dss_recommendations");
    return response.data; // { success: true, dss_recommendations: [...] }
  } catch (error) {
    console.error("DSS fetch error:", error.response?.data || error);
    throw new Error("Failed to fetch DSS recommendations");
  }
};

