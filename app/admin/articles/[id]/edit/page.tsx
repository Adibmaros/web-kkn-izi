"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import { useArticle, useUpdateArticle, uploadArticleImage } from "@/hooks/useArticles";
import { useCategories } from "@/hooks/useCategories";

export default function EditArticle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: article, isLoading } = useArticle(Number(id));
  const { data: categories } = useCategories();
  const updateMutation = useUpdateArticle();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    categoryId: "",
    title: "",
    content: "",
  });

  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imageRemoved, setImageRemoved] = useState(false);

  useEffect(() => {
    if (article) {
      setForm({
        categoryId: String(article.categoryId),
        title: article.title,
        content: article.content,
      });
      if (article.imageUrl) {
        setExistingImageUrl(article.imageUrl);
        setImagePreview(article.imageUrl);
      }
    }
  }, [article]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError(null);
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        setUploadError("Format file tidak didukung. Gunakan JPEG, PNG, WebP, atau GIF.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("Ukuran file maksimal 5MB");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setImageRemoved(false);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageRemoved(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);

    let imageUrl: string | undefined;

    if (imageFile) {
      // Upload new image
      try {
        setUploading(true);
        const result = await uploadArticleImage(imageFile);
        imageUrl = result.url;
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : "Gagal mengupload gambar");
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
    } else if (imageRemoved) {
      // Image was removed, set to undefined (will be saved as null)
      imageUrl = undefined;
    } else {
      // Keep existing image
      imageUrl = existingImageUrl || undefined;
    }

    updateMutation.mutate(
      {
        id: Number(id),
        categoryId: Number(form.categoryId),
        title: form.title,
        content: form.content,
        imageUrl,
      },
      { onSuccess: () => router.push("/admin/articles") },
    );
  };

  if (isLoading) {
    return <div className="text-gray-500">Memuat artikel...</div>;
  }

  const isSubmitting = uploading || updateMutation.isPending;

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

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gambar (opsional)</label>

          {imagePreview ? (
            <div className="relative mb-3">
              <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                <img src={imagePreview} alt="Preview" className="w-full max-h-64 object-contain" />
              </div>
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-lg transition cursor-pointer"
                  title="Ganti gambar"
                >
                  ✎
                </button>
                <button
                  type="button"
                  onClick={removeImage}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg transition cursor-pointer"
                  title="Hapus gambar"
                >
                  ✕
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
            >
              <div className="text-gray-400 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">Klik untuk memilih gambar</p>
              <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WebP, GIF • Maks 5MB</p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {uploadError && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{uploadError}</div>}
        {updateMutation.isError && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{updateMutation.error.message}</div>}

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

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition cursor-pointer"
          >
            {uploading ? "Mengupload gambar..." : updateMutation.isPending ? "Menyimpan..." : "Update Artikel"}
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition cursor-pointer">
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
