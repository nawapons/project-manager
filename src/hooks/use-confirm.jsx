import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveModal } from "@/features/dashboard/components/responsive-modal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const useConfirm = (title, message, variant) => {
  const [promise, setPromise] = useState(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    if (promise) {
      promise.resolve(true);
      handleClose();
    }
  };

  const handleCancel = () => {
    if (promise) {
      promise.resolve(false);
      handleClose();
    }
  };

  // Modal component
  const ConfirmationDialog = () => {
    if (!promise) return null; // Only render when promise is set.

    return (
      <ResponsiveModal open={true} onOpenChange={handleClose}>
        <Card className="w-full h-full border-none shadow-none">
          <CardContent className="pt-8">
            <CardHeader className="p-0">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{message}</CardDescription>
            </CardHeader>
            <div className="pt-4 w-full flex flex-col gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
              <Button onClick={handleCancel} variant="outline" className="w-full lg:w-auto">
                Cancel
              </Button>
              <Button onClick={handleConfirm} variant={variant} className="w-full lg:w-auto">
                Confirm
              </Button>
            </div>
          </CardContent>
        </Card>
      </ResponsiveModal>
    );
  };

  return [ConfirmationDialog, confirm];
};
