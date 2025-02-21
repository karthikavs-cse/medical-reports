import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export default function ReportList() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { patientId } = router.query;

  useEffect(() => {
    if (!patientId) return;
    axios.get(`/patients/${patientId}/reports`)
      .then((res) => setReports(res.data))
      .catch((err) => console.error("Failed to fetch reports:", err))
      .finally(() => setLoading(false));
  }, [patientId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <Link href={`/patients/${patientId}/reports/new`}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          + Create New Report
        </button>
      </Link>
      {loading ? (
        <p>Loading reports...</p>
      ) : reports.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Report Type</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-100">
                <td className="p-2 border">{report.type}</td>
                <td className="p-2 border">{new Date(report.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reports available.</p>
      )}
    </div>
  );
}
