"use client";

import Link from "next/link";
import Image from "next/image";
import { useArticles } from "@/hooks/useArticles";
import { useCategories } from "@/hooks/useCategories";
import { useState } from "react";

export default function EdukasiPage() {
  const { data: categories } = useCategories();
  const [selectedCat, setSelectedCat] = useState<number | undefined>(undefined);
  const { data: articles, isLoading } = useArticles(selectedCat);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Edukasi Zakat &amp; Keuangan</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Artikel interaktif mengenai zakat, literasi keuangan, dan tips manajemen keuangan rumah tangga.</p>
      </div>

      {/* Filter Kategori */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <button onClick={() => setSelectedCat(undefined)} className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${!selectedCat ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
          Semua
        </button>
        {categories?.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${selectedCat === cat.id ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Artikel Grid */}
      {isLoading ? (
        <div className="text-center py-12 text-gray-500">Memuat artikel...</div>
      ) : articles?.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Belum ada artikel</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles?.map((article) => (
            <Link key={article.id} href={`/edukasi/${article.id}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all">
              {article.imageUrl && (
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-5">
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">{article.category.name}</span>
                <h3 className="text-lg font-semibold text-gray-900 mt-3 mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{article.content.replace(/<[^>]*>/g, "").substring(0, 150)}...</p>
                <p className="text-xs text-gray-400 mt-3">
                  {new Date(article.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
