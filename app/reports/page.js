"use client";  // Required for Next.js App Router

import { useEffect, useState } from "react";

const ReportsPage = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/docs#/default/get_reports_reports__get", {
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
                {reports.map((report) => (
                    <li key={report.id} className="mb-2">
                        {report.type} - {report.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReportsPage;