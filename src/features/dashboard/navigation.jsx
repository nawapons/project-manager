"use client"
import { GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill } from "react-icons/go"
import { SettingsIcon } from "lucide-react"
import { HiUserGroup } from "react-icons/hi"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { usePathname } from "next/navigation"
import { MessageCircle } from "lucide-react"
const items = [
    {
        title: "Home",
        href: "",
        icon: GoHome,
        activeIcon: GoHomeFill,
    },
    {
        title: "Tasks",
        href: "/tasks",
        icon: GoCheckCircle,
        activeIcon: GoCheckCircleFill
    },
    {
        title: "Message",
        href: "/message/conversations",
        icon: MessageCircle,
        activeIcon: MessageCircle
    },
    {
        title: "Settings",
        href: "/settings",
        icon: SettingsIcon,
        activeIcon: SettingsIcon
    },
    {
        title: "Members",
        href: "/members",
        icon: HiUserGroup,
        activeIcon: HiUserGroup
    },
]
export const Navigation = () => {
    const workspaceId = useWorkspaceId();
    const pathname = usePathname()
    return (
        <ul className="flex flex-col">
            {
                items.map((item) => {
                    const fullHref = `/workspaces/${workspaceId}${item.href}`
                    const isActive = pathname === fullHref;
                    const Icon = isActive ? item.activeIcon : item.icon
                    return (
                        <Link href={fullHref} key={item.href} >
                            <div className={cn(
                                "flex items-center gap-2.5 p-2 mt-2 rounded-md font-medium hover:text-primary transition text-neutral-500",
                                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
                            )}>
                                <Icon className="size-5 text-neutral-500" />
                                {item.title}
                            </div>
                        </Link>
                    )
                })
            }
        </ul>
    )
}