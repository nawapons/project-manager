
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getCurrent = () => {
    const query = useQuery({
        queryKey: ["current"],
        queryFn: async () => {
            const response = await axios.get("/api/auth/");
            console.log(response)
            if (response.status !== 200) {
                console.log(error)
                throw new Error("Failed to fetch current user")
            }
            console.log("SESSION",response.data.data)
            return await response.data.data
        }
    })
    return query
}