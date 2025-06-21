"use client";
import { useEffect, useState } from "react";
import { getReports } from "@/services/api";
import Link from "next/link";

export default function ReportListPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReports().then((res) => setReports(res.data));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl mb-4">All Medical Reports</h2>
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Report Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.id} className="border-t">
              <td>{r.id}</td>
              <td>{r.patient.name}</td>
              <td>{r.report_type}</td>
              <td>
                <Link
                  href={`/reports/view/${r.id}`}
                  className="text-blue-600 underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
