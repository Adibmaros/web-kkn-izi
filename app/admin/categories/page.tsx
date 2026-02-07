"use client";

import { useState } from "react";
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "@/hooks/useCategories";

export default function AdminCategories() {
  const { data: categories, isLoading } = useCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const [name, setName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    createMutation.mutate({ name }, { onSuccess: () => setName("") });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId || !editName.trim()) return;
    updateMutation.mutate(
      { id: editId, name: editName },
      {
        onSuccess: () => {
          setEditId(null);
          setEditName("");
        },
      },
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus kategori ini?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Kelola Kategori</h1>

      {/* Form Tambah */}
      <form onSubmit={handleCreate} className="flex gap-3 mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama kategori baru..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
        />
        <button type="submit" disabled={createMutation.isPending} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition cursor-pointer">
          {createMutation.isPending ? "Menyimpan..." : "Tambah"}
        </button>
      </form>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">ID</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Nama</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Artikel</th>
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
            ) : categories?.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500">
                  Belum ada kategori
                </td>
              </tr>
            ) : (
              categories?.map((cat) => (
                <tr key={cat.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{cat.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {editId === cat.id ? (
                      <form onSubmit={handleUpdate} className="flex gap-2">
                        <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-900" />
                        <button type="submit" className="text-blue-600 text-sm font-medium cursor-pointer">
                          Simpan
                        </button>
                        <button type="button" onClick={() => setEditId(null)} className="text-gray-500 text-sm cursor-pointer">
                          Batal
                        </button>
                      </form>
                    ) : (
                      cat.name
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{cat._count?.articles ?? 0}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditId(cat.id);
                        setEditName(cat.name);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:text-red-800 text-sm font-medium cursor-pointer">
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
