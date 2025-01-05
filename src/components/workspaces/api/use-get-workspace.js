import axios from "axios"

export const getWorkspaces = async () => {
    try {
        const response = await axios.get(`/api/workspace/`)
        return response.data.data
    } catch (error) {
        console.error("Error fetching workspaces:", error)
    }
}