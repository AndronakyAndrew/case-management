"use client";

import React, { useEffect, useState } from 'react';

interface Client {
    name: string;
}

const getAuthToken = (): string | null => {
    // Get authToken from browser cookies
    const match = document.cookie.match(new RegExp('(^| )' + 'authToken' + '=([^;]+)'));
    return match ? match[2] : null;
};

const ClientsPage = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const fetchClients = async () => {
        try {
            const authToken = getAuthToken();
            // Fetch clients from API endpoint.
            const response = await fetch('http://localhost:8080/cases', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                cache: 'no-store',
            });
            if (!response.ok) {
                throw new Error('Error fetching clients');
            }
            const data: Client[] = await response.json();
            setClients(data);
        } catch (err: any) {
            setError(err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    if (loading) {
        return <div>Loading clients...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Клиенты</h1>
            {clients.length > 0 ? (
                <ul>
                    {clients.map((client, index) => (
                        <li key={index}>
                            {client.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No clients found</div>
            )}
        </div>
    );
};

export default ClientsPage;