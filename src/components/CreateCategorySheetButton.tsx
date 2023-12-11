"use client";

import {Controller, useForm} from "react-hook-form";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {create, FormSchema, type FormData} from "@/app/categories/actions";
import {useTransition} from "react";

export function CreateCategorySheetButton({categories}: { categories: { label: string, value: string }[] }) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<FormData>({
        mode: 'onChange',
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            parentId: '',
        }
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
                    <SheetTitle>Create category</SheetTitle>
                    <SheetDescription>
                        This is a description...
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form className="mt-4 flex flex-col gap-4" onSubmit={onSubmit}>
                        <Controller render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="ex. Smartfones" {...field} />
                                </FormControl>
                                <FormDescription/>
                                <FormMessage/>
                            </FormItem>
                        )} name="name" control={form.control}/>
                        <Controller render={({field}) => (
                            <FormItem>
                                <FormLabel>Parent category</FormLabel>
                                <FormControl>
                                    <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder=""/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="-1">No parent category</SelectItem>
                                            {categories.map(({value, label}) => <SelectItem value={value}
                                                                                            key={value}>{label}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription/>
                                <FormMessage/>
                            </FormItem>
                        )} name="parentId" control={form.control}/>
                        <Button type="submit" disabled={isPending}>Dodaj</Button>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}