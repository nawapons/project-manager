import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useEditTask = () => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async ({ json, param }) => {
            const response = await axios.patch("/api/task", {
                json,
                params: {
                    taskId: param.taskId
                }
            })
            if (response.status !== 200) {
                throw new Error("Failed to update task")
            }
            return await response.data.data
        },
        onSuccess: (data) => {
            toast.success("Task updated")

            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
            queryClient.invalidateQueries({ queryKey: ["task", data[0].id] })
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })
    return mutation;
}