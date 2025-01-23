import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const MemberAvatarStack = ({
    name, className, fallbackClassName
}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Avatar className={cn("size-5 transition border border-neutral-300 rounded-full", className)}>
                        <AvatarFallback className={cn(
                            "bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center", fallbackClassName
                        )}>
                            {name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    {/* <MemberAvatar
                    className={cn("text-sm h-7 w-7 shrink-0 overflow-hidden mr-1.5 rounded-full flex flex-row -space-x-5 -space-y-5 hover:z-10")}
                    name={member.profiles.fullname} /> */}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{name}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}
