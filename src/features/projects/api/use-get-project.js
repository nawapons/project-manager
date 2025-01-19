import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetProject = ({
    projectId
}) => {
    const query = useQuery({
        queryKey: [
            "project", projectId
        ],
        queryFn: async () => {
            const response = await axios.get("/api/project/getProject", {
                params: {
                    projectId: projectId,
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
