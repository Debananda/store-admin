import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: NextRequest,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }
    const { quantity } = await req.json();
    if (parseInt(quantity, 10) < 1) {
      return new NextResponse("Stock Quantity is required", { status: 400 });
    }
    const inventory = await prismadb.inventory.create({
      data: {
        stockQuantity: quantity,
        availableQuantity: quantity,
        productId: params.productId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(inventory, { status: 201 });
  } catch (error) {
    console.error("[INVENTORY_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
