import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { MemberAvatar } from "@/features/member/components/member-avatar"
import { useTaskId } from "@/features/tasks/hooks/use-task-id"
import { Plus } from "lucide-react"
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
} from "lucide-react"
import { useProjectId } from "../hooks/use-project-id"
import { useAddProjectMember } from "../api/use-add-project-member"
export const AddProjectMemberForm = ({ onCancel, memberOptions }) => {
    const projectId = useProjectId();
    const { mutate, isPending } = useAddProjectMember()
    const onSelectUser = async (userId) => {
        mutate({ userId, projectId }, {
            onSuccess: () => {
                onCancel();
            }
        })
    }
    return (
        <Command className="rounded-lg border shadow-md md:min-w-[450px]">
            <CommandInput placeholder="Type a member name..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="User list">
                    {memberOptions.map((member, index) => (
                        <CommandItem key={index} className="flex justify-between">
                            <MemberAvatar className="size-6" imageUrl={member.imageUrl} name={member.name} />
                            <span>{member.name}</span>
                            <CommandShortcut><Button disabled={isPending} onClick={() => onSelectUser(member.userId)} size="icon" variant="ghost"><Plus /></Button></CommandShortcut>
                        </CommandItem>
                    ))}
                </CommandGroup>
                <CommandSeparator />
            </CommandList>
        </Command>
    )
}