'use client'

import React, {useState} from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Checkbox} from "@/components/ui/checkbox"
import Image from "next/image";
import {Label} from "@/components/ui/label";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useUserStore} from "@/store/user";

const formSchema = z.object({
    email: z.string().email('Niepoprawny email'),
    password: z.string().min(6, "Hasło musi miec min. 6 znaków"),
    remember: z.boolean().optional(),

})

const LoginForm = () => {

    const [show, setShow] = useState(false)
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            const {email, password} = values;
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })
            const data = await response.json()

            if(!response.ok){
                toast(data.error.message)
                if(data?.error?.code === 'INVALID_DATA'){
                    form.setError('email', { type: 'manual', message: data.error.message });
                    form.setError('password', { type: 'manual', message: data.error.message });
                }else {
                    form.clearErrors('email');
                }
                return;
            }

            toast(data.message)
            form.reset();
            if(data.success){
                useUserStore.getState().setUser(data.user);
                router.push('/konfiguracja/nowa');
            }




        }catch (e) {
            console.error(e);
            toast('Błąd połączenia z serwerem.');
        }

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 md:gap-5 h-full max-w-[350px] w-full md:justify-between
               max-md:flex-1 max-md:justify-between">
                <div className="flex flex-col gap-4 md:gap-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                           className="h-[50px] border-1 border-gray-300 focus-visible:ring-[#0071C5] focus-visible:ring-[1px]"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <div className=" flex flex-row justify-between">
                                    <FormLabel>Hasło</FormLabel>
                                    <div className="flex flex-row items-center gap-1 hover:scale-105 transition">
                                        <Label htmlFor="hide-show" className="transition">
                                            {show ?
                                                (<Image src="/hide.svg" alt="show" width={20} height={20}/>)
                                                :
                                                (<Image src="/show.svg" alt="show" width={20} height={20}/>)
                                            }
                                        </Label>
                                        <button
                                            id="hide-show"
                                            type="button"
                                            className="text-[#0071C5]"
                                            onClick={() => setShow((prev) => !prev)}
                                        >
                                            {show ? 'Ukryj' : 'Pokaż'}
                                        </button>
                                    </div>
                                </div>

                                <FormControl>
                                    <Input  {...field} type={show ? '' : 'password'}
                                            className="h-[50px] w-full border-1 border-gray-300 focus-visible:ring-[#0071C5] focus-visible:ring-[1px]"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="remember"
                        render={({field}) => (
                            <FormItem className="flex flex-row gap-2 items-center">
                                <FormControl>
                                    <Checkbox
                                        id="remember"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="data-[state=checked]:bg-[#0071C5] data-[state=checked]:border-0 transition "
                                    />
                                </FormControl>
                                <Label htmlFor="remember" className="text-md">Pozostań zalogowany</Label>
                                <FormMessage/>
                            </FormItem>
                        )}
                    /></div>

                <Button type="submit" className="bg-[#0071C5] sm:max-w-[125px] w-full rounded-4xl px-7 py-2 hover:opacity-95 transition-transform hover:scale-102 hover:bg-[#0071C5] sm:text-sm text-lg">Zaloguj</Button>
            </form>
        </Form>
    )
}
export default LoginForm
