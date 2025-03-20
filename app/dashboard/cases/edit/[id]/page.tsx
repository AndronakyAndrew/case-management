"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

type CaseData = {
  caseId: string;
  deadLine: string;
  status: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return "";
}

export default function EditCasePage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Fetch case data on mount
  useEffect(() => {
    const fetchData = async () => {
      const authToken = getCookie("authToken");
      if (!authToken) {
        setError("Unauthorized");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${apiUrl}/cases/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch case data");
        }
        const data = await res.json();
        console.log("CaseId:", id);
        // Ensure caseId is set for updates
        if (!data.caseId) {
          data.caseId = id;
        }
        setCaseData(data);
      } catch (err) {
        console.error(err);
        setError("Error fetching case data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (caseData) {
      setCaseData({ ...caseData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseData) return;
    const authToken = getCookie("authToken");
    try {
      const res = await fetch(`${apiUrl}/cases/update/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(caseData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Response error:", res.status, errorData);
        throw new Error("Failed to update case info");
      }
      alert("Case updated successfully!");
      router.push(`/dashboard/cases/${id}`);
    } catch (err) {
      console.error(err);
      alert("Update failed, please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!caseData) return <div>No case data found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-indigo-200 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-8">Редактировать Дело</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full bg-white shadow-2xl rounded-xl p-8"
      >
        <div className="mb-4">
          <label
            htmlFor="deadLine"
            className="block text-gray-700 font-bold mb-2"
          >
            Срок
          </label>
          <input
            type="date"
            id="deadLine"
            name="deadLine"
            value={caseData.deadLine || ""}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-gray-700 font-bold mb-2"
          >
            Статус
          </label>
          <select
            id="status"
            name="status"
            value={caseData.status || ""}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="В процессе">В процессе</option>
            <option value="Завершен">Завершен</option>
            <option value="Закрыт">Отменен</option>
          </select>
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition duration-200 focus:outline-none"
          >
            Обновить
          </button>
        </div>
      </form>
    </div>
  );
}