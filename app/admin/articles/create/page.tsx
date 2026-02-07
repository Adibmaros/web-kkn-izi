"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateArticle } from "@/hooks/useArticles";
import { useCategories } from "@/hooks/useCategories";

export default function CreateArticle() {
  const router = useRouter();
  const { data: categories } = useCategories();
  const createMutation = useCreateArticle();

  const [form, setForm] = useState({
    categoryId: "",
    title: "",
    content: "",
    imageUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(
      {
        categoryId: Number(form.categoryId),
        title: form.title,
        content: form.content,
        imageUrl: form.imageUrl || undefined,
      },
      { onSuccess: () => router.push("/admin/articles") },
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tambah Artikel</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-5 max-w-3xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
          <select
            required
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
          >
            <option value="">Pilih kategori</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
            placeholder="Judul artikel"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar (opsional)</label>
          <input
            type="url"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Konten</label>
          <textarea
            required
            rows={12}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
            placeholder="Tulis konten artikel..."
          />
        </div>

        {createMutation.isError && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{createMutation.error.message}</div>}

        <div className="flex gap-3">
          <button type="submit" disabled={createMutation.isPending} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition cursor-pointer">
            {createMutation.isPending ? "Menyimpan..." : "Simpan Artikel"}
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition cursor-pointer">
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
