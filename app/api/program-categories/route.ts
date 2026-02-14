import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/program-categories - Get all program categories
export async function GET() {
  try {
    const categories = await prisma.programCategory.findMany({
      include: {
        programs: {
          where: {
            isActive: true,
          },
          orderBy: [{ programOrder: "asc" }, { createdAt: "desc" }],
        },
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching program categories:", error);
    return NextResponse.json({ error: "Failed to fetch program categories" }, { status: 500 });
  }
}

// POST /api/program-categories - Create new category (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const category = await prisma.programCategory.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        title: body.title,
        bannerUrl: body.bannerUrl,
        backgroundUrl: body.backgroundUrl,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating program category:", error);
    return NextResponse.json({ error: "Failed to create program category" }, { status: 500 });
  }
}
