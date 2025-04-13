import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Define a function to add a patient
export const addPatient = async (patientData) => {
  try {
    const response = await api.post("/patients", patientData);  // POST request to add patient
    return response.data;  // Return response data if needed
  } catch (error) {
    console.error("Error adding patient", error);
    throw error;
  }
};

export default api;
