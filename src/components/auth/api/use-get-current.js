import { createClient } from "@/utils/supabase/client";

export const getCurrent = async () =>{
    try{
        const supabase = createClient();
        const { data : user, error } = await supabase.auth.getSession()
        return user.session.user;
    }catch{
        return null;
    }
}