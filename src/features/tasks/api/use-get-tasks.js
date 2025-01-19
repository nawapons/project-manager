import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const useGetTasks = ({
    workspaceId, projectId, status, search, assigneeId, dueDate
}) => {
    const query = useQuery({
        queryKey: ["tasks", workspaceId, projectId, status, search, assigneeId, dueDate],
        queryFn: async () => {
            const response = await axios.get("/api/task/", {
                params: {
                    workspaceId, projectId, status, search, assigneeId, dueDate
                }
            })
            if (response.status !== 200) {
                throw new Error("Failed to fetch tasks")
            }
            return await response.data.data;
        }
    })
    return query;
}
