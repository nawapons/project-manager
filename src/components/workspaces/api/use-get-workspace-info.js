import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetWorkspaceInfo = ({
    workspaceId
}) => {
    const query = useQuery({
        queryKey: [
            "workspace-info", workspaceId
        ],
        queryFn: async () => {
            const response = await axios.get("/api/workspace/getWorkspaceInfo", {
                params: {
                    workspaceId: workspaceId,
                }
            })
            if (response.status !== 200) {
                throw new Error("Failed to fetch workspace info")
            }
            return await response.data.data;
        }
    })
    return query;
}
