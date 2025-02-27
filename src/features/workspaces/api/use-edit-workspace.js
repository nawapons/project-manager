import {useMutation, useQueryClient} from "@tanstack/react-query"
import axios from "axios"
import {toast} from "sonner"

export const useEditWorkspace = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({form, param}) => {
            const response = await axios.post("/api/workspace/update", {
                form, param
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return await response.data.data;
        },
        onSuccess: (data) => {
            toast.success("Workspace updated")
            queryClient.invalidateQueries({queryKey: ["workspaces"]})
            queryClient.invalidateQueries({queryKey: ["workspace", data[0].id]})
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    });
}