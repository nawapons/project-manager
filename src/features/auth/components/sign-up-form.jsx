import { GalleryVerticalEnd } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/schema/userSchema"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { useRegister } from "../api/use-register"
export function RegisterForm({
    className,
    setState,
    ...props
}) {
    const { mutate, isPending } = useRegister();
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullname: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = async (values) => {
        mutate({
            values
        })
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2">
                    <a
                        href="#"
                        className="flex flex-col items-center gap-2 font-medium"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-md">
                            <GalleryVerticalEnd className="size-6" />
                        </div>
                        <span className="sr-only">Project Manager</span>
                    </a>
                    <h1 className="text-xl font-bold">Welcome to Project Manager</h1>
                </div>
                <div className="flex flex-col gap-6">
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
                            <Button type="submit" size="lg" className="w-full" disabled={isPending}>Register</Button>
                        </form>
                    </Form>
                    <Separator />
                </div>
                <div className="grid gap-4 sm:grid-cols-1">
                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <a onClick={() => setState("signIn")} href="#" className="underline underline-offset-4 text-blue-500">
                            Sign in
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
