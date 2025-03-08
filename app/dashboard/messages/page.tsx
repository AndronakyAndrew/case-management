'use client'

import { useState, FormEvent } from 'react';

type Message = {
    id: number;
    text: string;
    createdAt: Date;
};

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;
        const newMessage: Message = {
            id: messages.length ? messages[messages.length - 1].id + 1 : 1,
            text: input,
            createdAt: new Date(),
        };
        setMessages([...messages, newMessage]);
        setInput('');
    };

    return (
        <div
            style={{
                padding: '2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f2f2f2',
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    background: '#fff',
                    padding: '2rem',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>
                    Messages
                </h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '1.5rem' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter your message"
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            fontSize: '1rem',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            marginRight: '0.5rem',
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: '0.75rem 1rem',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Send
                    </button>
                </form>
                <ul style={{ listStyle: 'none', padding: 0, maxHeight: '300px', overflowY: 'auto', marginBottom: '2rem' }}>
                    {messages.map((message) => (
                        <li
                            key={message.id}
                            style={{
                                padding: '0.75rem',
                                borderBottom: '1px solid #eee',
                            }}
                        >
                            {message.text}
                        </li>
                    ))}
                </ul>
                <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#333' }}>Message History</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ccc', padding: '0.5rem', backgroundColor: '#f9f9f9' }}>ID</th>
                            <th style={{ border: '1px solid #ccc', padding: '0.5rem', backgroundColor: '#f9f9f9' }}>Message</th>
                            <th style={{ border: '1px solid #ccc', padding: '0.5rem', backgroundColor: '#f9f9f9' }}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((message) => (
                            <tr key={message.id}>
                                <td style={{ border: '1px solid #ccc', padding: '0.5rem', textAlign: 'center' }}>{message.id}</td>
                                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{message.text}</td>
                                <td style={{ border: '1px solid #ccc', padding: '0.5rem', textAlign: 'center' }}>
                                    {message.createdAt.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}