"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { DateRange } from "react-day-picker"
import { Input } from "@/components/ui/input"

interface Props extends Omit<React.ComponentProps<typeof Input>, 'value' | 'onChange'> {
    value: DateRange | undefined
    onChange: (date: DateRange) => void
}

export function ProDatePicker(props: Props) {
    const [open, setOpen] = React.useState(false)
    const { value, onChange, ...resetProps } = props

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
                <Input
                    {...resetProps}
                    className="w-48 font-normal"
                    readOnly
                    value={
                        value
                            ? `${value.from?.toLocaleDateString()} - ${value.to?.toLocaleDateString()}`
                            : ""
                    }
                />
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                    mode="range"
                    selected={value}
                    captionLayout="dropdown"
                    onSelect={onChange}
                />
            </PopoverContent>
        </Popover>
    )
}
