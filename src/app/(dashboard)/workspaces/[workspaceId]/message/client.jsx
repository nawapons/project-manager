import { Card, CardContent } from "@/components/ui/card"
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { TooltipProvider } from "@/components/ui/tooltip"

export const MessageClient = () => {
  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="grid grid-cols-5 ">
        <div className="col-span-1">
          <div className="bg-card rounded-lg p-4 text-card-foreground  ">
            Message
          </div>
        </div>
        <div className="col-span-4">
          <div className="bg-card rounded-lg p-4  border text-card-foreground shadow ">
            Message
          </div>
        </div>
      </div>
    </div>
  )
}