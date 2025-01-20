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

export const updateSchema = z.object({
    fullname: z.string().trim().min(1, { message: "Required" }),
    email: z.string().min(1, { message: "Required" }).email("This is not valid email").optional(),
})
export const passwordSchema = z.object({ //TODO : password not reading data from input
    oldPassword: z.string().min(8, { message: "Password must be leasts 8 characters" }),
    newPassword: z.string().min(8, { message: "Password must be leasts 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" })
        .refine((data) => data.newPassword === data.confirmPassword, {
            path: ["confirmPassword"], // This points to the specific field with the error
            message: "Passwords do not match",
        })
})