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
import Link from "next/link";
import {ArrowLeftIcon} from "lucide-react";
import {CreateFeatureSheetButton} from "@/components/CreateFeatureSheetButton";

export default async function FeaturesPage() {
    const categories = await prisma.category.findMany();
    const features = await prisma.feature.findMany();

    return (
        <main className="flex gap-12 min-h-screen flex-col items-start justify-start p-24">
            <div className={"flex w-full justify-between items-start"}>
                <div>
                    <Link href={"/"} className="text-secondary-foreground flex items-center"><ArrowLeftIcon size={20}/>Go
                        back</Link>
                    <h1 className="text-4xl font-bold">Features</h1>
                </div>
                <div>
                    <CreateFeatureSheetButton categories={categories.map(c => ({
                        label: c.name,
                        value: c.id.toString(),
                    }))}/>
                </div>
            </div>
            <Table>
                <TableCaption>A list of features.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Name</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {features.map((feature, _, arr) => (
                        <TableRow key={feature.id}>
                            <TableCell>{feature.id}</TableCell>
                            <TableCell className="font-medium">
                                <Link href={`/features/${feature.id}`}>{feature.name}</Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    )
}
