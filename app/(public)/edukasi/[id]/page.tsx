"use client";

import { use } from "react";
import Link from "next/link";
import { useArticle } from "@/hooks/useArticles";

export default function ArticleDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: article, isLoading } = useArticle(Number(id));

  if (isLoading) {
    return <div className="max-w-3xl mx-auto px-4 py-16 text-center text-gray-500">Memuat artikel...</div>;
  }

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Artikel tidak ditemukan</h1>
        <Link href="/edukasi" className="text-emerald-600 hover:underline">
          Kembali ke Edukasi
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/edukasi" className="text-emerald-600 hover:underline text-sm mb-6 inline-block">
        &larr; Kembali ke Edukasi
      </Link>

      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">{article.category.name}</span>

      <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-8">
        {new Date(article.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      {article.imageUrl && (
        <div className="rounded-2xl overflow-hidden mb-8">
          <img src={article.imageUrl} alt={article.title} className="w-full h-auto object-cover" />
        </div>
      )}

      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">{article.content}</div>
    </div>
  );
}
