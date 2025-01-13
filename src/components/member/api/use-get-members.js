import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetMembers = ({
    workspaceId
}) => {
    const query = useQuery({
        queryKey: ["members", workspaceId],
        queryFn: async () => {
            const response = await axios.get("/api/member/", {
                params: {
                    workspaceId: workspaceId
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

// import axios from "axios"

// export const useGetMembers = async ({ workspaceId }) => {
//     try {
//         const response = await axios.get(`/api/member/`,{
//             params:{
//                 workspaceId: workspaceId,
//             }
//         })
//         return response.data.data
//     } catch (error) {
//         console.error("Error fetching members:", error.message)
//     }
// }