import {useMutation, useQueryClient} from "@tanstack/react-query"
import axios from "axios"
import {toast} from "sonner"

export const useDeleteTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({param}) => {
            const response = await axios.delete("/api/task/", {
                params: {
                    taskId: param.taskId
                }
            })
            if (response.status !== 200) {
                throw new Error("Failed to delete task")
            }
            return await response.data.data
        },
        onSuccess: (data) => {
            toast.success("Task deleted")
            queryClient.invalidateQueries({queryKey: ["tasks"]})
            queryClient.invalidateQueries({queryKey: ["task", data.id]})
        },
        onError: () => {
            toast.error("Failed to delete task")
        }
    });
}