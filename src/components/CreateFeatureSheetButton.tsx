"use client";

import { useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { type FormData, create, FormSchema } from "@/app/features/actions";

export function CreateFeatureSheetButton() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      // categoryId: '',
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    startTransition(() => {
      create(data);
    });
  });

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">Create</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create feature</SheetTitle>
          <SheetDescription>This is a description...</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form className="mt-4 flex flex-col gap-4" onSubmit={onSubmit}>
            <Controller
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input
                      aria-required={true}
                      placeholder="ex. Serial number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*<Controller render={({field}) => (*/}
            {/*    <FormItem>*/}
            {/*        <FormLabel>Category *</FormLabel>*/}
            {/*        <FormControl>*/}
            {/*            <Select aria-required={true} {...field} onValueChange={field.onChange} defaultValue={field.value}>*/}
            {/*                <SelectTrigger className="w-[180px]">*/}
            {/*                    <SelectValue placeholder=""/>*/}
            {/*                </SelectTrigger>*/}
            {/*                <SelectContent>*/}
            {/*                    {categories.map(({value, label}) => <SelectItem value={value}*/}
            {/*                                                                    key={value}>{label}</SelectItem>)}*/}
            {/*                </SelectContent>*/}
            {/*            </Select>*/}
            {/*        </FormControl>*/}
            {/*        <FormDescription/>*/}
            {/*        <FormMessage/>*/}
            {/*    </FormItem>*/}
            {/*)} name="categoryId" control={form.control}/>*/}
            <Button disabled={isPending} type="submit">
              Dodaj
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
