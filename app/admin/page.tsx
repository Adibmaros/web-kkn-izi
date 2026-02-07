"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Stats {
  articles: number;
  videos: number;
  categories: number;
  pendingQuestions: number;
}

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await fetch("/api/stats");
      if (!res.ok) throw new Error("Gagal memuat statistik");
      return res.json();
    },
  });

  const cards = [
    { label: "Total Artikel", value: stats?.articles, color: "text-blue-600", href: "/admin/articles" },
    { label: "Total Video", value: stats?.videos, color: "text-green-600", href: "/admin/videos" },
    { label: "Total Kategori", value: stats?.categories, color: "text-purple-600", href: "/admin/categories" },
    { label: "Pertanyaan Pending", value: stats?.pendingQuestions, color: "text-orange-600", href: "/admin/questions" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
            <h3 className="text-sm font-medium text-gray-500">{card.label}</h3>
            <p className={`text-3xl font-bold ${card.color} mt-2`}>{isLoading ? "..." : (card.value ?? 0)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
