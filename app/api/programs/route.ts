import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/programs - Get all programs
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categorySlug = searchParams.get("category");
    const isActive = searchParams.get("isActive");

    const where: any = {};

    if (categorySlug) {
      where.category = {
        slug: categorySlug,
      };
    }

    if (isActive !== null && isActive !== undefined) {
      where.isActive = isActive === "true";
    }

    const programs = await prisma.program.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: [{ programOrder: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(programs);
  } catch (error) {
    console.error("Error fetching programs:", error);
    return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 });
  }
}

// POST /api/programs - Create new program (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const program = await prisma.program.create({
      data: {
        categoryId: body.categoryId,
        slug: body.slug,
        title: body.title,
        titleDescription: body.titleDescription,
        content: body.content,
        imageUrl: body.imageUrl,
        raised: body.raised || 0,
        goal: body.goal,
        minimalAmount: body.minimalAmount,
        endDate: new Date(body.endDate),
        programOrder: body.programOrder,
        distributionUrl: body.distributionUrl,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(program, { status: 201 });
  } catch (error) {
    console.error("Error creating program:", error);
    return NextResponse.json({ error: "Failed to create program" }, { status: 500 });
  }
}
