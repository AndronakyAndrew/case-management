'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarPage.css'; // Import custom styles

type EventMap = {
  [date: string]: string[];
};

const CalendarPage = () => {
  const [date, setDate] = useState<Date | [Date, Date] | null>(new Date());
  const [eventText, setEventText] = useState('');
  const [events, setEvents] = useState<EventMap>({});

  const getDateKey = (d: Date) => d.toDateString();

  const onChange = (
    newDate: Date | [Date, Date] | null,
    event: React.MouseEvent<HTMLButtonElement> | React.SyntheticEvent
  ) => {
    setDate(newDate);
  };

  const addEvent = () => {
    if (!eventText.trim() || date === null) return;
    const selectedDate = Array.isArray(date) ? date[0] : date;
    const dateKey = getDateKey(selectedDate);
    setEvents((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey] ? [...prev[dateKey], eventText] : [eventText],
    }));
    setEventText('');
  };

  const deleteEvent = (dateKey: string, index: number) => {
    setEvents((prev) => {
      const updatedEvents = { ...prev };
      updatedEvents[dateKey] = updatedEvents[dateKey].filter((_, idx) => idx !== index);
      if (updatedEvents[dateKey].length === 0) delete updatedEvents[dateKey];
      return updatedEvents;
    });
  };

  const selectedDate: Date | null = date === null ? null : Array.isArray(date) ? date[0] : date;
  const selectedDateKey = selectedDate ? getDateKey(selectedDate) : '';

  return (
    <div className="calendar-container">
      <h1 className="calendar-heading">Calendar</h1>
      <div className="calendar-card">
        <Calendar
          onChange={(newDate, e) => onChange(newDate as Date | [Date, Date] | null, e)}
          value={date}
          tileClassName={({ date: tileDate }) => {
            const tileDateKey = getDateKey(tileDate);
            return events[tileDateKey]?.length ? 'event-tile' : null;
          }}
        />
      </div>
      <p className="info-text">
        {date === null
          ? 'No date selected'
          : Array.isArray(date)
          ? `Selected range: ${date[0].toDateString()} - ${date[1].toDateString()}`
          : `Selected date: ${date.toDateString()}`}
      </p>

      {selectedDate && !Array.isArray(date) && (
        <div className="event-section">
          <h2 className="sub-heading">Add Event for {selectedDate.toDateString()}</h2>
          <div className="event-input-group">
            <input
              type="text"
              value={eventText}
              onChange={(e) => setEventText(e.target.value)}
              placeholder="Enter event details"
              className="event-input"
              aria-label="Event details"
            />
            <button onClick={addEvent} className="add-button" aria-label="Add Event">
              Add Event
            </button>
          </div>
          <div className="events-card">
            <h3 className="events-heading">Events:</h3>
            {events[selectedDateKey] && events[selectedDateKey].length > 0 ? (
              <ul className="event-list">
                {events[selectedDateKey].map((ev, idx) => (
                  <li key={idx} className="event-item">
                    <span>{ev}</span>
                    <button
                      onClick={() => deleteEvent(selectedDateKey, idx)}
                      className="delete-button"
                      aria-label={`Delete event: ${ev}`}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-events">No events added for this date.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;