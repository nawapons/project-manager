import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Separator } from "@/components/ui/separator"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FcGoogle } from "react-icons/fc"
import { useForm } from 'react-hook-form'
import { loginSchema } from '@/schema/userSchema'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { createClient } from "@/utils/supabase/client"
import { useLogin } from "../api/use-login"
import { useRouter } from 'next/navigation'
import { useGoogleSignin } from '../api/use-google.login'
export const SignInCard = ({ setState }) => {
    const router = useRouter();
    const supabase = createClient()
    const {mutate,isPending} = useLogin()
    const {mutate: googleSignin, isPending: isPendingGoogleSignin} = useGoogleSignin()
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const onSubmit = async (values) => {
        mutate({values})
    }
    const onGoogleSignIn = async () => {
        googleSignin()
    }
    // const onGoogleSignIn = async () => {
    //     await supabase.auth.signInWithOAuth({
    //         provider: 'google',
    //         options: {
    //             redirectTo: 'https://zvomobixtewrgsmyijry.supabase.co/auth/v1/callback'
    //         }
    //     }).then(router.refresh())
    // }
    return (
        <Card className="w-full h-auto md:w-[420px]">
            <CardHeader>
                <h1 className='text-xl font-bold'>Login to continue</h1>
                <CardDescription>
                    <p className="text-muted-foreground text-xs">enter your data to get access</p>
                </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2.5'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5' >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} type="email" placeholder="example@email.com" required />
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
                                        <Input {...field} type="password" placeholder="********" required />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isPending} type="submit" size="lg" className="w-full">Continue</Button>
                    </form>
                </Form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    
                    <Button disabled={isPending || isPendingGoogleSignin} variant="outline" size="lg" className="w-full relative" onClick={onGoogleSignIn}>
                        <FcGoogle />
                        Sign in with Google</Button>
                </div>
                <p className="text-center text-muted-foreground text-sm">{`don't have any account?`} <span onClick={() => setState("signUp")} className="text-blue-500 hover:underline cursor-pointer">Sign up</span></p>
            </CardContent>
        </Card>
    )
}