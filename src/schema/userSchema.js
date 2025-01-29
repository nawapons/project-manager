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
    image: z
        .union([
            z.instanceof(File), // Handle uploaded files
            z.string().transform((value) => (value === "" ? undefined : value)), // Transform empty string to null
            z.null(), // Allow explicitly null values
        ])
        .optional(),
})
export const passwordSchema = z.object({
    oldPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
    newPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"], // Pointing to the confirmPassword field
    message: "Passwords do not match",
});