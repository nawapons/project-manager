import {useMutation, useQueryClient} from "@tanstack/react-query"
import axios from "axios";
import {toast} from "sonner";

export const useCreateWorkspace = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({form}) => {
            const response = await axios.post("/api/workspace/create", {
                form
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return await response.data.data;
        },
        onSuccess: () => {
            toast.success("Workspace created");
            queryClient.invalidateQueries({queryKey: ["workspaces"]})
        },
        onError: (error) => {
            toast.error(error.response.data.error);
        }
    });
}