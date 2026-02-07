"use client";

import { useQuestions, useUpdateQuestionStatus, useDeleteQuestion } from "@/hooks/useQuestions";

export default function AdminQuestions() {
  const { data: questions, isLoading } = useQuestions();
  const updateStatus = useUpdateQuestionStatus();
  const deleteMutation = useDeleteQuestion();

  const handleToggleStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "pending" ? "replied" : "pending";
    updateStatus.mutate({ id, status: newStatus });
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus pertanyaan ini?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Kelola Pertanyaan</h1>

      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Memuat...</div>
        ) : questions?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Belum ada pertanyaan</div>
        ) : (
          questions?.map((q) => (
            <div key={q.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{q.name}</h3>
                  <p className="text-sm text-gray-500">{q.phoneNumber}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${q.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>{q.status === "pending" ? "Pending" : "Replied"}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(q.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4 whitespace-pre-wrap">{q.message}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleStatus(q.id, q.status)}
                  className={`text-sm font-medium px-4 py-1.5 rounded-lg transition cursor-pointer ${q.status === "pending" ? "bg-green-600 hover:bg-green-700 text-white" : "bg-yellow-500 hover:bg-yellow-600 text-white"}`}
                >
                  {q.status === "pending" ? "Tandai Replied" : "Tandai Pending"}
                </button>
                <a href={`https://wa.me/${q.phoneNumber.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition">
                  Balas via WA
                </a>
                <button onClick={() => handleDelete(q.id)} className="text-red-600 hover:text-red-800 text-sm font-medium px-4 py-1.5 cursor-pointer">
                  Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
