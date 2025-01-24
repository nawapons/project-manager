import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useDeleteComment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ param }) => {
            const response = await axios.delete("/api/task/comment/", {
                params: {
                    commentId: param.commentId
                }
            })
            if (response.status !== 200) {
                throw new Error("Failed to delete comment")
            }
            return await response.data.data
        },
        onSuccess: () => {
            toast.success("Comment deleted")
            queryClient.invalidateQueries({ queryKey: ["task-comment"] })
        },
        onError: () => {
            toast.error("Failed to delete comment")
        }
    });
}