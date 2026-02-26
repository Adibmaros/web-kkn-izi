import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: any) {
  try {
    const { id } = await params;
    const video = await prisma.video.findUnique({ where: { id: Number(id) } });
    if (!video) return NextResponse.json({ error: "Video tidak ditemukan" }, { status: 404 });
    return NextResponse.json(video);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal memuat video" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: any) {
  try {
    const { id } = await params;
    const { title, youtubeUrl } = await req.json();
    const video = await prisma.video.update({
      where: { id: Number(id) },
      data: { title, youtubeUrl },
    });
    return NextResponse.json(video);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal mengupdate video" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: any) {
  try {
    const { id } = await params;
    await prisma.video.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Video berhasil dihapus" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal menghapus video" }, { status: 500 });
  }
}
