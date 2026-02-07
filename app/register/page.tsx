"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegister, useLogin } from "@/hooks/useAuth";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const registerMutation = useRegister();
  const loginMutation = useLogin();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert("Password tidak cocok!");
    }

    registerMutation.mutate(
      {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      },
      {
        onSuccess: () => {
          // Auto login setelah register
          loginMutation.mutate(
            { email: formData.email, password: formData.password },
            {
              onSuccess: () => {
                router.push("/admin");
              },
            },
          );
        },
      },
    );
  };

  const isPending = registerMutation.isPending || loginMutation.isPending;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Register</h1>
          <p className="text-gray-500 mt-2">Buat akun admin baru</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900"
              placeholder="Nama anda"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900"
              placeholder="Minimal 6 karakter"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900"
              placeholder="Ulangi password"
            />
          </div>

          {registerMutation.isError && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{registerMutation.error.message}</div>}

          {loginMutation.isError && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{loginMutation.error.message}</div>}

          <button type="submit" disabled={isPending} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition cursor-pointer">
            {isPending ? "Memproses..." : "Daftar"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
