'use server'

import {prisma} from "@/api/prisma";
import {z} from "zod";

export const FormSchema = z.object({
    name: z.string({
        required_error: 'Name is required',
    }),
})

export type FormData = z.infer<typeof FormSchema>;

export async function create({name}: FormData) {
    await prisma.feature.create({
        data: {
            name,
        }
    });
}