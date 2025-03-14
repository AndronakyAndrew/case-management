"use client"
export default function Error({
    error,
    reset
  }: {
    error: Error;
    reset: () => void;
  }) {
    console.error("Error in CaseDetailPage:", error)
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-200 to-pink-200 p-6">
        <h1 className="text-3xl font-bold text-gray-800">Ой, произошла ошибка!</h1>
        <p className="mt-4 text-lg text-gray-700">{error.message}</p>
        <button
          onClick={() => reset()}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Попробовать снова
        </button>
      </div>
    )
  }