import axios from "axios"

export const getProjects = async ({ workspaceId }) => {
    try {
        const response = await axios.get(`/api/project/`, {
            params: {
                workspaceId: workspaceId,
            }
        })
        return response.data.data
    } catch (error) {
        console.error("Error fetching workspaces:", error)
        throw new Error("Failed to get Projects")
    }
}
