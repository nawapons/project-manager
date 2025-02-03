import {useMutation, useQueryClient} from "@tanstack/react-query"
import axios from "axios"
import {toast} from "sonner"

export const useJoinWorkspace = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({workspaceId, inviteCode}) => {
            const response = await axios.post("/api/workspace/join", {
                workspaceId: workspaceId,
                inviteCode: inviteCode
            })
            if (response.status !== 200) {
                throw new Error("Failed to join workspace")
            }
            return await response.data.data
        },
        onSuccess: (data) => {
            toast.success("Joined workspace")
            queryClient.invalidateQueries({queryKey: ["workspaces"]})
            queryClient.invalidateQueries({queryKey: ["workspace", data.id]})
            queryClient.invalidateQueries({queryKey: ["members", data.id]})
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    });
}