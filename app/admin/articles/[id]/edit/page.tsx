"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useArticle, useUpdateArticle } from "@/hooks/useArticles";
import { useCategories } from "@/hooks/useCategories";

export default function EditArticle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: article, isLoading } = useArticle(Number(id));
  const { data: categories } = useCategories();
  const updateMutation = useUpdateArticle();

  const [form, setForm] = useState({
    categoryId: "",
    title: "",
    content: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (article) {
      setForm({
        categoryId: String(article.categoryId),
        title: article.title,
        content: article.content,
        imageUrl: article.imageUrl || "",
      });
    }
  }, [article]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(
      {
        id: Number(id),
        categoryId: Number(form.categoryId),
        title: form.title,
        content: form.content,
        imageUrl: form.imageUrl || undefined,
      },
      { onSuccess: () => router.push("/admin/articles") },
    );
  };

  if (isLoading) {
    return <div className="text-gray-500">Memuat artikel...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Artikel</h1>

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
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar (opsional)</label>
          <input type="url" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Konten</label>
          <textarea
            required
            rows={12}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
          />
        </div>

        {updateMutation.isError && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{updateMutation.error.message}</div>}

        <div className="flex gap-3">
          <button type="submit" disabled={updateMutation.isPending} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition cursor-pointer">
            {updateMutation.isPending ? "Menyimpan..." : "Update Artikel"}
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition cursor-pointer">
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
