import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// 📌 PUT: Update category
export async function PUT(req: Request, { params }: RouteParams) {
  const { id } = await params;
  const { name } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  try {
    const updated = await prisma.category.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("❌ Failed to update category:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// 📌 DELETE: Remove category
export async function DELETE(req: Request, { params }: RouteParams) {
  const { id } = await params;

  try {
    // Check if category has children
    const hasChildren = await prisma.category.findFirst({
      where: { parentId: id },
    });

    if (hasChildren) {
      return NextResponse.json(
        { error: "Cannot delete category with subcategories" },
        { status: 400 }
      );
    }

    // Check if category has products
    const hasProducts = await prisma.product.findFirst({
      where: { categoryId: id },
    });

    if (hasProducts) {
      return NextResponse.json(
        { error: "Cannot delete category with products" },
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Failed to delete category:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}