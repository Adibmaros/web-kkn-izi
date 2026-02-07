import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    const articles = await prisma.article.findMany({
      where: categoryId ? { categoryId: Number(categoryId) } : undefined,
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(articles);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal memuat artikel" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { categoryId, title, content, imageUrl } = await req.json();

    if (!categoryId || !title || !content) {
      return NextResponse.json({ error: "Kategori, judul, dan konten wajib diisi" }, { status: 400 });
    }

    const article = await prisma.article.create({
      data: {
        categoryId: Number(categoryId),
        title,
        content,
        imageUrl: imageUrl || null,
      },
      include: { category: true },
    });
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal membuat artikel" }, { status: 500 });
  }
}
