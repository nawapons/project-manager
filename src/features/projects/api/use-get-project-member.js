import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export const useGetProjectMembers = ({
    projectId
}) => {
    return useQuery({
        queryKey: ["project-members", projectId],
        queryFn: async () => {
            const response = await axios.get("/api/project/member/", {
                params: {
                    projectId: projectId
                }
            })
            if (response.status !== 200) {
                throw new Error("Failed to fetch project members")
            }
            return await response.data.data;
        }
    });
}
