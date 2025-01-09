import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import { toast } from "sonner";

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async ({ param }) => {
            const response = await axios.delete("/api/project/", {
                params: {
                    projectId: param.projectId
                }
            })
            if (response.status !== 200) {
                throw new Error("Failed to fetch workspaces")
            }
            return await response.data.data;
        },
        onSuccess: (data) => {
            toast.success("project deleted")
            queryClient.invalidateQueries({ queryKey: ["projects"] })
            queryClient.invalidateQueries({ queryKey: ["project", data.id] })
        },
        onError: () => {
            toast.error("Failed to delete project")
        }
    })
    return mutation;
}