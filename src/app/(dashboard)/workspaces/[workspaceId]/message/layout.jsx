import { TooltipProvider } from "@/components/ui/tooltip";
import SidebarWrapper from "../../../../../features/message/components/sidebar-wrapper";
const MessageLayout = ({ children }) => {
    return <TooltipProvider><SidebarWrapper>{children}</SidebarWrapper></TooltipProvider>
}
export default MessageLayout;