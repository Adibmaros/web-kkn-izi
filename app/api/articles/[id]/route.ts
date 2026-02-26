import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabase, STORAGE_BUCKET } from "@/lib/supabase";

// Helper: extract storage path from a Supabase public URL
function extractStoragePath(url: string): string | null {
  try {
    const marker = `/storage/v1/object/public/${STORAGE_BUCKET}/`;
    const idx = url.indexOf(marker);
    if (idx === -1) return null;
    return url.substring(idx + marker.length);
  } catch {
    return null;
  }
}

export async function GET(_req: NextRequest, { params }: any) {
  try {
    const { id } = await params;
    const article = await prisma.article.findUnique({
      where: { id: Number(id) },
      include: { category: true },
    });
    if (!article) return NextResponse.json({ error: "Artikel tidak ditemukan" }, { status: 404 });
    return NextResponse.json(article);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal memuat artikel" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: any) {
  try {
    const { id } = await params;
    const { categoryId, title, content, imageUrl } = await req.json();

    // If image URL changed, delete old image from storage
    const existing = await prisma.article.findUnique({ where: { id: Number(id) } });
    if (existing?.imageUrl && existing.imageUrl !== imageUrl) {
      const oldPath = extractStoragePath(existing.imageUrl);
      if (oldPath) {
        await supabase.storage.from(STORAGE_BUCKET).remove([oldPath]);
      }
    }

    const article = await prisma.article.update({
      where: { id: Number(id) },
      data: {
        categoryId: categoryId ? Number(categoryId) : undefined,
        title,
        content,
        imageUrl: imageUrl || null,
      },
      include: { category: true },
    });
    return NextResponse.json(article);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal mengupdate artikel" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: any) {
  try {
    const { id } = await params;

    // Delete image from storage if exists
    const article = await prisma.article.findUnique({ where: { id: Number(id) } });
    if (article?.imageUrl) {
      const path = extractStoragePath(article.imageUrl);
      if (path) {
        await supabase.storage.from(STORAGE_BUCKET).remove([path]);
      }
    }

    await prisma.article.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Artikel berhasil dihapus" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal menghapus artikel" }, { status: 500 });
  }
}
