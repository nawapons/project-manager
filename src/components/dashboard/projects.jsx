"use client"
import { RiAddCircleFill } from "react-icons/ri";
import { getProjects } from "../projects/api/use-get-projects";
import { useWorkspaceId } from "../workspaces/hooks/use-workspace-id";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ProjectAvatar } from "../projects/components/project-avatar";
import { useCreateProjectModal } from "../projects/hooks/use-create-project";
import { ProjectAddModal } from "../projects/project-add-modal";
import { ProjectSkeleton } from "../skeleton/project-skeleton";

export const Projects = () => {
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { open: openProject } = useCreateProjectModal();

  const fetchProjects = async () => {
    if (!workspaceId) return; // Don't fetch projects if workspaceId is not ready
    try {
      setLoading(true); // Ensure loading state is set when fetching
      const data = await getProjects({ workspaceId });
      setProjects(data);
    } catch (error) {
      throw new Error(error.message)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [pathname]);



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
      {loading ? (
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
