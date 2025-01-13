import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useResetInviteCode = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async ({ param }) => {
            const response = await axios.patch("/api/workspace/update", {
                workspaceId: param.workspaceId
            })
            if (response.status !== 200) {
                throw new Error("Failed to update inviteCode")
            }
            return await response.data.data;
        },
        onSuccess: (data) => {
            toast.success("Invite Code Reset")
            queryClient.invalidateQueries({ queryKey: ["workspaces"] })
            queryClient.invalidateQueries({ queryKey: ["workspace", data.id] })
        },
        onError: () => {
            toast.error("Failed to update inviteCode")
        }
    })
    return mutation;
}
