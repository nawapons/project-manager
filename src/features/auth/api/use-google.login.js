import { createClient } from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Update your OAuth hook
export const useGoogleSignin = () => {
  const router = useRouter();
  const supabase = createClient();

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })
      if (error) throw error;
      return data
    },
    onError: (error) => {
      toast.error(error.message || "Sign-in failed");
    },
    onSuccess: () => {
      // The redirectTo option will handle the redirect
    }
  });
};