"use client";

import { useState } from 'react';
import { addPatient } from '@/services/api';
import { useRouter } from 'next/navigation';

const AddPatientPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', age: '', gender: '', city: '' ,phone: ''});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addPatient(formData);
      if (response.status === 200 || response.status === 201) {
        setSuccess(true); // ✅ show message
        setError('');
        // ✅ wait 2 seconds, then redirect
        setTimeout(() => {
          router.push('/patients');
        }, 2000);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to save patient. Server error.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Add New Patient</h2>

      {/* ✅ Success message */}
      {success && (
        <div className="bg-green-100 text-green-800 p-2 rounded mb-4">
          ✅ Patient added successfully! Redirecting...
        </div>
      )}

      {/* ❌ Error message */}
      {error && (
        <div className="bg-red-100 text-red-800 p-2 rounded mb-4">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-1/2">
        <input name="name" placeholder="Name" className="border p-2" onChange={handleChange} required />
        <input name="age" placeholder="Age" type="number" className="border p-2" onChange={handleChange} required />
        <select name="gender" className="border p-2" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input name="city" placeholder="City" className="border p-2" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" className="border p-2" onChange={handleChange} />
        <button type="submit" className="bg-green-500 text-white px-4 py-2">Save</button>
      </form>
    </div>
  );
};

export default AddPatientPage;
