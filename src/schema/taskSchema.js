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
  workspacesId: z.string().trim().min(1, "Required"),
  projectsId: z.string().trim().min(1, "Required"),
  startDate: z.coerce.date(),
  dueDate: z.coerce.date(),
  assigneeId: z.string().trim().min(1, "Required"),
  description: z.string().optional(),
})
export const bulkTaskUpdateSchema = z.object({
  tasks: z.array(
    z.object({
      id: z.string(),
      status: z.nativeEnum(TaskStatus),
      position: z.number().int().positive().min(1000).max(1_000_000)
    })
  )
})
export const commentTaskSchema = z.object({
  taskId: z.string().trim().min(1, "Required"),
  message: z.string().trim().min(1, "Required")
})