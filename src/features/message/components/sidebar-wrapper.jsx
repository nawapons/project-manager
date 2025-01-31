import DesktopNav from "./sidebar/nav/DesktopNav";
import MobileNav from "./sidebar/nav/MobileNav";

const SidebarWrapper = ({ children }) => {
    return (
        <div className="h-full w-full p-4 flex flex-col lg:flex-row gap-4">
            <MobileNav/>
            <DesktopNav />
            <main className="h-[calc(100%-80px)] lg:h-full w-full flex gap-4">
                {children}
            </main>
        </div>
    )
}
export default SidebarWrapper;