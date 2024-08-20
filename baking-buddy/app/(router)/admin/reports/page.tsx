"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from "@/app/constants";
import Report from "@/app/_components/admin/report/report";

interface ReportResponse {
    id: string;
    reporter: string;
    reported: string;
    reportType: string;
    reason: string;
    isCompleted: boolean;
    completeAdmin: string;
}

const ReportPage = () => {
    const [reports, setReports] = useState<ReportResponse[]>([]);

    useEffect(() => {
        async function fetchReports() {
            try {
                const response = await axios.get(`${API_URL}/api/admin/reports`, {
                    withCredentials: true
                });
                const data = response.data.data; // Adjust based on your API response structure
                setReports(data); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        }

        fetchReports();
    }, []);

    const handleApprove = async (id: string) => {
        try {
            await fetch(`${API_URL}/api/admin/reports/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            // Update the report status after successful approval
            setReports(prev =>
                prev.map(report =>
                    report.id === id ? { ...report, isCompleted: true } : report
                )
            );
            alert('Report approved!');
        } catch (error) {
            console.error('Error approving report:', error);
        }
    };

    return (
        <Report reports={reports} onApprove={handleApprove} />
    );
};

export default ReportPage;
