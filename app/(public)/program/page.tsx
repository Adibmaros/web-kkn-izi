"use client";

import Link from "next/link";
import { usePrograms, useProgramCategories } from "@/hooks/usePrograms";
import { useState } from "react";

export default function ProgramPage() {
  const { data: categories } = useProgramCategories();
  const [selectedCat, setSelectedCat] = useState<string | undefined>(undefined);
  const { data: programs, isLoading } = usePrograms(selectedCat, true);

  // Format currency to IDR
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate percentage of goal reached
  const getProgress = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Program Kebaikan</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Salurkan donasi Anda untuk berbagai program kebaikan yang membawa manfaat nyata bagi sesama</p>
      </div>

      {/* Filter Kategori */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <button onClick={() => setSelectedCat(undefined)} className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${!selectedCat ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
          Semua Program
        </button>
        {categories?.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${selectedCat === cat.slug ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Program Grid */}
      {isLoading ? (
        <div className="text-center py-12 text-gray-500">Memuat program...</div>
      ) : programs?.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Belum ada program tersedia</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs?.map((program) => {
            const progress = getProgress(program.raised, program.goal);
            const daysLeft = Math.ceil((new Date(program.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

            return (
              <Link key={program.id} href={`/program/${program.slug}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all">
                {/* Image */}
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img src={program.imageUrl} alt={program.title} className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Category Badge */}
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">{program.category.name}</span>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mt-3 mb-2 line-clamp-2">{program.title}</h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{program.titleDescription || program.content.replace(/<[^>]*>/g, "").substring(0, 100)}...</p>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Terkumpul</span>
                      <span className="font-semibold text-emerald-600">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  {/* Fundraising Info */}
                  <div className="space-y-1 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Terkumpul</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(program.raised)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Target</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(program.goal)}</span>
                    </div>
                  </div>

                  {/* Days Left */}
                  {daysLeft > 0 ? <p className="text-xs text-gray-500">{daysLeft} hari lagi</p> : <p className="text-xs text-red-500">Program telah berakhir</p>}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
