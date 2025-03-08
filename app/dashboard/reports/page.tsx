'use client'
import React, { useEffect, useState, FormEvent } from 'react';

interface Report {
    id: number;
    title: string;
    description: string;
}

const ReportsPage: React.FC = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // States for new report form
    const [newTitle, setNewTitle] = useState<string>('');
    const [newDescription, setNewDescription] = useState<string>('');
    const [formError, setFormError] = useState<string>('');

    useEffect(() => {
        const fetchReports = async () => {
            try {
                setLoading(true);
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                const fakeData: Report[] = [
                    { id: 1, title: 'Annual Report', description: 'Detailed annual performance with insights and statistics to help you understand the overall progress.' },
                    { id: 2, title: 'Quarterly Report', description: 'In-depth analysis of quarterly trends highlighting growth opportunities and areas of improvement.' },
                ];
                setReports(fakeData);
            } catch (err) {
                setError('Failed to load reports. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    const handleAddReport = (e: FormEvent) => {
        e.preventDefault();
        setFormError('');
        if (!newTitle.trim() || !newDescription.trim()) {
            setFormError('Both title and description are required.');
            return;
        }
        // Create a new report with unique id
        const newReport: Report = {
            id: reports.length ? Math.max(...reports.map(r => r.id)) + 1 : 1,
            title: newTitle.trim(),
            description: newDescription.trim(),
        };
        setReports([newReport, ...reports]);
        setNewTitle('');
        setNewDescription('');
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>Reports Page</h1>
            
            {/* New Report Form */}
            <div style={{
                maxWidth: '600px',
                margin: '0 auto 40px',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ marginBottom: '15px', textAlign: 'center', color: '#222' }}>Add New Report</h2>
                <form onSubmit={handleAddReport}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#444' }}>
                            Title:
                        </label>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={e => setNewTitle(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '4px',
                                border: '1px solid #ccc'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#444' }}>
                            Description:
                        </label>
                        <textarea
                            value={newDescription}
                            onChange={e => setNewDescription(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                minHeight: '80px'
                            }}
                        />
                    </div>
                    {formError && <p style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{formError}</p>}
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '10px',
                            background: '#007acc',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Add Report
                    </button>
                </form>
            </div>

            {loading ? (
                <p style={{ textAlign: 'center', color: '#555' }}>Loading reports...</p>
            ) : error ? (
                <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
            ) : reports.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0, maxWidth: '800px', margin: '0 auto' }}>
                    {reports.map(report => (
                        <li key={report.id} style={{
                            background: '#f9f9f9',
                            marginBottom: '15px',
                            padding: '15px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}>
                            <h2 style={{ margin: '0 0 10px 0', color: '#222' }}>{report.title}</h2>
                            <p style={{ margin: 0, color: '#666' }}>{report.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{ textAlign: 'center', color: '#555' }}>No reports available.</p>
            )}
        </div>
    );
};

export default ReportsPage;