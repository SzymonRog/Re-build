'use client'

import React, {useState} from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Checkbox} from "@/components/ui/checkbox"
import Image from "next/image";
import {Label} from "@/components/ui/label";

const formSchema = z.object({
    email: z.string().email('Niepoprawny email'),
    password: z.string().min(6, "Hasło musi miec min. 6 znaków"),
    remember: z.boolean().optional(),

})

const LoginForm = () => {

    const [show, setShow] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col sm:gap-8  h-full  max-w-[350px] w-full justify-between">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field}  className="h-[50px] border-1 border-gray-300 focus-visible:ring-[#0071C5] focus-visible:ring-[1px]"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <div className=" flex flex-row justify-between">
                                <FormLabel>Hasło</FormLabel>
                                <div className="flex flex-row items-center gap-1">
                                    <Label htmlFor="hide-show">{show ? (<Image src="/hide.svg" alt="show" width={20} height={20}/>) : (
                                        <Image src="/show.svg" alt="show" width={20} height={20}/>)}</Label>
                                    <button
                                        id="hide-show"
                                        type="button"
                                        className="text-[#0071C5]"
                                        onClick={() => setShow((prev) => !prev)}
                                    >
                                        {show ? 'Ukryj':'Pokaż'}
                                    </button>
                                </div>
                            </div>

                            <FormControl>
                                <Input  {...field} type={show ? '' : 'password'} className="h-[50px] w-full border-1 border-gray-300 focus-visible:ring-[#0071C5] focus-visible:ring-[1px]"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                        <FormItem className="flex flex-row gap-2 items-center">
                            <FormControl>
                                <Checkbox
                                    id="remember"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-[#0071C5] data-[state=checked]:border-0"
                                />
                            </FormControl>
                            <Label htmlFor="remember">Pozostań zalogowany</Label>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="bg-[#0071C5] sm:max-w-[125px] w-full rounded-4xl px-7 hover:opacity-80 hover:scale-105 hover:bg-[#0071C5]">Zaloguj</Button>
            </form>
        </Form>
    )
}
export default LoginForm
