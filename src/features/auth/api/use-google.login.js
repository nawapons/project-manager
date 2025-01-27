import { createClient } from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useGoogleSignin = () => {
  const router = useRouter();
  const supabase = createClient();

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `https://zvomobixtewrgsmyijry.supabase.co/auth/v1/callback`
        }
      })

      if (error) throw error;
    },
    onError: (error) => {
      toast.error(error.message || "Sign-in failed");
    },
    onSuccess: () => {
      // Optional: Add any post-sign-in logic
      router.refresh() // Redirect to desired page
    }
  });
};