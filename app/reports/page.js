"use client";
import { useState, useEffect } from "react";
import { getPatients, addReport } from "@/services/api";
import { useRouter } from "next/navigation";

const reportTemplates = {
  "Blood Test": ["Hemoglobin", "WBC Count", "Platelets"],
  "Urine Test": ["Color", "pH", "Protein"],
  "Liver Function": ["ALT", "AST", "Bilirubin"]
};

export default function AddReportPage() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [reportType, setReportType] = useState("Blood Test");
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    getPatients().then((res) => setPatients(res.data));
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      patient_id: parseInt(selectedPatient),
      report_type: reportType,
      report_data: formData
    };
    try {
      await addReport(payload);
      setMessage("✅ Report submitted successfully!");
      setFormData({});
      setSelectedPatient("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to submit report");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Add Medical Report</h2>

      {message && <div className="mb-4 text-green-600">{message}</div>}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Select Patient</label>
        <select
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        >
          <option value="">-- Choose Patient --</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (Age: {p.age}, {p.gender})
            </option>
          ))}
        </select>

        <label className="block mb-2">Report Type</label>
        <select
          value={reportType}
          onChange={(e) => {
            setReportType(e.target.value);
            setFormData({}); // reset on change
          }}
          className="w-full mb-4 p-2 border rounded"
        >
          {Object.keys(reportTemplates).map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>

        {reportTemplates[reportType].map((field) => (
          <div key={field} className="mb-4">
            <label>{field}</label>
            <input
              name={field}
              value={formData[field] || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Report
        </button>
      </form>
    </div>
  );
}
