import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetProjects = ({
    workspaceId
}) => {
    const query = useQuery({
        queryKey: [
            "projects", workspaceId
        ],
        queryFn: async () => {
            const response = await axios.get("/api/project/", {
                params: {
                    workspaceId: workspaceId,
                }
            })
            if (response.status !== 200) {
                throw new Error("Failed to fetch project")
            }
            return await response.data.data;
        }
    })
    return query;
}
