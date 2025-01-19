import {useMutation, useQueryClient} from "@tanstack/react-query"
import axios from "axios"
import {toast} from "sonner"

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationFn: async ({form}) => {
                const response = await axios.post("/api/project/", {
                    form
                }, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                if (response.status !== 200) {
                    throw new Error("Failed to create project")
                }
                return await response.data.data;
            },
            onSuccess: () => {
                toast.success("Project created")
                queryClient.invalidateQueries({queryKey: ["projects"]})
            },
            onError: (error) => {
                toast.error(error.response.data.message)
            }
        });
} 