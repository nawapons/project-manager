"use client"
const { Button } = require("@/components/ui/button")
const { AlertTriangle } = require("lucide-react")
const { default: Link } = require("next/link")

const ErrorPage = () => {
    return (
        <div className="h-screen flex flex-col gap-y-2 items-center justify-center">
            <AlertTriangle className="size-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
                Something went wrong
            </p>
            <Button variant="secondary" asChild>
                <Link href="/">
                    Back to home
                </Link>
            </Button>
        </div>
    )
}
export default ErrorPage;