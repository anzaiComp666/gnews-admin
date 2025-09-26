import React, { Key } from "react";
import * as SelectPrimitive from "@radix-ui/react-select"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props extends Omit<SelectPrimitive.SelectProps, "onValueChange" | "value" | "defaultValue"> {
    value?: Key
    defaultValue?: Key
    onValueChange?: (value: Key) => void

    placeholder?: string
    options: { label: string, value: Key }[]
}

export const ProSelect = (props: Props) => {
    const { value, defaultValue, placeholder, options, onValueChange, ...resetProps } = props

    const handleValueChange = (value: string) => {

        // 转换为原始value
        const index = options.findIndex(opt => opt.value.toString() === value)
        if (index === -1) {
            return
        }
        onValueChange?.(options[index].value)
    }

    return (
        <Select
            {...resetProps}
            value={value?.toString()}
            defaultValue={defaultValue?.toString()}
            onValueChange={handleValueChange}
        >
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
                {options.map(opt => (
                    <SelectItem key={opt.value} value={opt.value.toString()}>
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}