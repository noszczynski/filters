import dayjs from "dayjs";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { prisma } from "@/api/prisma";

import { CreateCategorySheetButton } from "@/components/CreateCategorySheetButton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function CategoryPage() {
  const categories = await prisma.category.findMany();

  return (
    <main className="flex gap-12 min-h-screen flex-col items-start justify-start p-4">
      <div className="flex w-full justify-between items-start">
        <div>
          <Link
            className="text-secondary-foreground flex items-center"
            href="/"
          >
            <ArrowLeftIcon size={20} />
            Go back
          </Link>
          <h1 className="text-4xl font-bold">Categories</h1>
        </div>
        <div>
          <CreateCategorySheetButton
            categories={categories.map((c) => ({
              label: c.name,
              value: c.id.toString(),
            }))}
          />
        </div>
      </div>

      <Table>
        <TableCaption>A list of your categories</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Parent</TableHead>
            <TableHead className="text-right">UpdatedAt</TableHead>
            <TableHead className="text-right">CreatedAt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category, _, arr) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>
                {arr.find((c) => c.id === category.parentId)?.name ?? "-"}
              </TableCell>
              <TableCell>{dayjs(category.updatedAt).fromNow()}</TableCell>
              <TableCell className="text-right">
                {dayjs(category.createdAt).fromNow()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
