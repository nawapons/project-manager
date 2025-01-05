import { z } from "zod";

export const registerSchema = z.object({
    fullname: z.string().min(1, { message: "Required" }),
    email: z.string().min(1, { message: "Required" }).email("This is not valid email"),
    password: z.string().min(8, { message: "Password must be leasts 8 characters" })
})
export const loginSchema = z.object({
    email: z.string().min(1, { message: "Required" }).email("This is not valid email"),
    password: z.string().min(8, { message: "Password must be leasts 8 characters" })
})