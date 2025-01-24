import {useMutation} from "@tanstack/react-query"
import axios from "axios";
import {toast} from "sonner";


export const useRegister = () => {
    return useMutation({
        mutationFn: async ({values}) => {
            const response = await axios.post("/api/auth/register", {
                values
            })
            return await response.data.data;
        },
        onSuccess: () => {
            toast.success("Register successfully")
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    });
}