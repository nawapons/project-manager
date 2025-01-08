import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useDeleteWorkspace = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async ({ param }) => {
            const response = await axios.delete("/api/workspace/delete", {
                params: {
                    workspaceId: param.workspaceId
                }
            })
            if (response.status !== 200) {
                throw new Error("Failed to fetch workspaces")
            }
            return await response.data.data;
        },
        onSuccess: (data) => {
            toast.success("workspace deleted")
            queryClient.invalidateQueries({ queryKey: ["workspaces"] })
            queryClient.invalidateQueries({ queryKey: ["workspace", data.id] })
        },
        onError: ()=>{
            toast.error("Failed to delete workspace")
        }
    })
    return mutation;
}
