"use client"
import { ResetPasswordForm } from "@/features/account/components/reset-password-form"
import { AccountSkeleton } from "@/features/skeleton/account-skeleton";

export const ResetPasswordPageClient = () => {
    return (
        <div className="w-full lg:max-w-xl">
            <ResetPasswordForm />
        </div>
    )
}