import { useQueryState, parseAsBoolean } from "nuqs"
export const useAddProjectMemberModal = () => {
    const [isOpen, setIsOpen] = useQueryState(
        'project-member',
        parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
    )
    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    return {
        isOpen,
        open, close,
        setIsOpen,
    }
}