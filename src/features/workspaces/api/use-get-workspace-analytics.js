import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export const useGetWorkspaceAnalytics = ({
    workspaceId
}) => {
    return useQuery({
        queryKey: [
            "workspace-analytics", workspaceId
        ],
        queryFn: async () => {
            const response = await axios.get("/api/workspace/analytics", {
                params: {
                    workspaceId: workspaceId,
                }
            })
            if (response.status !== 200) {
                throw new Error("Failed to fetch workspace analytics")
            }
            return await response.data.data;
        }
    });
}
