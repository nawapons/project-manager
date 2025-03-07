import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import {toast} from "sonner";

export const useDeleteWorkspace = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({param}) => {
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
            queryClient.invalidateQueries({queryKey: ["workspaces"]})
            router.push("/")
        },
        onError: () => {
            toast.error("Failed to delete workspace")
        }
    });
}
