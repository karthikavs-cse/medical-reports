"use client";  // Required for Next.js App Router

import { useEffect, useState } from "react";
import api from "../../services/api";




const ReportsPage = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch("http://localhost:8000/reports/", {  // Update backend IP
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setReports(data);
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };

        fetchReports();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Reports</h1>
            <ul className="list-disc pl-5">
                {reports.length > 0 ? (
                    <ul>
                    {reports.map((report, idx) => (
                      <li key={idx} className="border-b py-2">
                        <p className="font-semibold">{report.title || "Untitled"}</p>
                        <p className="text-sm text-gray-600">{report.description || "No description"}</p>
                      </li>
                    ))}
                  </ul>
                  
                ) : (
                    <p>No reports available.</p>
                )}
            </ul>
        </div>
    );
};

export default ReportsPage;
