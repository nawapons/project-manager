"use client"
import { RiAddCircleFill } from "react-icons/ri"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace"
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar"
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces"
import { useRouter } from "next/navigation"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { WorkspaceSkeleton } from "../skeleton/workspace-skeleton"
import { useState } from "react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
export const WorkspaceSwitcher = () => {
    const [openComboBox, setOpenComboBox] = useState(false)
    const [value, setValue] = useState("")
    const { open } = useCreateWorkspaceModal();
    const router = useRouter()
    const workspaceId = useWorkspaceId();
    const { data: workspaces, isLoading: isLoadingWorkspaces } = useGetWorkspaces()
    let workspace
    const onSelected = (id) => {
        router.push(`/workspaces/${id}`)
    }
    if (isLoadingWorkspaces) return <WorkspaceSkeleton />
    return (
        <div className="flex flex-col gap-y-2">
         <div className="flex items-center justify-between">
            <p className="text-xs uppercase text-neutral-500">Workspaces</p>
            <RiAddCircleFill onClick={open} className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
        </div>
        <Popover open={openComboBox} onOpenChange={setOpenComboBox}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {
                        value
                            ? (workspace = workspaces.find((workspace) => workspace.id === value)) && (
                                <>
                                    <WorkspaceAvatar name={workspace.name} image={workspace.imageUrl} />
                                    <span className="truncate">{workspace.name}</span>
                                </>
                            )
                            : (workspace = workspaces.find((workspace) => workspace.id === workspaceId)) && (
                                <>
                                    <WorkspaceAvatar name={workspace.name} image={workspace.imageUrl} />
                                    <span className="truncate">{workspace.name}</span>
                                </>
                            )
                    }
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search workspace..." />
                    <CommandList>
                        <CommandEmpty>No workspace found.</CommandEmpty>
                        <CommandGroup>
                            {workspaces.map((workspace) => (
                                <CommandItem
                                    key={workspace.id}
                                    value={workspace.id}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue)
                                        setOpenComboBox(false)
                                        onSelected(currentValue)
                                    }}
                                >
                                    <WorkspaceAvatar name={workspace.name} image={workspace.imageUrl} />
                                    <span className="truncate">{workspace.name}</span>
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === workspace.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
        </div>
        // <div className="flex flex-col gap-y-2">
        //     <div className="flex items-center justify-between">
        //         <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        //         <RiAddCircleFill onClick={open} className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition" />
        //     </div>
        //     <Select onValueChange={onSelect} value={workspaceId}>
        //         <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
        //             <SelectValue placeholder="No workspace selected" />
        //         </SelectTrigger>
        //         <SelectContent>
        //             {workspaces.map((workspace) => (
        //                 <SelectItem key={workspace.id} value={workspace.id}>
        //                     <div className="flex justify-start items-center gap-3 font-medium">
        //                         <WorkspaceAvatar name={workspace.name} image={workspace.imageUrl} />
        //                         <span className="truncate">{workspace.name}</span>
        //                     </div>
        //                 </SelectItem>
        //             ))
        //             }
        //         </SelectContent>
        //     </Select>
        // </div>

    )
}