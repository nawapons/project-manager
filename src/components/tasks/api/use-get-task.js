import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetTask = ({
    taskId
}) => {
    const query = useQuery({
        queryKey: ["task", taskId],
        queryFn: async () => {
            const response = await axios.get(`/api/task/getTask/`, {
                params: {
                    taskId
                }
            })
            if (response.status !== 200) {
                throw new Error("Failed to fetch task")
            }
            return await response.data.data;
        }
    })
    return query;
}