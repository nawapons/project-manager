import { Card } from "@/components/ui/card"

const ItemList = ({ children, title, Action }) => {
    return (
        <Card className="h-full w-full lg:flex-none lg:w-80 p-2">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold tracking-tight">
                    {title}
                </h1>
                {Action ? Action : null}
            </div>
            <div className="w-full h-full flex flex-col items-center justify-start gap-2">
                {children}
            </div>
        </Card>
    )
}
export default ItemList