import {prisma} from "@/api/prisma";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import dayjs from "dayjs";
import Link from "next/link";
import {ArrowLeftIcon} from "lucide-react";

export default async function Home() {
  const products = await prisma.product.findMany();

  return (
      <main className="flex gap-12 min-h-screen flex-col items-start justify-start p-24">
        <div>
          <Link href={"/"} className="text-secondary-foreground flex items-center"><ArrowLeftIcon size={20}/>Go
            back</Link>
          <h1 className="text-4xl font-bold">Products</h1>
        </div>
        <Table>
          <TableCaption>A list of products</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">UpdatedAt</TableHead>
              <TableHead className="text-right">CreatedAt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, _, arr) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{dayjs(product.updatedAt).toISOString()}</TableCell>
                  <TableCell className="text-right">{dayjs(product.createdAt).toISOString()}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
  )
}
