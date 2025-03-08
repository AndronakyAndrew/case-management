'use client'

import React, { useState, useEffect } from 'react';

const SettingsPage = () => {
    const [username, setUsername] = useState('');
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        padding: '40px 20px',
        backgroundColor: darkMode ? '#1a202c' : '#f7fafc',
        minHeight: '100vh',
        transition: 'background-color 0.3s ease'
    };

    const cardStyle: React.CSSProperties = {
        width: '100%',
        maxWidth: '500px',
        backgroundColor: darkMode ? '#2d3748' : '#ffffff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        color: darkMode ? '#e2e8f0' : '#2d3748',
        transition: 'background-color 0.3s ease, color 0.3s ease'
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ced4da',
        marginTop: '5px'
    };

    const buttonStyle: React.CSSProperties = {
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: darkMode ? '#4a5568' : '#3182ce',
        color: '#fff',
        marginTop: '5px'
    };

    const labelStyle: React.CSSProperties = {
        fontWeight: 600
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Dashboard Settings</h1>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="username" style={labelStyle}>
                        Preferred Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        style={inputStyle}
                        placeholder="Enter your username"
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="darkMode" style={labelStyle}>
                        Enable Dark Mode:
                    </label>
                    <br />
                    <button 
                        id="darkMode" 
                        onClick={toggleDarkMode}
                        style={buttonStyle}
                    >
                        {darkMode ? 'On' : 'Off'}
                    </button>
                </div>
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                    <h2 style={{ marginBottom: '10px' }}>Current Settings</h2>
                    <p><strong>Username:</strong> {username || 'Not set'}</p>
                    <p><strong>Dark Mode:</strong> {darkMode ? 'Enabled' : 'Disabled'}</p>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;