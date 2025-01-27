import { Navigation } from "./navigation"
import { SeparatorDotted } from "@/components/ui/separator-dotted"
import Link from "next/link"
import { WorkspaceSwitcher } from "./workspace-switcher"
import { Projects } from "./projects"
import Image from "next/image"

export const SidebarComponents = () => {
    
    return (
        <aside className="h-full bg-neutral-100 p-4 w-full">
            <Link href="/">
                Logo
            </Link>
            <SeparatorDotted className="my-4" />
            <div className="pt-2">
                <WorkspaceSwitcher/>
            </div>
            <SeparatorDotted className="my-4" />
            <Navigation />
            <SeparatorDotted className="my-4" />
            <Projects/>
        </aside>

    )
}
