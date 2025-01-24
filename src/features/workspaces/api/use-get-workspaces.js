import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export const useGetWorkspaces = () => {
    return useQuery({
        queryKey: [
            "workspaces"
        ],
        queryFn: async () => {
            const response = await axios.get("/api/workspace/")
            if (response.status !== 200) {
                throw new Error("Failed to fetch workspaces")
            }
            return await response.data.data;
        }
    });
}
