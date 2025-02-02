import { AnalyticsCard } from "./analytics-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SeparatorDotted } from "@/components/ui/separator-dotted";

export const Analytics = ({ data }) => {
    if (!data) return null;
    return (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            <AnalyticsCard
                title="Total tasks"
                value={data.thisMonth.taskCount}
                lastMonthTotal={data.lastMonth.taskCount} // Pass the last month's total
                variant={data.thisMonth.taskCount > data.lastMonth.taskCount ? "up" : "down"}
            />

            <AnalyticsCard
                title="Assigned tasks"
                value={data.thisMonth.assignedTaskCount}
                lastMonthTotal={data.lastMonth.assignedTaskCount} // Pass the last month's total
                variant={data.thisMonth.assignedTaskCount > data.lastMonth.assignedTaskCount ? "up" : "down"}
            />

            <AnalyticsCard
                title="Completed tasks"
                value={data.thisMonth.completeTaskCount}
                lastMonthTotal={data.lastMonth.completeTaskCount} // Pass the last month's total
                variant={data.thisMonth.completeTaskCount > data.lastMonth.completeTaskCount ? "up" : "down"}
            />

            <AnalyticsCard
                title="Overdue tasks"
                value={data.thisMonth.overdueTaskCount}
                lastMonthTotal={data.lastMonth.overdueTaskCount} // Pass the last month's total
                variant={data.thisMonth.overdueTaskCount > data.lastMonth.overdueTaskCount ? "up" : "down"}
            />

            <AnalyticsCard
                title="Incomplete tasks"
                value={data.thisMonth.incompleteTaskCount}
                lastMonthTotal={data.lastMonth.incompleteTaskCount} // Pass the last month's total
                variant={data.thisMonth.incompleteTaskCount > data.lastMonth.incompleteTaskCount ? "up" : "down"}
            />

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