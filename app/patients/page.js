"use client";
import { useState, useEffect } from 'react';
import { getPatients } from '@/services/api'; // ✅ Use named import
import Link from 'next/link';

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    getPatients().then((res) => setPatients(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl">Patient List</h2>
        <Link href="/patients/add" className="bg-blue-500 text-white px-4 py-2 rounded">Add Patient</Link>
      </div>
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr><th>Name</th><th>Age</th><th>Gender</th><th>Phone</th></tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id} className="border-t">
              <td>{p.name}</td><td>{p.age}</td><td>{p.gender}</td><td>{p.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsPage;
