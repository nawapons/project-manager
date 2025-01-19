"use client"
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card"
import { SeparatorDotted } from "../../../components/ui/separator-dotted"
import { Button } from "../../../components/ui/button"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createWorkspaceSchema } from "@/schema/workspaceSchema"
import Image from "next/image";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../../../components/ui/input"
import { Avatar, AvatarFallback } from "../../../components/ui/avatar"
import { ImageIcon } from "lucide-react"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import { useCreateWorkspace } from "../api/use-create-workspace"
export const CreateWorkspaceForm = ({ onCancel }) => {
    const router = useRouter();
    const inputRef = useRef(null)
    const { mutate, isPending } = useCreateWorkspace();
    const form = useForm({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: {
            name: "",
            image: ""
        }
    })

    const onSubmit = async (values) => {
        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : "",
        }
        mutate({ form: finalValues }, {
            onSuccess: (response) => {
                form.reset();
                router.push(`/workspaces/${response[0].id}`);
            },
        })
    }

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image", file)
        }
    }
    return (
        <Card className="w-full h-full shadow-none border-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                    Create a new workspace
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <SeparatorDotted />
            </div>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4" >
                        <div className="flex flex-col gap-y-4 mt-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Workspace Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" placeholder="workspace name" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <div className="flex flex-col gap-y-2">
                                        <div className="flex items-center gap-x-5">
                                            {field.value ? (
                                                <div className="size-[72px] relative rounded-md overflow-hidden">
                                                    <Image alt="Logo"
                                                        fill
                                                        className="object-cover"
                                                        src={field.value instanceof File ? URL.createObjectURL(field.value)
                                                            : field.value} />
                                                </div>
                                            ) : (
                                                <Avatar className="size-[72px]">
                                                    <AvatarFallback>
                                                        <ImageIcon className="size-[36px] text-neutral-500" />
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className="flex flex-col">
                                                <p className="text-sm">WorkSpace Icon</p>
                                                <p className="text-sm text-muted-foreground">JPG, PNG, SVG, or JPEG, Max Size 1 Mb</p>
                                                <input
                                                    id="file-upload"
                                                    accept=".jpg, .png, .jpeg, .svg"
                                                    ref={inputRef}
                                                    className="hidden"
                                                    type="file"
                                                    onChange={handleImageChange}
                                                />
                                                {field.value ? (
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="xs"
                                                        className="w-fit mt-2"
                                                        onClick={() => {
                                                            field.onChange(null)
                                                            if (inputRef.current) {
                                                                inputRef.current.value = ""
                                                            }
                                                        }}>
                                                        Remove Image
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        type="button"
                                                        variant="lightblue"

                                                        size="xs"
                                                        className="w-fit mt-2"
                                                        onClick={() => { inputRef.current?.click() }}>
                                                        Upload Image
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                        <SeparatorDotted />
                        <div className="flex justify-between items-center p-2">

                            <Button type="button" onClick={onCancel} className={cn(!onCancel && "invisible")} disabled={isPending}>Cancel</Button>

                            <Button type="submit" disabled={isPending}>Create workspace</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}