import { UserButton } from "@/features/dashboard/user-button";
import Image from "next/image";
import Link from "next/link";
const StandloneLayout = ({ children }) => {
    return (
        <main className="bg-neutral-50 min-h-screen">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center h-[73px]">
                    <Link href="/">
                        <Image alt="logo" src="/static/images/logo.png" width="170" height="240" />
                    </Link>
                    <UserButton />
                </nav>
                <div className="flex flex-col items-center justify-center py-4 ">
                    {children}
                </div>
            </div>
        </main>
    )
}
export default StandloneLayout