import axios from "axios"

export const useGetTasks = async ({ workspaceId, projectId, status, search, assigneeId, dueDate }) => {
    try {
        const response = await axios.get(`/api/task/`, {
            params: {
                workspaceId: workspaceId,
                projectId : projectId, 
                status : status, 
                search : search, 
                assigneeId : assigneeId, 
                dueDate : dueDate
            }
        })
        return response.data.data
    } catch (error) {
        console.error("Error fetching tasks:", error)
        throw new Error("Failed to get tasks")
    }
}
