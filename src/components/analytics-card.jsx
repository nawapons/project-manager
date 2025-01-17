import { FaCaretDown, FaCaretUp } from "react-icons/fa"
import { cn } from "@/lib/utils"
import { CardDescription, CardHeader } from "./ui/card";
export const AnalyticsCard = ({
    title, value, variant, increaseValue 
}) => {
    const iconColor = variant === "up" ? "text-emerald-500" : "text-red-500"
    const increaseValueColor = variant === "up" ? "text-emerald-500" : "text-red-500";
    const Icon = variant === "up" ? FaCaretUp : FaCaretDown;
    return (
        <div className="shadow-none border-none w-full">
            <CardHeader>
                <div className="flex items-center gap-x-2.5">
                    <CardDescription className="flex items-center gap-x-2 font-medium overflow-hidden">
                        <span className="truncate text-base">{title} : {value}</span> //TODO
                    </CardDescription>
                </div>
            </CardHeader>
        </div>
    )
}