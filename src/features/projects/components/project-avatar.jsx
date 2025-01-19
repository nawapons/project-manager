import Image from "next/image";
import { cn } from "@/lib/utils";

export const ProjectAvatar = ({
    image,
    name,
    className,
}) => {
    if (image) {
        return (
            <div className={cn("size-5 relative rounded-md overflow-hidden", className)}>
                <Image src={image} alt={name} fill className="object-cover" />
            </div>
        );
    }

    return (
        <div className={cn("size-5 flex items-center justify-center rounded-md bg-blue-600 text-white font-semibold text-sm", className)}>
            {name[0].toUpperCase()}
        </div>
    );
};
