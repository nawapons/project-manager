import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

export const useEditAccount = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ userId, fullname }) => {
            const response = await axios.patch("/api/account", {
                userId, fullname
            })
            if (response.status !== 200) {
                throw new Error("Failed to update account")
            }
            return await response.data.data
        },
        onSuccess: () => {
            toast.success("Account updated")
            queryClient.invalidateQueries({ queryKey: ["current"] })
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })
}