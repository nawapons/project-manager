import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogOut = () => {
    const router = useRouter();
    const supabase = createClient();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async () => {
            await supabase.auth.signOut()
        },
        onSuccess: () => {
            toast.success("Logged out...")
            queryClient.invalidateQueries({ queryKey: ["current"] })
            router.push("/")
        }
    })
    return mutation;
}