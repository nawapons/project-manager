"use client"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { SidebarComponents } from "./sidebar";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])
    return (
        <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
            <VisuallyHidden>
                <SheetTitle>Nav Content</SheetTitle>
            </VisuallyHidden>
            <SheetTrigger asChild>
                <Button variant="secondary" className="lg:hidden">
                    <MenuIcon className="size-4 text-neutral-500" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <SidebarComponents />
            </SheetContent>
        </Sheet>
    )
}