"use client";

import React, { useEffect, useState } from 'react';

interface Client {
    clientName: string;
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
            setLoading(true);
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
            console.log(data);
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
        return (
            <div className="flex flex-col justify-center items-center h-screen space-y-4 bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="w-16 h-16 border-4 border-t-4 border-white rounded-full animate-spin"></div>
                <p className="text-lg text-white">Loading clients...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-screen space-y-4 bg-red-100">
                <div className="text-xl font-bold text-red-600">Oops!</div>
                <p className="text-lg text-red-600">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <header className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 shadow-lg">
                <h1 className="text-4xl font-extrabold text-white text-center">Клиенты</h1>
            </header>
            <main className="container mx-auto px-4 py-8">
                {clients.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {clients.map((client, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 p-6">
                                <h2 className="text-2xl font-semibold mb-2">{client.clientName}</h2>
                                {/* Additional client details can go here */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-600 text-xl">No clients found</div>
                )}
            </main>
        </div>
    );
};

export default ClientsPage;