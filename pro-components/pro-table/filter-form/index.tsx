import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProButton } from "@/pro-components/pro-button"
import { ProDatePicker } from "@/pro-components/pro-date-picker"
import { ProNumberInput } from "@/pro-components/pro-number-input"
import { Column } from "@tanstack/react-table"
import { Controller, useForm } from "react-hook-form"

export enum ProTableFilterVariant {
    input = 'input',
    numberInput = 'number-input',
    select = 'select',
    dateRange = 'date-range',
}

export const ProTableFilterVariantKey = {
    filterVariant: 'filterVariant',
    filterSelectOptions: 'filterSelectOptions'
}


interface Props {
    isPending?: boolean
    columns: Column<any, unknown>[]
}

export const ProTableFilterForm = (props: Props) => {
    const columns = props.columns.filter(column => column.getCanFilter())
    const { control, register, handleSubmit, reset } = useForm();

    const renderFieldComponent = (column: Column<any, unknown>) => {
        const meta = column.columnDef.meta ?? {}

        const variant = meta[ProTableFilterVariantKey.filterVariant] as ProTableFilterVariant
        switch (variant) {
            case ProTableFilterVariant.numberInput:
                return <ProNumberInput {...register(column.id)} type="number" hiddenStepper />

            case ProTableFilterVariant.select:
                const options = meta[ProTableFilterVariantKey.filterSelectOptions] as { label: string; value: any }[]
                return (
                    <Controller control={control} name={column.id} render={({ field }) => (
                        <Select {...field} value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="请选择" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {options.map(option => (
                                        <SelectItem key={option.value.toString()} value={option.value.toString()}>{option.label}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )} />
                )

            case ProTableFilterVariant.dateRange:
                return (
                    <Controller control={control} name={column.id} render={({ field }) => (
                        <ProDatePicker
                            {...field}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="选择日期范围" />
                    )} />
                )

            default:
                return <Input {...register(column.id)} name={column.id} />
        }

    }

    const onSubmit = (data: Record<string, any>) => {
        columns.forEach(column => {
            const value = data[column.id]
            if (value === undefined || value === null || value === '') {
                column.setFilterValue(undefined)
            } else {
                column.setFilterValue(value)
            }
        })
    }


    if (columns.length === 0) {
        return null
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                    {columns.map((column) => (
                        <div key={column.id} className="flex items-center gap-1">
                            <span className="whitespace-nowrap text-sm font-medium">{column.columnDef.header.toString()}</span>
                            {renderFieldComponent(column)}
                        </div>
                    ))}
                </div>
                <div className=" inline-flex items-center gap-2">
                    <ProButton type="submit" disabled={props.isPending}>搜索</ProButton>
                    <ProButton type="reset" variant="outline" onClick={reset} disabled={props.isPending}>重置</ProButton>
                </div>
            </div>
        </form>
    )
}