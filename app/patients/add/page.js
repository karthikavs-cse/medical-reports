"use client";  // Add this as the first line

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../services/api';

const AddPatientPage = () => {
  const [form, setForm] = useState({ name: '', age: '', gender: '', phone: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.addPatient(form);  // Make sure this function exists in your api.js
    alert('Patient added successfully!');
    router.push('/patients');  // Navigate back to patient list
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Add Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 w-full" required />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} className="border p-2 w-full" required />
        <select name="gender" value={form.gender} onChange={handleChange} className="border p-2 w-full" required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="border p-2 w-full" pattern="\d{10}" required />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Add Patient</button>
      </form>
    </div>
  );
};

export default AddPatientPage;
