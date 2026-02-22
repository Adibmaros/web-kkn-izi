"use client";

import { use } from "react";
import Link from "next/link";
import { useProgram } from "@/hooks/usePrograms";

export default function ProgramDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: program, isLoading } = useProgram(id);

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

  if (isLoading) {
    return <div className="max-w-6xl mx-auto px-4 py-16 text-center text-gray-500">Memuat program...</div>;
  }

  if (!program) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Program tidak ditemukan</h1>
        <Link href="/program" className="text-emerald-600 hover:underline">
          Kembali ke Program
        </Link>
      </div>
    );
  }

  const progress = getProgress(program.raised, program.goal);
  const daysLeft = Math.ceil((new Date(program.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const whatsappNumber = "6282180682745";
  const whatsappMessage = encodeURIComponent(`Assalamualaikum, saya ingin berdonasi untuk program "${program.title}". Mohon informasi lebih lanjut. Terima kasih.`);
  const donationUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/program" className="text-emerald-600 hover:underline text-sm mb-6 inline-block">
        &larr; Kembali ke Program
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Category Badge */}
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">{program.category.name}</span>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-4">{program.title}</h1>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden mb-8">
            <img src={program.imageUrl} alt={program.title} className="w-full h-auto object-cover" />
          </div>

          {/* Program Stats */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-gray-600 text-sm mb-1">Terkumpul</p>
                <p className="text-lg font-bold text-emerald-600">{formatCurrency(program.raised)}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Target</p>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(program.goal)}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Progress</p>
                <p className="text-lg font-bold text-gray-900">{progress.toFixed(0)}%</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Waktu Tersisa</p>
                <p className="text-lg font-bold text-gray-900">{daysLeft > 0 ? `${daysLeft} hari` : "Berakhir"}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-emerald-600 h-3 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Program</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: program.content }} />
          </div>

          {/* Distribution Report Link */}
          {program.distributionUrl && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">📊 Laporan Penyaluran</h3>
              <p className="text-gray-600 text-sm mb-4">Lihat transparansi penyaluran dana program ini</p>
              <a href={program.distributionUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                Lihat Laporan
              </a>
            </div>
          )}
        </div>

        {/* Sidebar - Donasi & Info */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ikut Berdonasi</h3>

            <p className="text-sm text-gray-600 mb-2">Minimal donasi:</p>
            <p className="text-2xl font-bold text-emerald-600 mb-6">{formatCurrency(program.minimalAmount)}</p>

            {/* Donation CTA - redirect to bookingberkahramadhan.com */}
            <a href={donationUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition">
              {daysLeft <= 0 ? "Program Berakhir" : "Donasi Sekarang"}
            </a>

            <p className="text-xs text-gray-500 mt-3 text-center">Anda akan diarahkan ke WhatsApp untuk konfirmasi donasi</p>

            {/* Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-emerald-600">✓</span>
                <p>Donasi Anda akan tersalurkan dengan amanah</p>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600 mt-2">
                <span className="text-emerald-600">✓</span>
                <p>Dapat laporan penyaluran transparan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
