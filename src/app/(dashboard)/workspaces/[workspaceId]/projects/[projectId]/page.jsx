import React from 'react'
import { getProject } from '../query'
import { ProjectAvatar } from '@/components/projects/components/project-avatar'
import { Button } from '@/components/ui/button'
import { PencilIcon } from 'lucide-react'
import Link from 'next/link'
import { TaskViewSwitcher } from '@/components/tasks/task-view-switcher'

const ProjectPage = async ({
    params
}) => {
    const initialValues = await getProject({ projectId: params.projectId })
    if (!initialValues) throw new Error("Project not found!")
    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                    <ProjectAvatar className="size-8" image={initialValues[0].imageUrl} name={initialValues[0].name} />
                    <p className="text-lg font-semibold">{initialValues[0].name}</p>
                </div>
                <div>
                    <Button variant="secondary" size="sm" asChild>
                        <Link href={`/workspaces/${initialValues[0].workspacesId}/projects/${initialValues[0].id}/settings`}>
                            <PencilIcon className="size-4 mr-2" />
                            Edit Project
                        </Link>
                    </Button>
                </div>
            </div>
            <TaskViewSwitcher/>
        </div>
    )
}
export default ProjectPage;