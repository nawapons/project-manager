import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetWorkspace = ({
    workspaceId
}) => {
    const query = useQuery({
        queryKey: [
            "workspace", workspaceId
        ],
        queryFn: async () => {
            const response = await axios.get("/api/workspace/getWorkspace", {
                params: {
                    workspaceId: workspaceId,
                }
            })
            if (response.status !== 200) {
                throw new Error("Failed to fetch workspace")
            }
            return await response.data.data;
        }
    })
    return query;
}
