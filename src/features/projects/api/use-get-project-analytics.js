import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetProjectAnalytics = ({
    projectId
}) => {
    const query = useQuery({
        queryKey: [
            "project-analytics", projectId
        ],
        queryFn: async () => {
            const response = await axios.get("/api/project/analytics", {
                params: {
                    projectId: projectId,
                }
            })
            if (response.status !== 200) {
                throw new Error("Failed to fetch project analytics")
            }
            return await response.data.data;
        }
    })
    return query;
}
