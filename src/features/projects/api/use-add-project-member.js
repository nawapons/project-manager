import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

export const useAddProjectMember = () => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationFn: async ({ userId,projectId }) => {
                const response = await axios.post("/api/project/member", {
                    userId,projectId
                })
                if (response.status !== 200) {
                    throw new Error("Failed to add member to project")
                }
                return await response.data.data;
            },
            onSuccess: () => {
                toast.success("Added member to project")
                queryClient.invalidateQueries({ queryKey: ["project-members"] })
            },
            onError: (error) => {
                toast.error(error.response.data.message)
            }
        });
} 