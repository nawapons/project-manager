"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SeparatorDotted } from "@/components/ui/separator-dotted"
import { passwordSchema, updateSchema } from "@/schema/userSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormState } from "react-hook-form"
import { useEditAccount } from "../api/use-edit-account"
import Link from "next/link"

export const AccountEditForm = ({ initialValues }) => {
    const { mutate, isPending } = useEditAccount()
    console.log(initialValues)
    const form = useForm({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            fullname: initialValues.full_name,
            email: initialValues.email,
        }
    })
    const passwordForm = useForm({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        }
    })
    const onSubmit = async (values) => {
        const fullname = values.fullname
        console.log("VALUE", initialValues.userId, fullname)
        mutate({ userId: initialValues.userId, fullname })
    }
    const onPasswordSubmit = async (values) => {
        console.log(values)
    }
    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
                {/* <Button variant="secondary" size="sm" asChild>
                    <Link href={"/"}>
                        <ArrowLeftIcon className="size-4 mr-2" />
                        Back
                    </Link>
                </Button> */}
                <CardTitle className="text-xl font-bold">
                    My profile
                    <p className="mt-2 text-sm text-muted-foreground">Change your profile data in here</p>
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <SeparatorDotted />
            </div>
            <CardContent>
                <Form  {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
                        <div className="mt-2 grid grid-cols-1 gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input disabled {...field} type="email" placeholder="example@email.com" required />
                                        </FormControl>
                                        <FormDescription className="text-xs text-red-400">
                                            *Email can not be change.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fullname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full name</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-between items-center pt-4">
                            <Button variant="outline" asChild>
                                <Link href="/">
                                    Cancel
                                </Link>
                            </Button>
                            <Button type="submit" disabled={isPending}>Save changes</Button>
                        </div>
                    </form>
                </Form>

            </CardContent>

        </Card>
    )
}