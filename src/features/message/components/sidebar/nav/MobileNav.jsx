"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"
import { TooltipContent } from "@/components/ui/tooltip";
import { UserButton } from "@/features/dashboard/user-button";

import { useNavigation } from "@/features/message/hooks/use-navigation"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import Link from "next/link";

const MobileNav = () => {
    const paths = useNavigation();
    const workspaceId = useWorkspaceId();
    return <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4">
        <nav>
            <ul className="flex flex-col items-center gap-3">
                {paths.map((path, id) => {
                    const fullHref = `/workspaces/${workspaceId}/message/${path.href}`
                    console.log(path.active)
                    return (
                        <li key={id} className="relative">
                            <Link href={fullHref} passHref>
                                <Button className="size-10" variant={path.active ? "primary" : "outline"}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span>{path.icon}</span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{path.name}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </Button>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
        {/* <div className="flex flex-col items-center gap-4"><UserButton /></div> */}
    </Card>
}
export default MobileNav;