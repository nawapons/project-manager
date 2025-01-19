import Image from "next/image";
import {cn} from "@/lib/utils"

import { Avatar,AvatarFallback } from "@/components/ui/avatar";

export const WorkspaceAvatar = ({
    image,name,className
}) => {
    if(image){
        return (
            <div className={cn(
                "size-7 relative rounded-md overflow-hidden",
                className
            )}>
                <Image src={image} alt={name} fill className="object-cover"/>
            </div>
        )
    }
    return (
        <Avatar className={cn("size-7 rounded-md",className)}> 
            <AvatarFallback className="text-white rounded-md bg-blue-600 font-semibold text-lg uppercase">
                {name[0]}
            </AvatarFallback>
        </Avatar>
    )
}
