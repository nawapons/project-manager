"use client"
import { useEffect, useState } from "react"
import { RiAddCircleFill } from "react-icons/ri"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useCreateWorkspaceModal } from "../workspaces/hooks/use-create-workspace"
import { WorkspaceAvatar } from "../workspaces/components/workspace-avatar"
import { getWorkspaces } from "../workspaces/api/use-get-workspace"
import { useRouter } from "next/navigation"
import { useWorkspaceId } from "../workspaces/hooks/use-workspace-id"
export const WorkspaceSwitcher = () => {
    const { open } = useCreateWorkspaceModal();
    const router = useRouter()
    const workspaceId = useWorkspaceId();
    const [workspaces, setWorkspaces] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchWorkspaces = async () => {
        try{
            const data = await getWorkspaces();
            setWorkspaces(data);
        }catch(error){
            throw new Error(error.message)
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchWorkspaces();
    }, [])

    const onSelect = (id) => {
        router.push(`/workspaces/${id}`)
    }
    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-neutral-500">Workspaces</p>
                <RiAddCircleFill onClick={open} className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"/>
            </div>  
            <Select onOpenChange={fetchWorkspaces} onValueChange={onSelect} value={workspaceId}>
                <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
                    <SelectValue placeholder="No workspace selected"/>
                </SelectTrigger>
                <SelectContent>
                    {loading ?(
                        <SelectItem>Loading workspace</SelectItem>
                    ) : (
                        workspaces.map((workspace)=>(
                            <SelectItem key={workspace.id} value={workspace.id}>
                               <div className="flex justify-start items-center gap-3 font-medium">
                                <WorkspaceAvatar name={workspace.name} image={workspace.imageUrl} />
                                <span className="truncate">{workspace.name}</span>
                               </div>
                            </SelectItem>
                        ))
                    ) 
                    }
                </SelectContent>
            </Select>
        </div>
       
    )
}