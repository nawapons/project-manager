import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const MemberAvatar = ({
    name, imageUrl, className, fallbackClassName
}) => {
    return (
        <Avatar className={cn("size-5 transition border border-neutral-300 rounded-full", className)}>
            <AvatarImage src={imageUrl} alt="logo-profile" />
            <AvatarFallback className={cn(
                "bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center", fallbackClassName
            )}>
                {name.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    )
}
