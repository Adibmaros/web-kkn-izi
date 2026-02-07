"use client";

import { useState } from "react";
import { useVideos, useCreateVideo, useUpdateVideo, useDeleteVideo } from "@/hooks/useVideos";

export default function AdminVideos() {
  const { data: videos, isLoading } = useVideos();
  const createMutation = useCreateVideo();
  const updateMutation = useUpdateVideo();
  const deleteMutation = useDeleteVideo();

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", youtubeUrl: "" });

  const resetForm = () => {
    setForm({ title: "", youtubeUrl: "" });
    setShowForm(false);
    setEditId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      updateMutation.mutate({ id: editId, ...form }, { onSuccess: resetForm });
    } else {
      createMutation.mutate(form, { onSuccess: resetForm });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus video ini?")) {
      deleteMutation.mutate(id);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Video</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition cursor-pointer"
        >
          + Tambah Video
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul Video</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
              placeholder="Judul video"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL YouTube</label>
            <input
              type="url"
              required
              value={form.youtubeUrl}
              onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={isPending} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition cursor-pointer">
              {isPending ? "Menyimpan..." : editId ? "Update" : "Simpan"}
            </button>
            <button type="button" onClick={resetForm} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition cursor-pointer">
              Batal
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Judul</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">URL</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Tanggal</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500">
                  Memuat...
                </td>
              </tr>
            ) : videos?.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500">
                  Belum ada video
                </td>
              </tr>
            ) : (
              videos?.map((video) => (
                <tr key={video.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{video.title}</td>
                  <td className="px-6 py-4 text-sm text-blue-600 max-w-xs truncate">
                    <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {video.youtubeUrl}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(video.createdAt).toLocaleDateString("id-ID")}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditId(video.id);
                        setForm({ title: video.title, youtubeUrl: video.youtubeUrl });
                        setShowForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(video.id)} className="text-red-600 hover:text-red-800 text-sm font-medium cursor-pointer">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
