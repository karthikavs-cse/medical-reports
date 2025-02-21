import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function AddReport() {
  const router = useRouter();
  const { patientId } = router.query;
  const [reportType, setReportType] = useState("");
  const [fields, setFields] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [message, setMessage] = useState("");

  const reportTypes = ["Blood Picture Report"]; // Can be fetched from backend

  useEffect(() => {
    if (reportType) {
      axios.get(`/report-types/${reportType}`)
        .then((res) => {
          setFields(res.data);
          const initialValues = res.data.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {});
          setFormValues(initialValues);
        })
        .catch(() => setMessage("Failed to load form fields."));
    } else {
      setFields([]);
    }
  }, [reportType]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/reports", { patientId, reportType, ...formValues })
      .then(() => {
        setMessage("Report created successfully!");
        router.push(`/patients/${patientId}/reports`);
      })
      .catch(() => setMessage("Failed to create report."));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Report</h1>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <div className="mb-4">
        <label className="block font-medium mb-2">Report Type</label>
        <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="w-full p-2 border rounded">
          <option value="">Select Report Type</option>
          {reportTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {fields.length > 0 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ label, name, type, unit }) => (
            <div key={name}>
              <label className="block font-medium">{label}</label>
              <input
                type={type}
                name={name}
                value={formValues[name]}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              {unit && <span className="ml-2 text-gray-600">{unit}</span>}
            </div>
          ))}
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Submit Report
          </button>
        </form>
      )}
    </div>
  );
}