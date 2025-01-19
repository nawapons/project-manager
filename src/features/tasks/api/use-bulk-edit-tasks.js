import {useMutation, useQueryClient} from "@tanstack/react-query"
import axios from "axios"
import {toast} from "sonner"

export const useBulkEditTasks = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({json}) => {
            const response = await axios.post("/api/task/bulk-update", {
                tasks: json.tasks,
            })
            if (response.status !== 200) {
                throw new Error("Failed to update task")
            }
            return await response.data.data
        },
        onSuccess: () => {
            toast.success("Tasks updated")
            queryClient.invalidateQueries({queryKey: ["tasks"]})
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    });
}