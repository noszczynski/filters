"use server";

import { z } from "zod";

import { prisma } from "@/api/prisma";

export const FormSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
});

export type FormData = z.infer<typeof FormSchema>;

export async function create({ name }: FormData) {
  await prisma.feature.create({
    data: {
      name,
    },
  });
}
