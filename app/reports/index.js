// frontend/pages/reports/index.js
import { useEffect, useState } from 'react';
import { getReports } from '@/services/api';

export default function ReportList() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReports().then(res => setReports(res.data));
  }, []);

  const downloadPDF = (report) => {
    const blob = new Blob(
      [JSON.stringify(report, null, 2)],
      { type: 'application/json' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${report.id}.json`; // temporary, replace with real PDF
    a.click();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">All Reports</h1>
      <ul className="space-y-3">
        {reports.map((r) => (
          <li key={r.id} className="border p-4 rounded shadow-sm">
            <div>Report ID: {r.id}</div>
            <div>Type: {r.report_type}</div>
            <div>Patient ID: {r.patient_id}</div>
            <button onClick={() => downloadPDF(r)} className="mt-2 bg-blue-500 text-white px-3 py-1">
              Download (Mock)
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
