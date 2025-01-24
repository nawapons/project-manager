"use client"
import { RiAddCircleFill } from "react-icons/ri";
import { useGetProjects } from "../projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ProjectAvatar } from "../projects/components/project-avatar";
import { useCreateProjectModal } from "../projects/hooks/use-create-project";
import { ProjectAddModal } from "../projects/components/project-add-modal";
import { ProjectSkeleton } from "../skeleton/project-skeleton";

export const Projects = () => {
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();
  const {data: projects , isLoading: projectsLoading} = useGetProjects({workspaceId});
  const { open: openProject } = useCreateProjectModal();

  return (
    <div className="flex flex-col gap-y-2">
      <ProjectAddModal />
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          onClick={openProject}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>
      {projectsLoading ? (
        <div><ProjectSkeleton /></div>
      ) : (
        projects?.map((project) => {
          const href = `/workspaces/${workspaceId}/projects/${project.id}`;
          const isActive = pathname === href;
          return (
            <Link href={href} key={project.id}>
              <div
                className={cn(
                  "flex items-center gap-2.5 p-2.5 rounded-md hover-opacity-75 transition cursor-pointer text-neutral-500",
                  isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
                )}
              >
                <ProjectAvatar image={project.imageUrl} name={project.name} />
                <span className="truncate">{project.name}</span>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};
