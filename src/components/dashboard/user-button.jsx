
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/utils/supabase/client";
import { Loader } from "lucide-react";
import { LogOutIcon } from "lucide-react";
import { User } from "lucide-react";
import { Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export const UserButton = () => {
    const router = useRouter();
    const [data, setData] = useState()
    const supabase = createClient();
    const fetchUserData = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        setData(user.user_metadata)
    }
    useEffect(() => {
        fetchUserData()
    }, [])

    if (!data) return (
        <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
            <Loader className="size-4 animate-spin text-muted-foreground" />
        </div>
    );
    const { full_name: name, email, avatar_url: image } = data;
    const avartarFallback = name ? name.charAt(0).toUpperCase() : email.charAt(0).toUpperCase() ?? "U";

    const signOut = async () => {
        await supabase.auth.signOut()
        router.push("/")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={image} alt="logo-profile" />
                    <AvatarFallback>{avartarFallback}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <User />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/settings">
                        <Settings />
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                    <LogOutIcon className="size-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu >
    )
}
