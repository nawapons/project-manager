import { AnalyticsCard } from "./analytics-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SeparatorDotted } from "@/components/ui/separator-dotted";

export const Analytics = ({ data }) => {
    if (!data) return null;
    return (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
                <AnalyticsCard
                    title="Total tasks"
                    value={data.taskCount}
                    variant={data.taskDifferent > 0 ? "up" : "down"}
                    increaseValue={data.taskDifferent} />
                <AnalyticsCard
                    title="Assigned tasks"
                    value={data.assignedTaskCount}
                    variant={data.assignedTaskDifferent > 0 ? "up" : "down"}
                    increaseValue={data.assignedTaskDifferent} />
                <AnalyticsCard
                    title="Completed tasks"
                    value={data.completeTaskCount}
                    variant={data.completeTaskDifferent > 0 ? "up" : "down"}
                    increaseValue={data.completeTaskDifferent} />
                <AnalyticsCard
                    title="Overdue tasks"
                    value={data.overdueTaskCount}
                    variant={data.overdueTaskDifferent > 0 ? "up" : "down"}
                    increaseValue={data.overdueTaskDifferent} />
                <AnalyticsCard
                    title="Incomplete tasks"
                    value={data.incompleteTaskCount}
                    variant={data.incompleteTaskDifferent > 0 ? "up" : "down"}
                    increaseValue={data.incompleteTaskDifferent} />
                {/* <div className="flex items-center flex-1">
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
                </div> */}
            </div>
          
    )
}   