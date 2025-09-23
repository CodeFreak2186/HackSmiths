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
