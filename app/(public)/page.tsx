import Link from "next/link";

const features = [
  {
    icon: "📖",
    title: "Edukasi Zakat",
    desc: "Pelajari pengertian, jenis, dan syarat wajib zakat secara lengkap dan mudah dipahami.",
    href: "/edukasi",
  },
  {
    icon: "🧮",
    title: "Kalkulator Zakat",
    desc: "Hitung jumlah zakat yang wajib Anda keluarkan berdasarkan penghasilan dan tabungan.",
    href: "/kalkulator",
  },
  {
    icon: "💰",
    title: "Literasi Keuangan",
    desc: "Tips manajemen keuangan rumah tangga dan skala prioritas pengeluaran.",
    href: "/edukasi",
  },
  {
    icon: "🎬",
    title: "Galeri Video",
    desc: "Video edukasi interaktif seputar zakat dan keuangan syariah.",
    href: "/media",
  },
  {
    icon: "💬",
    title: "Konsultasi",
    desc: "Tanya langsung ke admin melalui WhatsApp atau form pertanyaan online.",
    href: "/layanan",
  },
  {
    icon: "📱",
    title: "Integrasi WhatsApp",
    desc: "Hubungi layanan konsultasi IZI langsung lewat WhatsApp.",
    href: "/layanan",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Edukasi Zakat &<br />
              Literasi Keuangan
            </h1>
            <p className="text-lg md:text-xl text-emerald-100 mb-8 leading-relaxed">
              Platform digital untuk meningkatkan pemahaman masyarakat mengenai pengelolaan keuangan berbasis syariah. Mendukung kemandirian ekonomi keluarga melalui edukasi yang mudah diakses.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/edukasi" className="bg-white text-emerald-700 px-8 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition">
                Mulai Belajar
              </Link>
              <Link href="/kalkulator" className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition">
                Hitung Zakat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visi & Misi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Sejalan dengan misi IZI dalam mendukung program edukasi dan penghimpunan zakat secara modern.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-emerald-800 mb-3">Visi</h3>
              <p className="text-gray-700 leading-relaxed">Menjadi platform edukasi digital terdepan dalam meningkatkan kesadaran masyarakat mengenai pengelolaan keuangan berbasis syariah dan penunaian zakat.</p>
            </div>
            <div className="bg-teal-50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-teal-800 mb-3">Misi</h3>
              <ul className="text-gray-700 leading-relaxed space-y-2">
                <li>• Menyediakan konten edukasi zakat yang lengkap dan mudah dipahami</li>
                <li>• Memberikan alat praktis untuk perhitungan zakat</li>
                <li>• Meningkatkan literasi keuangan keluarga</li>
                <li>• Memfasilitasi konsultasi langsung dengan admin IZI</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fitur Utama */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fitur Utama</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Nikmati berbagai fitur edukasi yang dirancang untuk membantu Anda memahami dan menerapkan pengelolaan keuangan syariah.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Link key={f.title} href={f.href} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Butuh Konsultasi Seputar Zakat?</h2>
          <p className="text-emerald-100 mb-8 text-lg">Hubungi admin IZI langsung melalui WhatsApp untuk mendapatkan panduan dan jawaban atas pertanyaan Anda.</p>
          <a href="https://wa.me/6282180682745" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-emerald-700 px-8 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat via WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
