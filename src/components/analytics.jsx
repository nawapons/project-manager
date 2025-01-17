import { AnalyticsCard } from "./analytics-card";
import { ScrollArea } from "./ui/scroll-area";

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
                        variant={data.taskDifference > 0 ? "up" : "down"}
                        increaseValue={data.taskDifference} />
                </div>
            </div>
        </ScrollArea>
    )
}   