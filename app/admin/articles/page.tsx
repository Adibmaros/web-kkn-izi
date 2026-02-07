"use client";

import { useState } from "react";
import Link from "next/link";
import { useArticles, useDeleteArticle } from "@/hooks/useArticles";

export default function AdminArticles() {
  const { data: articles, isLoading } = useArticles();
  const deleteMutation = useDeleteArticle();
  const [search, setSearch] = useState("");

  const filtered = articles?.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus artikel ini?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Kelola Artikel</h1>
        <Link href="/admin/articles/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
          + Tambah Artikel
        </Link>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari artikel..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Judul</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Kategori</th>
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
            ) : filtered?.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500">
                  Belum ada artikel
                </td>
              </tr>
            ) : (
              filtered?.map((article) => (
                <tr key={article.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{article.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">{article.category.name}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(article.createdAt).toLocaleDateString("id-ID")}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link href={`/admin/articles/${article.id}/edit`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(article.id)} className="text-red-600 hover:text-red-800 text-sm font-medium cursor-pointer">
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
