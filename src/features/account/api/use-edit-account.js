import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

export const useEditAccount = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ form }) => {
            const response = await axios.patch("/api/account", {
                form
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (response.status !== 200) {
                throw new Error("Failed to update account")
            }
            return await response.data.data
        },
        onSuccess: () => {
            toast.success("Account updated")
            queryClient.invalidateQueries({ queryKey: ["current"] })
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })
}