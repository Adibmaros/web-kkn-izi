"use client";

import { useState } from "react";

type ZakatType = "penghasilan" | "tabungan" | "emas" | "perdagangan";

const NISAB_EMAS_GRAM = 85;
const HARGA_EMAS_PER_GRAM = 1_100_000; // estimasi harga emas per gram
const NISAB = NISAB_EMAS_GRAM * HARGA_EMAS_PER_GRAM;
const ZAKAT_RATE = 0.025;

export default function KalkulatorPage() {
  const [type, setType] = useState<ZakatType>("penghasilan");
  const [inputs, setInputs] = useState({
    penghasilanBulanan: "",
    tabungan: "",
    beratEmas: "",
    modalDagang: "",
    keuntunganDagang: "",
    piutangDagang: "",
    hutangDagang: "",
  });
  const [result, setResult] = useState<{
    total: number;
    zakatAmount: number;
    wajib: boolean;
  } | null>(null);

  const formatCurrency = (num: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(num);

  const calculate = () => {
    let total = 0;
    let zakatAmount = 0;

    switch (type) {
      case "penghasilan": {
        const bulanan = Number(inputs.penghasilanBulanan) || 0;
        total = bulanan * 12;
        zakatAmount = total >= NISAB ? total * ZAKAT_RATE : 0;
        break;
      }
      case "tabungan": {
        total = Number(inputs.tabungan) || 0;
        zakatAmount = total >= NISAB ? total * ZAKAT_RATE : 0;
        break;
      }
      case "emas": {
        const berat = Number(inputs.beratEmas) || 0;
        total = berat * HARGA_EMAS_PER_GRAM;
        zakatAmount = berat >= NISAB_EMAS_GRAM ? total * ZAKAT_RATE : 0;
        break;
      }
      case "perdagangan": {
        const modal = Number(inputs.modalDagang) || 0;
        const untung = Number(inputs.keuntunganDagang) || 0;
        const piutang = Number(inputs.piutangDagang) || 0;
        const hutang = Number(inputs.hutangDagang) || 0;
        total = modal + untung + piutang - hutang;
        zakatAmount = total >= NISAB ? total * ZAKAT_RATE : 0;
        break;
      }
    }

    setResult({ total, zakatAmount, wajib: zakatAmount > 0 });
  };

  const types: { key: ZakatType; label: string }[] = [
    { key: "penghasilan", label: "Zakat Penghasilan" },
    { key: "tabungan", label: "Zakat Tabungan" },
    { key: "emas", label: "Zakat Emas" },
    { key: "perdagangan", label: "Zakat Perdagangan" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Kalkulator Zakat</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hitung jumlah zakat yang wajib Anda keluarkan. Nisab setara {NISAB_EMAS_GRAM} gram emas ({formatCurrency(NISAB)}).
        </p>
      </div>

      {/* Jenis Zakat Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {types.map((t) => (
          <button
            key={t.key}
            onClick={() => {
              setType(t.key);
              setResult(null);
            }}
            className={`px-5 py-2 rounded-full text-sm font-medium transition cursor-pointer ${type === t.key ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="space-y-5">
          {type === "penghasilan" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Penghasilan per Bulan (Rp)</label>
              <input
                type="number"
                value={inputs.penghasilanBulanan}
                onChange={(e) => setInputs({ ...inputs, penghasilanBulanan: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900"
                placeholder="Contoh: 10000000"
              />
              <p className="text-xs text-gray-500 mt-1">Akan dihitung per tahun (x12)</p>
            </div>
          )}

          {type === "tabungan" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Tabungan (Rp)</label>
              <input
                type="number"
                value={inputs.tabungan}
                onChange={(e) => setInputs({ ...inputs, tabungan: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900"
                placeholder="Contoh: 100000000"
              />
              <p className="text-xs text-gray-500 mt-1">Tabungan yang sudah mencapai haul (1 tahun)</p>
            </div>
          )}

          {type === "emas" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Berat Emas (gram)</label>
              <input
                type="number"
                value={inputs.beratEmas}
                onChange={(e) => setInputs({ ...inputs, beratEmas: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900"
                placeholder="Contoh: 100"
              />
              <p className="text-xs text-gray-500 mt-1">Nisab emas: {NISAB_EMAS_GRAM} gram</p>
            </div>
          )}

          {type === "perdagangan" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Modal Usaha (Rp)</label>
                <input
                  type="number"
                  value={inputs.modalDagang}
                  onChange={(e) => setInputs({ ...inputs, modalDagang: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keuntungan (Rp)</label>
                <input
                  type="number"
                  value={inputs.keuntunganDagang}
                  onChange={(e) => setInputs({ ...inputs, keuntunganDagang: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Piutang (Rp)</label>
                <input
                  type="number"
                  value={inputs.piutangDagang}
                  onChange={(e) => setInputs({ ...inputs, piutangDagang: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hutang (Rp)</label>
                <input
                  type="number"
                  value={inputs.hutangDagang}
                  onChange={(e) => setInputs({ ...inputs, hutangDagang: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900"
                  placeholder="0"
                />
              </div>
            </>
          )}

          <button onClick={calculate} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition cursor-pointer">
            Hitung Zakat
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-8 p-6 rounded-xl bg-gray-50 border border-gray-200">
            <h3 className="font-semibold text-gray-900 text-lg mb-4">Hasil Perhitungan</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Harta:</span>
                <span className="font-medium text-gray-900">{formatCurrency(result.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nisab:</span>
                <span className="font-medium text-gray-900">{formatCurrency(NISAB)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium ${result.wajib ? "text-emerald-600" : "text-orange-600"}`}>{result.wajib ? "Wajib Zakat ✓" : "Belum Wajib Zakat"}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg">
                <span className="font-semibold text-gray-900">Zakat (2.5%):</span>
                <span className="font-bold text-emerald-600">{formatCurrency(result.zakatAmount)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info tambahan */}
      <div className="mt-8 bg-blue-50 p-6 rounded-2xl">
        <h3 className="font-semibold text-blue-800 mb-2">ℹ️ Informasi</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Nisab zakat setara dengan {NISAB_EMAS_GRAM} gram emas murni</li>
          <li>• Kadar zakat adalah 2.5% dari total harta yang memenuhi nisab</li>
          <li>• Haul (masa kepemilikan) harta adalah 1 tahun hijriah</li>
          <li>• Perhitungan ini bersifat estimasi, konsultasikan dengan ulama untuk kepastian</li>
        </ul>
      </div>
    </div>
  );
}
