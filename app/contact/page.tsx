'use client'
import { useState, useEffect } from 'react';

interface Contact {
    id: number;
    name: string;
    email?: string;
}

const ContactsPage = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        // Simulate fetching data from an API
        const fetchContacts = async () => {
            try {
                // Replace with your API endpoint if needed
                // const response = await fetch('/api/contacts');
                // const data = await response.json();
                const data: Contact[] = [
                    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
                    { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
                ];
                setContacts(data);
            } catch (err) {
                setError('Failed to load contacts.');
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-6">
                <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Contacts</h1>
                {loading ? (
                    <p className="text-center text-gray-600">Loading contacts...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : contacts.length ? (
                    <ul className="space-y-3">
                        {contacts.map((contact) => (
                            <li key={contact.id} className="flex justify-between items-center border px-4 py-2 rounded hover:bg-gray-50 transition">
                                <div>
                                    <p className="font-semibold text-gray-800">{contact.name}</p>
                                    {contact.email && <p className="text-sm text-gray-500">{contact.email}</p>}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-600">No contacts available.</p>
                )}
            </div>
        </div>
    );
};

export default ContactsPage;