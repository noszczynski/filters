import {prisma} from "@/api/prisma";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import dayjs from "dayjs";

export default async function Home() {
  const products = await prisma.product.findMany();
  const categories = await prisma.category.findMany();

  console.log('client', {products, categories});

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
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
                <TableCell>{arr.find(c => c.id === category.parentId)?.name ?? "-"}</TableCell>
                <TableCell>{dayjs(category.updatedAt).toISOString()}</TableCell>
                <TableCell className="text-right">{dayjs(category.createdAt).toISOString()}</TableCell>
              </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  )
}
