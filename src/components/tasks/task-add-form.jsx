"use client"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { SeparatorDotted } from "../ui/separator-dotted"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DatePicker } from "../date-picker"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "../ui/input"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useWorkspaceId } from "../workspaces/hooks/use-workspace-id"
import { createTaskSchema, TaskStatus } from "@/schema/taskSchema"
import { MemberAvatar } from "../member/components/member-avatar"
import { ProjectAvatar } from "../projects/components/project-avatar"
export const CreateTaskForm = ({ onCancel, projectOptions, memberOptions }) => {
    const workspacesId = useWorkspaceId();
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(createTaskSchema.omit({workspacesId: true})),
        defaultValues: {
            workspacesId,
        }
    })

    const onSubmit = async (values) => {
        
        const response = await axios.post("/api/task/", {
            ...values, workspacesId
        },)
        if (response.data.success) {
            toast.success("Task created")
            form.reset()
            onCancel?.()
        } else {
            toast.error(response.data.message)
        }
    }
    const onErrors = async (error)=>{
        console.log(error)
    }
    return (
        <Card className="w-full h-full shadow-none border-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                    Create a new task
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <SeparatorDotted />
            </div>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={
                        form.handleSubmit(onSubmit,onErrors)
                    } className="flex flex-col gap-4" >
                        <div className="flex flex-col gap-y-4 mt-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Task Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" placeholder="Enter task name" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Due Date
                                        </FormLabel>
                                        <FormControl>
                                            <DatePicker {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="assigneeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Assignee
                                        </FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select assignee"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <FormMessage />
                                            <SelectContent>
                                                {memberOptions.map((member) => 
                                                (
                                                    <SelectItem key={member.id} value={member.id}>
                                                        <div className="flex items-center gap-x-2">
                                                            <MemberAvatar className="size-6" name={member.name} />
                                                            {member.name}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Assignee
                                        </FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <FormMessage />
                                            <SelectContent>
                                                <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
                                                <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
                                                <SelectItem value={TaskStatus.IN_REVIEW}>In Review</SelectItem>
                                                <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
                                                <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="projectsId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Project
                                        </FormLabel>
                                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select project"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <FormMessage />
                                            <SelectContent>
                                                {projectOptions.map((project) => 
                                                (
                                                    <SelectItem key={project.id} value={project.id}>
                                                        <div className="flex items-center gap-x-2">
                                                            <ProjectAvatar className="size-6" name={project.name} image={project.imageUrl} />
                                                            {project.name}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <SeparatorDotted />
                        <div className="flex justify-between items-center p-2">
                            <Button type="button" onClick={onCancel} className={cn(!onCancel && "invisible")}>Cancel</Button>
                            <Button type="submit">Create Task</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}