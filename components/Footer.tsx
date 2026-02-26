import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">
              IZI<span className="text-emerald-400"> Edukasi</span>
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">Platform edukasi zakat dan literasi keuangan berbasis web bagi masyarakat. Mendukung program penghimpunan zakat secara modern.</p>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="font-semibold text-white mb-3">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/edukasi" className="hover:text-white transition">
                  Edukasi
                </Link>
              </li>
              <li>
                <Link href="/media" className="hover:text-white transition">
                  Media
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-white transition">
                  Layanan
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="font-semibold text-white mb-3">Kontak</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://wa.me/6282180682745" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  WhatsApp: +62 821-8068-2745
                </a>
              </li>
              <li>Email: info@izi-edukasi.id</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">&copy; {new Date().getFullYear()} IZI Edukasi &mdash; Program KKN</div>
      </div>
    </footer>
  );
}
