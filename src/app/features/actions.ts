'use server'

import {prisma} from "@/api/prisma";
import {z} from "zod";

export const FormSchema = z.object({
    name: z.string({
        required_error: 'Name is required',
    }),
    categoryId: z.string({
        required_error: 'Category is required',
    }),
})

export type FormData = z.infer<typeof FormSchema>;

export async function create({name, categoryId}: FormData) {
    const categoryIdNumber = Number(categoryId);

    if (Number.isNaN(categoryIdNumber)) {
        throw new Error('categoryId is not a number');
    }

    await prisma.feature.create({
        data: {
            name,
            categoryId: categoryIdNumber,
        }
    });
}