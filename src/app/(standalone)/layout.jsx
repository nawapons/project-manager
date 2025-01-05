import { UserButton } from "@/components/dashboard/user-button";
import Image from "next/image";
import Link from "next/link";

const StandloneLayout = ({ children }) => {
    return (
        <main className="bg-neutral-50 min-h-screen">
            <div className="mx-auto mx-w-screen-2xl p-4">
                <nav className="flex justify-between items-center h-[73px]">
                    Project-Manager
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