import {useMutation, useQueryClient} from "@tanstack/react-query"
import axios from "axios"
import {toast} from "sonner"

export const useCreateTaskComment = () => { //TODO : task comment
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({json}) => {
            const response = await axios.post("/api/task/comment", {
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
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })
}