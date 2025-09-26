import { Input } from "@/components/ui/input"
import { ControllerRenderProps } from "react-hook-form"

export interface ProFormFieldInputProps {
    type: 'input'
    defaultValue?: string
}

export const ProFormFieldInput = (props: { field: ControllerRenderProps }) => {
    return <Input {...props.field} />
}