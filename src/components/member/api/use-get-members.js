import axios from "axios"

export const useGetMembers = async ({ workspaceId }) => {
    try {
        const response = await axios.get(`/api/member/`,{
            params:{
                workspaceId: workspaceId,
            }
        })
        return response.data.data
    } catch (error) {
        console.error("Error fetching members:", error.message)
    }
}