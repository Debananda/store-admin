"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useState } from "react";
import { InventoryModal } from "./inventory-modal";

export interface InventoryColumn {
  stockQuantity: number;
  availableQuantity: number;
  createdAt: string;
}
const columns: ColumnDef<InventoryColumn>[] = [
  { header: "Stocked", accessorKey: "stockQuantity" },
  { header: "Available", accessorKey: "availableQuantity" },
  { header: "Date", accessorKey: "createdAt" },
];
interface InventoryListProps {
  data: InventoryColumn[];
}
const InventoryList: React.FC<InventoryListProps> = ({ data }) => {
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Inventory" description="Manage product inventory" />
        <Button onClick={setIsInventoryModalOpen.bind(null, true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="" data={data} columns={columns} />
      <InventoryModal
        isOpen={isInventoryModalOpen}
        onClose={setIsInventoryModalOpen.bind(null, false)}
      />
    </>
  );
};

export default InventoryList;
