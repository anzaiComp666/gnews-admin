import { Textarea } from "@/components/ui/textarea"
import { ControllerRenderProps } from "react-hook-form"

export interface ProFormFieldTextareaProps {
    type: 'textarea'
    defaultValue: string
    readonly?: boolean
    placeholder?: string
}

export const ProFormFieldTextarea = (props: ProFormFieldTextareaProps & { field: ControllerRenderProps }) => {
    return (
        <Textarea
            {...props.field}
            readOnly={props.readonly}
            placeholder={props.placeholder}
        />
    )
}