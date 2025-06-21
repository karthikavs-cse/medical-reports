"use client";
import { useEffect, useState } from "react";
import { getReportById } from "@/services/api";
import { useParams } from "next/navigation";

export default function ViewReportPage() {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    getReportById(id).then((res) => setReport(res.data));
  }, [id]);

  if (!report) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl mb-4">Report #{report.id}</h2>
      <p><strong>Patient:</strong> {report.patient.name}</p>
      <p><strong>Type:</strong> {report.report_type}</p>

      <h3 className="mt-4 mb-2 font-bold">Results:</h3>
      <ul className="list-disc pl-6">
        {Object.entries(report.report_data).map(([k, v]) => (
          <li key={k}>
            <strong>{k}:</strong> {v}
          </li>
        ))}
      </ul>

      {/* 👉 Add PDF download button here */}
      <a
        href={`http://127.0.0.1:8000/reports/${id}/pdf`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline mt-4 inline-block"
      >
        Download as PDF
      </a>
    </div>
  );
}
