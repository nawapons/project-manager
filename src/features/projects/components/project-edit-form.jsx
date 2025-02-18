"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { SeparatorDotted } from "@/components/ui/separator-dotted"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ImageIcon } from "lucide-react"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"
import { useConfirm } from "@/hooks/use-confirm"
import { updateProjectSchema } from "@/schema/projectSchema"
import { useEditProject } from "../api/use-edit-project"
import { useDeleteProject } from "../api/use-delete-project"
import { ProjectMemberList } from "./project-member-list"
export const EditProjectForm = ({ onCancel, initialValues }) => {
    const router = useRouter();
    const { mutate, isPending } = useEditProject()
    const { mutate: deleteProject, isPending: deletingProject } = useDeleteProject()
    const [DeleteDialog, confirmDelete] = useConfirm(
        "Delete Project?",
        "This action cannot be undone.",
        "destructive",
    )
    const inputRef = useRef(null)
    const form = useForm({
        resolver: zodResolver(updateProjectSchema),
        defaultValues: {
            ...initialValues[0],
            image: initialValues[0].imageUrl ?? "",
        }
    })

    const handleDelete = async () => {
        const ok = await confirmDelete()
        if (!ok) return;
        deleteProject({
            param: { projectId: initialValues[0].id }
        }, {
            onSuccess: () => {
                router.push(`/workspaces/${initialValues[0].workspacesId}`)
            }
        })
    }
    const onSubmit = async (values) => {
        const finalValues = {
            ...values,
            image: values.image instanceof File
                ? values.image
                : (values.image === initialValues[0].imageUrl ? initialValues[0].imageUrl : undefined),
        }
        mutate({
            form: finalValues,
            param: { projectId: initialValues[0].id }
        })
    }

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image", file)
        }
    }

    return (
        <div className="flex flex-col gap-y-4">
            <DeleteDialog />
            <Card className="w-full h-full shadow-none border-none">
                <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
                    <Button size="sm" variant="secondary" onClick={onCancel ? onCancel : () => router.push(`/workspaces/${initialValues[0].workspacesId}`)}>
                        <ArrowLeftIcon className="size-4 mr-2" />
                        Back
                    </Button>
                    <CardTitle className="text-xl font-bold">
                        {initialValues[0].name}
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
                                                Project Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} type="text" placeholder="project name" />
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
                                                    <p className="text-sm">Project Icon</p>
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

                                <Button type="submit" variant="primary" disabled={isPending}>Save Changes</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <ProjectMemberList />
            <Card className="w-full h-full border-none shadow-none">
                <CardContent className="p-7">
                    <div className="flex flex-col">
                        <h3 className="font-bold">Config Project</h3>
                        <p className="text-sm text-muted-foreground">
                            Deleting a Project will be remove all associated
                        </p>
                        <Button className="mt-6 w-fit ml-auto"
                            size="sm"
                            variant="destructive"
                            type="button"
                            disabled={isPending || deletingProject}
                            onClick={handleDelete}>
                            Delete Project
                        </Button>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}