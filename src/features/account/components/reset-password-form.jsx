"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useGetCurrent } from "@/features/auth/api/use-get-current"
import { PageLoader } from "@/features/page-loader"
import { passwordSchema } from "@/schema/userSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useEditPassword } from "../api/use-edit-password"
import { useLogOut } from "@/features/auth/api/use-logout"
import Link from "next/link"
export const ResetPasswordForm = () => {
    const { mutate, isPending } = useEditPassword()
    const { mutate: logOut } = useLogOut()
    const form = useForm({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        }
    })
    const onPasswordSubmit = async (values) => {
        mutate({ values }, {
            onSuccess: () => {
                logOut()
            }
        })
    }
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Reset your password</CardTitle>
                <CardDescription>you can reset your password here.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form  {...form} >
                    <form onSubmit={form.handleSubmit(onPasswordSubmit)} className="space-y-2.5">
                        <div className="mt-2 grid grid-cols-1 gap-4">
                            <FormField
                                control={form.control}
                                name="oldPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <Button variant="outline" asChild>
                                <Link href="/">
                                    Cancel
                                </Link>
                            </Button>
                            <Button type="submit" disabled={isPending}>Change Password</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}