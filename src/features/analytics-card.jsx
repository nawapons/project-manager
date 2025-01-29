import { FaCaretDown, FaCaretUp } from "react-icons/fa"
import { cn } from "@/lib/utils"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
export const AnalyticsCard = ({
    title, value, variant, increaseValue 
}) => {
    const iconColor = variant === "up" ? "text-emerald-500" : "text-red-500"
    const increaseValueColor = variant === "up" ? "text-emerald-500" : "text-red-500";
    const Icon = variant === "up" ? FaCaretUp : FaCaretDown;
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="tracking-tight text-md font-medium">{title}</div>
                <Icon className={cn(iconColor,"size-4")}/>
            </div>
            <div className="p-6 pt-0">
                <div className={cn(increaseValueColor,"truncate text-base font-medium")}>{increaseValue}</div>
            </div>
        </div>
        // <div className="shadow-none border-none w-full">
        //     <CardHeader>
        //         <div className="flex items-center gap-x-2.5">
        //             <CardDescription className="flex items-center gap-x-2 font-medium overflow-hidden">
        //                 <span className="truncate text-base">{title}</span>
        //             </CardDescription>
        //             <div className="flex items-center gap-x-1">
        //                 <Icon className={cn(iconColor,"size-4")}/>
        //                 <span className={cn(increaseValueColor,"truncate text-base font-medium")}>
        //                     {increaseValue}
        //                 </span>
        //             </div>
        //         </div>
        //         <CardTitle className="3xl font-semibold">{value}</CardTitle>
        //     </CardHeader>
        // </div>
    )
}