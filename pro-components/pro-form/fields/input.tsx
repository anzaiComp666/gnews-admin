import { Input } from "@/components/ui/input"
import { ControllerRenderProps } from "react-hook-form"

export interface ProFormFieldInputProps {
    type: 'input'
    defaultValue: string
    readonly?: boolean
    placeholder?: string
}

export const ProFormFieldInput = (props: ProFormFieldInputProps & { field: ControllerRenderProps }) => {
    return (
        <Input
            {...props.field}
            readOnly={props.readonly}
            placeholder={props.placeholder}
        />
    )
}