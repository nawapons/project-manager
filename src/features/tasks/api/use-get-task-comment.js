import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export const useGetTaskComment = ({
    taskId
}) => {
    return useQuery({
        queryKey: ["task-comment", taskId],
        queryFn: async () => {
            const response = await axios.get(`/api/task/comment/`, {
                params: {
                    taskId
                }
            })
            if (response.status !== 200) {
                throw new Error("Failed to fetch task comemnt")
            }
            return await response.data.data;
        }
    });
}