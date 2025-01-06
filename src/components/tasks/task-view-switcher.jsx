import { PlusIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { SeparatorDotted } from "../ui/separator-dotted"

export const TaskViewSwitcher = () => {
    return (
        <Tabs
            className="flex-1 w-full border rounded-lg"
        >
            <div className="h-full flex flex-col overflow-auto p-4">
                <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
                    <TabsList className="w-full lg:w-auto">
                        <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
                            Table
                        </TabsTrigger>
                        <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
                            Kanban
                        </TabsTrigger>
                        <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
                            Calendar
                        </TabsTrigger>
                    </TabsList>
                    <Button
                        variant="primary"
                        size="sm" className="w-full lg:w-auto">
                        <PlusIcon />
                        New
                    </Button>
                </div>
                <SeparatorDotted className="my-4" />
                Data filters
                <SeparatorDotted className="my-4" />
                <>
                    <TabsContent value="table" className="mt-0">
                        Data Table
                    </TabsContent>
                    <TabsContent value="kanban" className="mt-0">
                        Data Kanban
                    </TabsContent>
                    <TabsContent value="calendar" className="mt-0">
                        Data Calendar
                    </TabsContent>
                </>
            </div>
        </Tabs>

    )
}