"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex items-center gap-8">
            <Link href="/admin" className="text-xl font-bold text-blue-600">
              IZI Admin
            </Link>
            <div className="hidden md:flex items-center gap-1">
              <Link href="/admin" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                Dashboard
              </Link>
              <Link href="/admin/articles" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                Artikel
              </Link>
              <Link href="/admin/videos" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                Video
              </Link>
              <Link href="/admin/categories" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                Kategori
              </Link>
              <Link href="/admin/questions" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
                Pertanyaan
              </Link>
            </div>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium text-gray-900">{session?.user?.name}</span>
              <span className="text-xs text-gray-500">{session?.user?.role}</span>
            </div>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition cursor-pointer">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden border-t border-gray-200 px-4 py-2 flex flex-wrap gap-1">
        <Link href="/admin" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
          Dashboard
        </Link>
        <Link href="/admin/articles" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
          Artikel
        </Link>
        <Link href="/admin/videos" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
          Video
        </Link>
        <Link href="/admin/categories" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
          Kategori
        </Link>
        <Link href="/admin/questions" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
          Pertanyaan
        </Link>
      </div>
    </nav>
  );
}
