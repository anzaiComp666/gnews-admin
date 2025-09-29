import { ControllerRenderProps } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"


export interface ProFormFieldCheckboxProps {
    type: 'checkbox'
    defaultValue: boolean
    placeholder?: string
}

export const ProFormFieldCheckbox = (props: ProFormFieldCheckboxProps & { field: ControllerRenderProps }) => {
    return (
        <Checkbox  {...props.field} onCheckedChange={e => {
            props.field.onChange(e == true)
        }} />
    )
}