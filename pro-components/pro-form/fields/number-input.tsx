import { ProNumberInput } from "@/pro-components/pro-number-input"
import { ControllerRenderProps } from "react-hook-form"

export interface ProFormFieldNumberInputProps {
    type: 'numberInput'
    defaultValue: number
    readonly?: boolean
    placeholder?: string
}

export const ProFormFieldNumberInput = (props: ProFormFieldNumberInputProps & { field: ControllerRenderProps }) => {
    return (
        <ProNumberInput
            {...props.field}
            readOnly={props.readonly}
            placeholder={props.placeholder}
        />
    )
}