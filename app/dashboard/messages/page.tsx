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
        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 flex items-center justify-center p-6">
            <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8">
                    Сообщения
                </h1>
                <form onSubmit={handleSubmit} className="flex mb-8">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Введите свое сообщение..."
                        className="flex-1 p-4 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
                    />
                    <button
                        type="submit"
                        className="px-8 py-4 bg-blue-500 text-white rounded-r-xl hover:bg-blue-600 transition-colors duration-200"
                    >
                        Сохранить
                    </button>
                </form>
                <ul className="mb-8 max-h-60 overflow-y-auto border border-gray-200 rounded-xl">
                    {messages.map((message) => (
                        <li
                            key={message.id}
                            className="p-4 border-b border-gray-200 last:border-0 transition-transform transform hover:scale-105 hover:bg-gray-50"
                        >
                            {message.text}
                        </li>
                    ))}
                </ul>
                <h2 className="text-3xl font-semibold text-gray-700 text-center mb-6">
                    История сообщений
                </h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border px-6 py-3 text-center">№</th>
                                <th className="border px-6 py-3">Сообщение</th>
                                <th className="border px-6 py-3 text-center">Дата и время</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((message) => (
                                <tr key={message.id} className="transition-colors duration-200 hover:bg-gray-100 even:bg-gray-50">
                                    <td className="border px-6 py-3 text-center">{message.id}</td>
                                    <td className="border px-6 py-3">{message.text}</td>
                                    <td className="border px-6 py-3 text-center">
                                        {message.createdAt.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
