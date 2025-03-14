'use client'

import React, { useContext, ChangeEvent } from 'react';
import { DarkModeContext } from '../../providers/DarkModeProvider';

const ToggleSwitch = ({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) => {
    const switchContainer: React.CSSProperties = {
        position: 'relative',
        display: 'inline-block',
        width: '60px',
        height: '34px',
        cursor: 'pointer'
    };

    const switchCheckbox: React.CSSProperties = {
        opacity: 0,
        width: 0,
        height: 0,
        position: 'absolute'
    };

    const switchSlider: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: darkMode ? '#4a5568' : '#ccc',
        transition: 'background-color 0.4s',
        borderRadius: '34px',
        boxShadow: 'inset 0 0 5px rgba(0,0,0,0.2)'
    };

    const sliderCircle: React.CSSProperties = {
        position: 'absolute',
        height: '26px',
        width: '26px',
        left: darkMode ? '30px' : '4px',
        bottom: '4px',
        backgroundColor: 'white',
        transition: 'left 0.4s',
        borderRadius: '50%',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    };

    return (
        <div style={switchContainer} onClick={toggleDarkMode}>
            <input 
                type="checkbox" 
                checked={darkMode} 
                onChange={toggleDarkMode} 
                style={switchCheckbox} 
            />
            <div style={switchSlider}>
                <div style={sliderCircle}></div>
            </div>
        </div>
    );
};

const SettingsPage = () => {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const [username, setUsername] = React.useState('');

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px',
        background: darkMode 
            ? 'linear-gradient(135deg, #1a202c, #2d3748)'
            : 'linear-gradient(135deg, #f7fafc, #e2e8f0)',
        minHeight: '100vh',
        transition: 'background 0.5s ease'
    };

    const cardStyle: React.CSSProperties = {
        width: '100%',
        maxWidth: '500px',
        backgroundColor: darkMode ? '#2d3748' : '#ffffff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: darkMode 
            ? '0 8px 16px rgba(0,0,0,0.3)'
            : '0 4px 8px rgba(0, 0, 0, 0.1)',
        color: darkMode ? '#e2e8f0' : '#2d3748',
        transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease'
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ced4da',
        marginTop: '5px',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
    };

    const inputFocusStyle: React.CSSProperties = {
        borderColor: darkMode ? '#90cdf4' : '#3182ce',
        boxShadow: `0 0 5px ${darkMode ? '#90cdf4' : '#3182ce'}`
    };

    const labelStyle: React.CSSProperties = {
        fontWeight: 600,
        marginBottom: '5px',
        display: 'block'
    };

    const headerStyle: React.CSSProperties = {
        marginBottom: '20px', 
        textAlign: 'center', 
        fontSize: '1.5rem'
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h1 style={headerStyle}>Dashboard Settings</h1>
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
                        onFocus={(e) => {
                            Object.assign(e.currentTarget.style, inputFocusStyle);
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = '#ced4da';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                        placeholder="Enter your username"
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="darkMode" style={labelStyle}>
                        Enable Dark Mode:
                    </label>
                    <ToggleSwitch darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                </div>
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                    <h2 style={{ marginBottom: '10px' }}>Current Settings</h2>
                    <p>
                        <strong>Username:</strong> {username || 'Not set'}
                    </p>
                    <p>
                        <strong>Dark Mode:</strong> {darkMode ? 'Enabled' : 'Disabled'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;