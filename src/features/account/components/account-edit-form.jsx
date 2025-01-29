"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SeparatorDotted } from "@/components/ui/separator-dotted"
import { updateSchema } from "@/schema/userSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEditAccount } from "../api/use-edit-account"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ImageIcon } from "lucide-react"
import { useRef } from "react"
import { MemberAvatar } from "@/features/member/components/member-avatar"
import { PlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export const AccountEditForm = ({ initialValues }) => {
    const { mutate, isPending } = useEditAccount()
    const inputRef = useRef(null)
    const form = useForm({
        resolver: zodResolver(updateSchema),
        defaultValues: {
            fullname: initialValues.fullname,
            email: initialValues.email,
            image: initialValues.imageUrl ?? "",
        }
    })
    const onSubmit = async (values) => {
        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : values.image === initialValues.imageUrl ? initialValues.imageUrl : undefined,
        }
        mutate({ form: finalValues })
        // mutate({ userId: initialValues.userId, fullname })
    }
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image", file)
        }
    }
    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
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
                                name="image"
                                render={({ field }) => (
                                    <div className="flex flex-col gap-y-2">
                                        <div className="flex items-center gap-x-5">
                                            <div className="relative inline-block">
                                                {field.value ? (
                                                    <div className="size-[96px] relative rounded-full overflow-hidden">
                                                        <Image alt="profile-logo"
                                                            fill
                                                            className="object-cover"
                                                            src={field.value instanceof File ? URL.createObjectURL(field.value)
                                                                : field.value} />
                                                    </div>
                                                ) : (
                                                    <Avatar className="size-[96px]">
                                                        <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
                                                            {initialValues.fullname.charAt(0).toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                )}
                                                {/* <MemberAvatar className="size-24" imageUrl={field.value} name={initialValues.fullname} /> */}
                                                {field.value ? (
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="xs"
                                                        className="absolute bottom-0 right-0 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                                                        onClick={() => {
                                                            field.onChange(null);
                                                            if (inputRef.current) {
                                                                inputRef.current.value = "";
                                                            }
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        type="button"
                                                        variant="primary"
                                                        size="xs"
                                                        className="absolute bottom-0 right-0 p-1 rounded-full text-white transition-colors"
                                                        onClick={() => inputRef.current?.click()}
                                                    >
                                                        <PlusIcon />
                                                    </Button>
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <input
                                                    id="file-upload"
                                                    accept=".jpg, .png, .jpeg, .svg"
                                                    ref={inputRef}
                                                    className="hidden"
                                                    type="file"
                                                    onChange={handleImageChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
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