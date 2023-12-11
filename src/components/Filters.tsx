'use client';

import {MultiSelect} from "@/components/ui/mutli-select";
import {useEffect, useState} from "react";
import {Form, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";

export function Filters({data}: {
    data: {
        colors: {
            value: string;
            label: string;
        }[]
    }
}) {
    const [selected, setSelected] = useState<string[]>([])

    const form = useForm<{
        color: string[];
    }>({
        defaultValues: {
            color: [],
        },
    });

    return (
        <Form {...form}>
            <form className={`flex flex-wrap gap-4`}>
                <div className="w-[320px]">
                    <FormItem>
                        <FormLabel>Color</FormLabel>
                        <MultiSelect
                            className="w-[320px]"
                            selected={selected}
                            onChange={setSelected}
                            options={data.colors}
                        />
                        <FormMessage/>
                    </FormItem>
                </div>

                {/*<MultiSelect*/}
                {/*    selected={[]}*/}
                {/*    onChange={() => {}}*/}
                {/*    options={[*/}
                {/*        {*/}
                {/*            value: "4 GB",*/}
                {/*            label: "4 GB",*/}
                {/*        },*/}
                {/*        {*/}
                {/*            value: "6 GB",*/}
                {/*            label: "6 GB",*/}
                {/*        },*/}
                {/*        {*/}
                {/*            value: "8 GB",*/}
                {/*            label: "8 GB",*/}
                {/*        },*/}
                {/*    ]}*/}
                {/*/>*/}

                {/*<MultiSelect*/}
                {/*    selected={[]}*/}
                {/*    onChange={() => {}}*/}
                {/*    options={[*/}
                {/*        {*/}
                {/*            value: "128 GB",*/}
                {/*            label: "128 GB",*/}
                {/*        },*/}
                {/*        {*/}
                {/*            value: "256 GB",*/}
                {/*            label: "256 GB",*/}
                {/*        },*/}
                {/*        {*/}
                {/*            value: "512 GB",*/}
                {/*            label: "512 GB",*/}
                {/*        },*/}
                {/*    ]}*/}
                {/*/>*/}

                {/*<MultiSelect*/}
                {/*    selected={[]}*/}
                {/*    onChange={() => {}}*/}
                {/*    options={[*/}
                {/*        {*/}
                {/*            value: "Apple",*/}
                {/*            label: "Apple",*/}
                {/*        },*/}
                {/*        {*/}
                {/*            value: "Samsung",*/}
                {/*            label: "Samsung",*/}
                {/*        },*/}
                {/*        {*/}
                {/*            value: "Oppo",*/}
                {/*            label: "Oppo",*/}
                {/*        },*/}
                {/*    ]}*/}
                {/*/>*/}

            </form>
        </Form>
    )
}