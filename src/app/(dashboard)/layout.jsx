import { SidebarComponents } from '@/components/dashboard/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react'
import { Navbar } from '@/components/dashboard/navbar';
import { WorkspaceAddModal } from '@/components/workspaces/workspace-add-modal';
import { CreateTaskModal } from '@/components/tasks/task-add-modal';

const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen">
            <WorkspaceAddModal />
            <CreateTaskModal />
            <SidebarProvider>
                {/* <WorkspaceAddModal /> */}
                <div className="flex w-full h-full">
                    <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
                        <SidebarComponents />
                    </div>
                    <div className="lg:pl-[264px] w-full">
                        <div className="mx-auto max-w-screen-2xl h-full">
                            <Navbar />
                            <main className="h-full py-8 px-6 flex flex-col">

                                {children}
                            </main>
                        </div>
                    </div>
                </div>
            </SidebarProvider>
        </div>
    )
}

export default DashboardLayout