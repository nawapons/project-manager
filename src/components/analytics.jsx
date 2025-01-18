import { AnalyticsCard } from "./analytics-card";
import { ScrollArea,ScrollBar } from "./ui/scroll-area";
import { SeparatorDotted } from "./ui/separator-dotted";

export const Analytics = ({ data }) => {
    if (!data) return null;
    console.log(data)
    return (
        <ScrollArea className="border rounded-lg w-full whitespace-normal shrink-0">
            <div className="w-full flex flex-row">
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Total tasks"
                        value={data.taskCount}
                        variant={data.taskDifferent > 0 ? "up" : "down"}
                        increaseValue={data.taskDifferent} />
                        <SeparatorDotted orientation="vertical"/>
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Assigned tasks"
                        value={data.assignedTaskCount}
                        variant={data.assignedTaskDifferent > 0 ? "up" : "down"}
                        increaseValue={data.assignedTaskDifferent} />
                        <SeparatorDotted orientation="vertical"/>
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Completed tasks"
                        value={data.completeTaskCount}
                        variant={data.completeTaskDifferent > 0 ? "up" : "down"}
                        increaseValue={data.completeTaskDifferent} />
                        <SeparatorDotted orientation="vertical"/>
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Overdue tasks"
                        value={data.overdueTaskCount}
                        variant={data.overdueTaskDifferent > 0 ? "up" : "down"}
                        increaseValue={data.overdueTaskDifferent} />
                        <SeparatorDotted orientation="vertical"/>
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Incomplete tasks"
                        value={data.incompleteTaskCount}
                        variant={data.incompleteTaskDifferent > 0 ? "up" : "down"}
                        increaseValue={data.incompleteTaskDifferent} />
                        <SeparatorDotted orientation="vertical"/>
                </div>
            </div>
            <ScrollBar orientation="horizontal"/>
        </ScrollArea>
    )
}   