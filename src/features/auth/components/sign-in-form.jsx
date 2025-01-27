import { GalleryVerticalEnd } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLogin } from "../api/use-login"
import { useGoogleSignin } from "../api/use-google.login"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/schema/userSchema"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { FcGoogle } from "react-icons/fc"
export function LoginForm({
    className,
    setState,
    ...props
}) {
    const { mutate, isPending } = useLogin()
    const { mutate: googleSignin, isPending: isPendingGoogleSignin } = useGoogleSignin()
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const onSubmit = async (values) => {
        mutate({ values })
    }
    const onGoogleSignIn = async () => {
        googleSignin()
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
                            <Button type="submit" size="lg" className="w-full" disabled={isPending}>Login</Button>
                        </form>
                    </Form>
                    <Separator />
                </div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or
                    </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-1">
                    <div className="flex flex-col gap-y-2.5">
                        <Button disabled={isPending || isPendingGoogleSignin} variant="outline" size="lg" className="w-full relative" onClick={onGoogleSignIn}>
                            <FcGoogle />
                            Sign in with Google</Button>
                    </div>
                    <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <a onClick={() => setState("signUp")} href="#" className="underline underline-offset-4 text-blue-500">
                            Sign up
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
