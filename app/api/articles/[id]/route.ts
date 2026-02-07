import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { categoryId, title, content, imageUrl } = await req.json();
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

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.article.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Artikel berhasil dihapus" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal menghapus artikel" }, { status: 500 });
  }
}
