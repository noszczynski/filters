"use server";

import { z } from "zod";

import { prisma } from "@/api/prisma";

export const FormSchema = z.object({
  name: z.string(),
  parentId: z.string(),
});

export type FormData = z.infer<typeof FormSchema>;

export async function create({
  name,
  parentId,
}: {
  name: string;
  parentId: string;
}) {
  console.log({ name, parentId });

  await prisma.category.create({
    data: {
      name,
      parentId: JSON.parse(parentId) === -1 ? null : Number(parentId),
    },
  });
}
