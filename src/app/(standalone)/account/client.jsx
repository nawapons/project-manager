"use client"
import { AccountEditForm } from "@/features/account/components/account-edit-form";
import { useGetCurrent } from "@/features/auth/api/use-get-current";
import { PageError } from "@/features/page-error";
import { AccountSkeleton } from "@/features/skeleton/account-skeleton";

export const AccountSettingsClient = () => {
    const { data: initialValues, isLoading } = useGetCurrent()
    if(isLoading) return <AccountSkeleton/>
    if(!initialValues) return <PageError message="Something went wrong with account data"/>
    return (
        <div className="w-full lg:max-w-2xl">
            <AccountEditForm initialValues={initialValues} />
        </div>
    )
}