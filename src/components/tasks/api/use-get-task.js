import { useQuery } from "@tanstack/react-query";

export const useGetTask = ({
    taskId
}) => {
    const query = useQuery({
        queryKey: ["task", taskId],
        queryFn: async () => {
            const response = await axios.get("/api/task/", {
                taskId
            })
            if (response.status !== 200) {
                throw new Error("Failed to fetch task")
            }
            return await response.data.data;
        }
    })
    return query;
}