import { Users } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useNavigation = () => {
    const pathname = usePathname();
    console.log(pathname)
    const paths = useMemo(() => [{
        name: "Conversations",
        href: "/conversations",
        icon: <MessageSquare  />,
        active: pathname.includes("/conversations")
    },
    {
        name: "Members",
        href: "/members",
        icon: <Users />,
        active: pathname.includes("/members")
    }], [pathname])
    return paths;
}