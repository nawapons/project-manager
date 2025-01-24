import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
export const useEditPassword = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ values }) => {
            const response = await axios.patch("/api/account/password", {
                oldPassword: values.oldPassword, newPassword: values.newPassword
            })
            if (response.status !== 200) {
                throw new Error("Failed to update account")
            }
            return await response.data.data
        },
        onSuccess: () => {
            toast.success("Password updated")
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })
}