import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetCommentsMembers = ({
    taskId
}) => {
    return useQuery({
        queryKey: ["user-data", taskId],
        queryFn: async () => {
            const response = await axios.get("/api/comment/member/", {
                params: {
                    taskId: taskId,
                }
            });
            if (response.status !== 200) {
                throw new Error("Failed to fetch task comment")
            }
            return await response.data.data
        }
    })
}