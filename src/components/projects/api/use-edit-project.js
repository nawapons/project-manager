import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

export const useEditProject = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async ({ form, param }) => {
            const response = await axios.patch("/api/project/", {
                form, param
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return await response.data.data;
        },
        onSuccess: (data) => {
            toast.success("Project updated")
            queryClient.invalidateQueries({ queryKey: ["projects"] })
            queryClient.invalidateQueries({ queryKey: ["project",data[0].id] })
        },
        onError: (error) => {
            toast.error(error.response.data.error)
        }
    })
    return mutation;
}