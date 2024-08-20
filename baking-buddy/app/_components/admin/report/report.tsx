import React from 'react';
import styles from '@/css/report.module.css';

interface ReportResponse {
    id: string;
    reporter: string;
    reported: string;
    reportType: string;
    reason: string;
    isCompleted: boolean;
    completeAdmin: string;
}

interface ReportProps {
    reports: ReportResponse[];
    onApprove: (id: string) => void;
}

const Report: React.FC<ReportProps> = ({ reports, onApprove }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Report Requests</h1>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>신고자</th>
                    <th>신고된 사람</th>
                    <th>종류</th>
                    <th>이유</th>
                    <th>상태</th>
                    <th>완료 여부</th>
                </tr>
                </thead>
                <tbody>
                {reports.map(report => (
                    <tr key={report.id}>
                        <td>{report.reporter}</td>
                        <td>{report.reported}</td>
                        <td>{report.reportType}</td>
                        <td>{report.reason}</td>
                        <td>{report.isCompleted ? '완료' : '대기중'}</td>
                        <td>
                            {!report.isCompleted ? (
                                <button
                                    className={styles.button}
                                    onClick={() => onApprove(report.id)}
                                >
                                    Approve
                                </button>
                            ) : (
                                <button
                                    className={styles.button}
                                    disabled
                                >
                                    Approved
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Report;
