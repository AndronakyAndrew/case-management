'use client'

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type EventMap = {
    [date: string]: string[];
};

const CalendarPage = () => {
    const [date, setDate] = useState<Date | [Date, Date] | null>(new Date());
    const [eventText, setEventText] = useState('');
    const [events, setEvents] = useState<EventMap>({});

    // Helper to get selected date as a string key (ignoring time)
    const getDateKey = (d: Date) => d.toDateString();

    const onChange = (
        newDate: Date | [Date, Date] | null, 
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.SyntheticEvent
    ) => {
        setDate(newDate);
    };

    const addEvent = () => {
        if (!eventText.trim() || date === null) return;

        const selectedDate = Array.isArray(date) ? date[0] : date;
        const dateKey = getDateKey(selectedDate);
        setEvents(prev => ({
            ...prev,
            [dateKey]: prev[dateKey] ? [...prev[dateKey], eventText] : [eventText]
        }));
        setEventText('');
    };

    // Determine the currently selected date for event display
    const selectedDate: Date | null = date === null ? null : Array.isArray(date) ? date[0] : date;
    const selectedDateKey = selectedDate ? getDateKey(selectedDate) : '';

    // Enhanced style objects for a more modern look
    const containerStyle = {
        margin: '3rem auto',
        maxWidth: '850px',
        padding: '2rem',
        background: 'linear-gradient(135deg, #fefefe 0%, #e9eff5 100%)',
        borderRadius: '15px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    };

    const headingStyle = {
        textAlign: 'center' as const,
        color: '#2c3e50',
        marginBottom: '1.5rem'
    };

    const subHeadingStyle = {
        color: '#34495e',
        marginBottom: '1rem'
    };

    const inputStyle = {
        padding: '0.7rem',
        borderRadius: '8px',
        border: '1px solid #ccc',
        width: '70%',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.3s'
    };

    const buttonStyle = {
        padding: '0.7rem 1.2rem',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#27ae60',
        color: '#fff',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        marginLeft: '1rem'
    };

    const eventListStyle = {
        listStyleType: 'none',
        padding: 0,
        marginTop: '0.5rem'
    };

    const eventItemStyle = {
        background: '#fff',
        padding: '0.7rem',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        marginBottom: '0.5rem',
        color: '#2c3e50'
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Calendar</h1>
            <Calendar 
                onChange={(newDate, e) => onChange(newDate as Date | [Date, Date] | null, e)} 
                value={date} 
            />
            <div style={{ marginTop: '1.5rem', textAlign: 'center', color: '#7f8c8d' }}>
                {date === null 
                    ? "No date selected" 
                    : Array.isArray(date)
                        ? `Selected range: ${date[0].toDateString()} - ${date[1].toDateString()}`
                        : `Selected date: ${date.toDateString()}`}
            </div>

            {selectedDate && !Array.isArray(date) && (
                <div style={{ marginTop: '2.5rem' }}>
                    <h2 style={subHeadingStyle}>Add Event for {selectedDate.toDateString()}</h2>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <input 
                            type="text" 
                            value={eventText} 
                            onChange={e => setEventText(e.target.value)}
                            placeholder="Enter event details"
                            style={inputStyle}
                        />
                        <button 
                            onClick={addEvent} 
                            style={buttonStyle} 
                            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#2ecc71')}
                            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#27ae60')}
                        >
                            Add Event
                        </button>
                    </div>
                    <div>
                        <h3 style={{ ...subHeadingStyle, marginBottom: '0.7rem' }}>Events:</h3>
                        {events[selectedDateKey] && events[selectedDateKey].length > 0 ? (
                            <ul style={eventListStyle}>
                                {events[selectedDateKey].map((ev, idx) => (
                                    <li key={idx} style={eventItemStyle}>{ev}</li>
                                ))}
                            </ul>
                        ) : (
                            <p style={{ color: '#95a5a6' }}>No events added for this date.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarPage;