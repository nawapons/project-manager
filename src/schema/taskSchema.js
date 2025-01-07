import { z } from "zod"

export const TaskStatus = {
    BACKLOG: "BACKLOG",
    TODO: "TODO",
    IN_PROGRESS: "IN_PROGRESS",
    IN_REVIEW: "IN_REVIEW",
    DONE: "DONE",
  };
  
export const createTaskSchema = z.object({
    name: z.string().trim().min(1, "Required"),
    status: z.nativeEnum(TaskStatus, { required_error: "Required" }),
    workspacesId: z.string().trim().min(1,"Required"),
    projectsId: z.string().trim().min(1,"Required"),
    dueDate: z.coerce.date(),
    assigneeId: z.string().trim().min(1,"Required"),
    description: z.string().optional(),
})