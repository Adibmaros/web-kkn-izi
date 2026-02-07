"use client";

import { useState } from "react";
import { useCreateQuestion } from "@/hooks/useQuestions";

export default function LayananPage() {
  const createQuestion = useCreateQuestion();
  const [form, setForm] = useState({ name: "", phoneNumber: "", message: "" });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createQuestion.mutate(form, {
      onSuccess: () => {
        setForm({ name: "", phoneNumber: "", message: "" });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Layanan & Konsultasi</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Hubungi kami untuk konsultasi seputar zakat dan keuangan syariah, atau kirimkan pertanyaan Anda melalui form di bawah.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Konsultasi WhatsApp */}
        <div className="space-y-6">
          <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
            <h2 className="text-xl font-bold text-green-800 mb-3">💬 Konsultasi via WhatsApp</h2>
            <p className="text-green-700 text-sm mb-4">Hubungi admin IZI langsung melalui WhatsApp untuk mendapatkan jawaban cepat atas pertanyaan Anda seputar zakat dan keuangan.</p>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat WhatsApp
            </a>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h2 className="text-xl font-bold text-blue-800 mb-3">📍 Kontak Kami</h2>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>
                <strong>WhatsApp:</strong> +62 812-3456-7890
              </li>
              <li>
                <strong>Email:</strong> info@izi-edukasi.id
              </li>
              <li>
                <strong>Jam Operasional:</strong> Senin - Jumat, 08:00 - 17:00 WIB
              </li>
            </ul>
          </div>
        </div>

        {/* Form Pertanyaan */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📝 Kirim Pertanyaan</h2>
          <p className="text-gray-600 text-sm mb-6">Pertanyaan Anda akan dijawab oleh admin melalui WhatsApp.</p>

          {success && <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm mb-4">Pertanyaan berhasil dikirim! Admin akan segera menghubungi Anda.</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900"
                placeholder="Nama Anda"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
              <input
                type="tel"
                required
                value={form.phoneNumber}
                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900"
                placeholder="08xxxxxxxxxx"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pertanyaan / Pesan</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900"
                placeholder="Tulis pertanyaan atau pesan Anda..."
              />
            </div>

            {createQuestion.isError && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">{createQuestion.error.message}</div>}

            <button type="submit" disabled={createQuestion.isPending} className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white py-3 rounded-xl font-semibold transition cursor-pointer">
              {createQuestion.isPending ? "Mengirim..." : "Kirim Pertanyaan"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
