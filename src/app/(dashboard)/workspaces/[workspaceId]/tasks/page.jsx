import { TaskViewSwitcher } from "@/components/tasks/task-view-switcher"

const TaskPage = async () => {
    return (
        <div className="h-full flex flex-col">
            <TaskViewSwitcher />
        </div>
    )
}
export default TaskPage