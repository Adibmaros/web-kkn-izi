import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [articles, videos, categories, pendingQuestions] = await Promise.all([prisma.article.count(), prisma.video.count(), prisma.category.count(), prisma.question.count({ where: { status: "pending" } })]);

    return NextResponse.json({ articles, videos, categories, pendingQuestions });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal memuat statistik" }, { status: 500 });
  }
}
