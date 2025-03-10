import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export const useGetCurrent = () => {
    return useQuery({
        queryKey: ["current"],
        queryFn: async () => {
            const response = await axios.get("/api/auth/");
            if (response.status !== 200) {
                throw new Error("Failed to fetch current user")
            }
            return await response.data.data
        }
    })
}