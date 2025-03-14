"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getAuthToken = (): string | null => {
    // Get authToken from browser cookies
    const match = document.cookie.match(new RegExp("(^| )" + "authToken" + "=([^;]+)"));
    return match ? match[2] : null;
};

export default function NewCasePage() {
    const [caseNumber, setCaseNumber] = useState("");
    const [clientName, setClientName] = useState("");
    const [deadline, setDeadline] = useState(""); // New state for deadline
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            const authToken = getAuthToken();

            const res = await fetch(`${apiUrl}/cases/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({ caseNumber, clientName, deadline }), // Include deadline here
            });

            if (!res.ok) {
                throw new Error("Failed to create case.");
            }

            //const caseData = await res.json();
            router.push(`/dashboard/cases`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Создать новое дело</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Номер дела</label>
                    <input
                        type="text"
                        value={caseNumber}
                        onChange={(e) => setCaseNumber(e.target.value)}
                        className="border rounded px-3 py-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Имя клиента</label>
                    <input
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="border rounded px-3 py-2 w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Срок</label>
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="border rounded px-3 py-2 w-full"
                    />
                </div>
                <Button type="submit" disabled={loading}>
                    {loading ? "Создание..." : "Создать дело"}
                </Button>
            </form>
        </div>
    );
}