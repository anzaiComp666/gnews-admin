import { Label } from "@/components/ui/label"
import { useFormContext, useFormState } from "react-hook-form"

interface Props {
    name: string
    title?: string
    direction?: "horizontal" | "vertical"
    children?: React.ReactNode
}
export const ProLabel = (props: Props) => {
    const form = useFormContext()

    return (
        <div className={`flex gap-2 ${props.direction === "horizontal" ? "flex-row" : "flex-col"}`}>
            {props.title && <span className="whitespace-nowrap text-sm font-medium">{props.title}</span>}
            {props.children}
        </div>
    )
}