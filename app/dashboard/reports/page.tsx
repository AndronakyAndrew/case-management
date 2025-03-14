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

    // Handlers to add focus styling for input & textarea
    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.currentTarget.style.borderColor = '#007acc';
        e.currentTarget.style.boxShadow = '0 0 5px rgba(0, 122, 204, 0.5)';
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.currentTarget.style.borderColor = '#ccc';
        e.currentTarget.style.boxShadow = 'none';
    };

    return (
        <div style={{
            minHeight: '100vh',
            padding: '40px 20px',
            background: 'linear-gradient(135deg, #e0eafc, #cfdef3)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            <h1 style={{
                textAlign: 'center',
                color: '#333',
                marginBottom: '30px',
                fontSize: '2.5rem'
            }}>
                
            </h1>
            
            {/* New Report Form */}
            <div style={{
                maxWidth: '600px',
                margin: '0 auto 40px',
                padding: '30px',
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid #eaeaea'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    color: '#007acc',
                    marginBottom: '20px',
                    fontSize: '1.75rem'
                }}>
                    Добавить отчет
                </h2>
                <form onSubmit={handleAddReport}>
                <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: '#444',
                            fontWeight: 600
                        }}>
                            Название:
                        </label>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={e => setNewTitle(e.target.value)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                                fontSize: '1rem',
                                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: '#444',
                            fontWeight: 600
                        }}>
                            Описание:
                        </label>
                        <textarea
                            value={newDescription}
                            onChange={e => setNewDescription(e.target.value)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                                fontSize: '1rem',
                                minHeight: '120px',
                                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                outline: 'none'
                            }}
                        />
                    </div>
                    {formError && <p style={{
                        color: '#d32f2f',
                        marginBottom: '20px',
                        textAlign: 'center',
                        fontWeight: 500,
                        transition: 'opacity 0.3s ease'
                    }}>{formError}</p>}
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: '#007acc',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: 600,
                            transition: 'background 0.3s ease, box-shadow 0.3s ease'
                        }}
                        onMouseOver={e => {
                            e.currentTarget.style.background = '#005fa3';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 95, 163, 0.5)';
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.background = '#007acc';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                        onFocus={e => {
                            e.currentTarget.style.outline = '2px solid #005fa3';
                            e.currentTarget.style.boxShadow = '0 0 5px rgba(0, 95, 163, 0.5)';
                        }}
                        onBlur={e => {
                            e.currentTarget.style.outline = 'none';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        Добавить отчет
                    </button>
                </form>
            </div>

            {/* Reports List */}
            {loading ? (
                <p style={{
                    textAlign: 'center',
                    color: '#555',
                    fontSize: '1.2rem'
                }}>Загрузка отчетов...</p>
            ) : error ? (
                <p style={{
                    textAlign: 'center',
                    color: 'red',
                    fontSize: '1.2rem'
                }}>{error}</p>
            ) : reports.length > 0 ? (
                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    {reports.map(report => (
                        <li key={report.id} style={{
                            background: '#fff',
                            marginBottom: '20px',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                            borderLeft: '5px solid #007acc',
                            transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                        onMouseOver={e => {
                            e.currentTarget.style.transform = 'scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)';
                        }}
                        >
                            <h2 style={{
                                margin: '0 0 10px 0',
                                color: '#007acc',
                                fontSize: '1.5rem'
                            }}>{report.title}</h2>
                            <p style={{
                                margin: 0,
                                color: '#666',
                                fontSize: '1rem'
                            }}>{report.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{
                    textAlign: 'center',
                    color: '#555',
                    fontSize: '1.2rem'
                }}>Нет доступных отчетов.</p>
            )}
        </div>
    );
};

export default ReportsPage;