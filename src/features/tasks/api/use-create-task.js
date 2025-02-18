import {useMutation, useQueryClient} from "@tanstack/react-query"
import axios from "axios"
import {toast} from "sonner"

export const useCreateTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({json}) => {
            const response = await axios.post("/api/task", {
                json
            })
            if (response.status !== 200) {
                throw new Error("Failed to create task")
            }
            return await response.data.data
        },
        onSuccess: () => {
            toast.success("Task created")
            queryClient.invalidateQueries({queryKey: ["tasks"]})
            queryClient.invalidateQueries({queryKey: ["workspace-analytics"]})
            queryClient.invalidateQueries({queryKey: ["project-analytics"]})
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })
}