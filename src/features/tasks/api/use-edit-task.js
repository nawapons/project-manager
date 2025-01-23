import {useMutation, useQueryClient} from "@tanstack/react-query"
import axios from "axios"
import {toast} from "sonner"

export const useEditTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({json, param}) => {
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
            console.log(data)
            toast.success("Task updated")
            queryClient.invalidateQueries({queryKey: ["tasks"]})
            queryClient.invalidateQueries({queryKey: ["task", data[0].id]})            
            queryClient.invalidateQueries({queryKey: ["workspace-analytics"]})
            queryClient.invalidateQueries({queryKey: ["project-analytics"]})
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    });
}