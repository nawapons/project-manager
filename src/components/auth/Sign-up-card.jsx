"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Separator } from "@/components/ui/separator"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { FcGoogle } from 'react-icons/fc'
import { useForm } from 'react-hook-form'
import { registerSchema } from "@/schema/userSchema"
import axios from "axios"
import { toast } from "sonner"
export const SignUpCard = ({ setState }) => {

    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullname: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = async (values) => {
        const response = await axios.post("/api/auth/register", {
            values
        })
        if (response.data.success) {
            toast.success("Register successfully")
            setState("signIn")
        } else {
            toast.error(response.data.message)
        }
    }
    return (
        <Card className="w-full h-auto md:w-[420px]">
            <CardHeader>
                <h1 className='text-xl font-bold'>Sign up</h1>
                <CardDescription>
                    <p className="text-muted-foreground text-xs">enter your data to get access</p>
                </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2.5'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
                        <FormField
                            control={form.control}
                            name="fullname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="text" placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="email" placeholder="example@email.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size="lg" className="w-full">Continue</Button>
                    </form>
                </Form>
                <Separator />
                <Button type="submit" variant="outline" size="lg" className="w-full">
                    <FcGoogle />
                    Sign up with Google</Button>
                <p className="text-center text-muted-foreground text-sm">Already have account ? <span onClick={() => setState("signIn")} className="text-blue-500 hover:underline cursor-pointer">Sign in</span></p>
            </CardContent>
        </Card>
    )
}