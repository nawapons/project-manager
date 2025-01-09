import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

export const useDeleteMember = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async ({ param }) => {
            const response = await axios.delete("/api/member", {
                params: {
                    memberId: param.memberId
                }
            })
            if (response.status !== 200) {
                throw new Error("Failed to delete member")
            }
            return await response.data.data
        },
        onSuccess: () => {
            toast.success("Member deleted")
            queryClient.invalidateQueries({ queryKey: ["members"] })
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })
    return mutation;
}