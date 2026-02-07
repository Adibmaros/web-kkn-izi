import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { status } = await req.json();
    const question = await prisma.question.update({
      where: { id: Number(id) },
      data: { status },
    });
    return NextResponse.json(question);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal mengupdate status" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.question.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Pertanyaan berhasil dihapus" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal menghapus pertanyaan" }, { status: 500 });
  }
}
