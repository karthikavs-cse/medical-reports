import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000';

export const getPatients = () => axios.get(`${API_BASE}/patients`);
export const addPatient = (data) => axios.post(`${API_BASE}/patients`, data);
export const deletePatient = (id) => axios.delete(`${API_BASE}/patients/${id}`);

export const addReport = (data) => axios.post(`${API_BASE}/reports`, data);
export const getReports = () => axios.get(`${API_BASE}/reports`);
export const getReportById = (id) => axios.get(`${API_BASE}/reports/${id}`);
