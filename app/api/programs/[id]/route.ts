import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/programs/[id] - Get program by ID or slug
export async function GET(request: NextRequest, { params }: any) {
  try {
    const { id } = await params;

    // Try to find by ID (if numeric) or slug
    const isNumeric = /^\d+$/.test(id);

    const program = isNumeric
      ? await prisma.program.findUnique({
        where: { id: parseInt(id) },
        include: { category: true },
      })
      : await prisma.program.findUnique({
        where: { slug: id },
        include: { category: true },
      });

    if (!program) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    return NextResponse.json(program);
  } catch (error) {
    console.error("Error fetching program:", error);
    return NextResponse.json({ error: "Failed to fetch program" }, { status: 500 });
  }
}

// PUT /api/programs/[id] - Update program (admin only)
export async function PUT(request: NextRequest, { params }: any) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updateData: any = {};

    if (body.categoryId !== undefined) updateData.categoryId = body.categoryId;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.title !== undefined) updateData.title = body.title;
    if (body.titleDescription !== undefined) updateData.titleDescription = body.titleDescription;
    if (body.content !== undefined) updateData.content = body.content;
    if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl;
    if (body.raised !== undefined) updateData.raised = body.raised;
    if (body.goal !== undefined) updateData.goal = body.goal;
    if (body.minimalAmount !== undefined) updateData.minimalAmount = body.minimalAmount;
    if (body.endDate !== undefined) updateData.endDate = new Date(body.endDate);
    if (body.programOrder !== undefined) updateData.programOrder = body.programOrder;
    if (body.distributionUrl !== undefined) updateData.distributionUrl = body.distributionUrl;
    if (body.isActive !== undefined) updateData.isActive = body.isActive;

    const program = await prisma.program.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: { category: true },
    });

    return NextResponse.json(program);
  } catch (error) {
    console.error("Error updating program:", error);
    return NextResponse.json({ error: "Failed to update program" }, { status: 500 });
  }
}

// DELETE /api/programs/[id] - Delete program (admin only)
export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const { id } = await params;

    await prisma.program.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Program deleted successfully" });
  } catch (error) {
    console.error("Error deleting program:", error);
    return NextResponse.json({ error: "Failed to delete program" }, { status: 500 });
  }
}
