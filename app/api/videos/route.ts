import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const videos = await prisma.video.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(videos);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal memuat video" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, youtubeUrl } = await req.json();

    if (!title || !youtubeUrl) {
      return NextResponse.json({ error: "Judul dan URL YouTube wajib diisi" }, { status: 400 });
    }

    const video = await prisma.video.create({ data: { title, youtubeUrl } });
    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal membuat video" }, { status: 500 });
  }
}
