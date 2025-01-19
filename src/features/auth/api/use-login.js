import {useMutation} from "@tanstack/react-query"
import axios from "axios";
import {useRouter} from "next/navigation";
import {toast} from "sonner";


export const useLogin = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: async ({values}) => {
            const response = await axios.post("/api/auth/login", {
                values
            })
            return await response.data.data;
        },
        onSuccess: () => {
            toast.success("Logged in successfully")
            router.refresh();
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    });
}
