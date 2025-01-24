import { useMedia } from "react-use";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import { Drawer, DrawerContent } from "@/components/ui/drawer";

export const ResponsiveModal = ({
    children, open, onOpenChange
}) => {

    const isDesktop = useMedia("(min-width: 1024px)", true);

    const handleDrawerClose = () => {
        onOpenChange(false); // Close the drawer by setting open to false
    };

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={handleDrawerClose} >
                <DialogTitle/>
                <DialogContent 
                    className="w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh]">
                    {children}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={handleDrawerClose} >
            <DrawerContent>
                <div className="overflow-y-auto hide-scrollbar max-h-[85vh]">
                    {children}
                </div>
            </DrawerContent>
        </Drawer>
    );
};
