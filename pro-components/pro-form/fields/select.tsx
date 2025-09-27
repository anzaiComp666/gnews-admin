import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Key } from "react";
import { ControllerRenderProps } from "react-hook-form"

export interface ProFormFieldSelectProps {
    type: 'select'
    options: { label: string; value: Key }[]
    defaultValue: Key
    placeholder?: string

}

export const ProFormFieldSelect = (props: ProFormFieldSelectProps & {
    field: ControllerRenderProps
}) => {
    const { options, field } = props
    const onValueChange = (value: string) => {
        const index = options.findIndex(option => option.value.toString() == value);
        if (index !== -1) {
            props.field.onChange(options[index].value);
            return;
        }
    }

    return (
        <Select {...field} onValueChange={onValueChange} value={field.value?.toString()}>
            <SelectTrigger>
                <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent>
                {props.options.map((option) => (
                    <SelectItem
                        key={option.value}
                        value={option.value.toString()}
                    >
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}