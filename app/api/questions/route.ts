import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const questions = await prisma.question.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(questions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal memuat pertanyaan" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, phoneNumber, message } = await req.json();

    if (!name || !phoneNumber || !message) {
      return NextResponse.json({ error: "Nama, nomor HP, dan pesan wajib diisi" }, { status: 400 });
    }

    const question = await prisma.question.create({
      data: { name, phoneNumber, message },
    });
    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal mengirim pertanyaan" }, { status: 500 });
  }
}
