import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import { ProductForm } from "./components/product-form";
import InventoryList, { InventoryColumn } from "./components/inventory-list";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
      inventory: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const inventoryListData: InventoryColumn[] =
    product?.inventory.map((inv) => ({
      stockQuantity: inv.stockQuantity,
      availableQuantity: inv.availableQuantity,
      createdAt: format(inv.createdAt, "MMMM do, yyyy"),
    })) || [];
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={product}
        />
        <InventoryList data={inventoryListData} />
      </div>
    </div>
  );
};

export default ProductPage;
