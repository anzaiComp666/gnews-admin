import { ProNumberInput } from "@/pro-components/pro-number-input"
import { ControllerRenderProps } from "react-hook-form"

export interface ProFormFieldNumberInputProps {
    type: 'numberInput'
    defaultValue: number
    readonly?: boolean
    placeholder?: string
    hiddenStepper?: boolean,

}

export const ProFormFieldNumberInput = (props: ProFormFieldNumberInputProps & { field: ControllerRenderProps }) => {
    return (
        <ProNumberInput
            {...props.field}
            onChange={(event) => {
                const value = event.target.value
                props.field.onChange(Number(value))
            }}
            readOnly={props.readonly}
            placeholder={props.placeholder}
            hiddenStepper={props.hiddenStepper}
        />
    )
}