import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

export const useEditProjectMember = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ memberId, role }) => {
            const response = await axios.patch("/api/project/member/", {
                memberId, role
            })
            if (response.status !== 200) {
                throw new Error("Failed to update member")
            }

        },
        onSuccess: () => {
            toast.success("Member updated")
            queryClient.invalidateQueries({ queryKey: ["project-members"] })
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    });
}