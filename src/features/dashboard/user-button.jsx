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
import { Loader } from "lucide-react";
import { LogOutIcon } from "lucide-react";
import { UserCircle2 } from "lucide-react";
import Link from "next/link";
import { useGetCurrent } from "../auth/api/use-get-current";
import { useLogOut } from "../auth/api/use-logout";


export const UserButton = () => {
    const { data, isLoading } = useGetCurrent();
    const { mutate } = useLogOut();
    if (isLoading) return (
        <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
            <Loader className="size-4 animate-spin text-muted-foreground" />
        </div>
    );
    const { full_name: name, email, avatar_url: image } = data;
    const avartarFallback = name ? name.charAt(0).toUpperCase() : email.charAt(0).toUpperCase() ?? "U";

    const signOut = async () => {
        mutate();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={image} alt="logo-profile" />
                    <AvatarFallback>{avartarFallback}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem>
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar>
                            <AvatarImage src={image} alt="logo-profile" />
                            <AvatarFallback>{avartarFallback}</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{name}</span>
                            <span className="truncate text-xs">{email}</span>
                        </div>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/account">
                        <UserCircle2 className="size-4" />
                        <span>Account</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                    <LogOutIcon className="size-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
