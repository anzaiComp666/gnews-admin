import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProButton } from "@/pro-components/pro-button"
import { ProDatePicker } from "@/pro-components/pro-date-picker"
import { ProNumberInput } from "@/pro-components/pro-number-input"
import { Column } from "@tanstack/react-table"
import { Controller, useForm } from "react-hook-form"

interface FilterVariantInput {
    type: 'input'
}

interface FilterVariantNumberInput {
    type: 'number-input'
}

interface FilterVariantSelect {
    type: 'select'
    options: { label: string; value: any }[]
}

interface FilterVariantDateRange {
    type: 'date-range'
}

interface FilterVariantCheckbox {
    type: 'checkbox'
}

type FilterVariant =
    FilterVariantInput |
    FilterVariantNumberInput |
    FilterVariantSelect |
    FilterVariantDateRange |
    FilterVariantCheckbox
const FilterVariantKey = "filterVariant"

export const makeFilterVariant = (variant: FilterVariant) => {
    return {
        [FilterVariantKey]: variant
    }
}

interface Props {
    isPending?: boolean
    columns: Column<any, unknown>[]
}

export const ProTableFilterForm = (props: Props) => {
    const columns = props.columns.filter(column => column.getCanFilter())
    const { control, register, handleSubmit, reset } = useForm({
        defaultValues: {
            // 初始化默认值
            ...columns.reduce((acc, column) => {
                acc[column.id] = column.getFilterValue() ?? ''
                return acc
            }, {} as Record<string, any>)
        }
    });

    const renderFieldComponent = (column: Column<any, unknown>) => {
        const meta = (column.columnDef.meta ?? {}) as Record<string, any>

        const variant = meta[FilterVariantKey] as FilterVariant | undefined
        if (!variant) {
            return <Input {...register(column.id)} name={column.id} />
        }

        switch (variant.type) {
            case "number-input":
                return <ProNumberInput {...register(column.id)} type="number" hiddenStepper />

            case "select":
                return (
                    <Controller control={control} name={column.id} render={({ field }) => (
                        <Select {...field} value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="请选择" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {variant.options.map(option => (
                                        <SelectItem key={option.value.toString()} value={option.value.toString()}>{option.label}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )} />
                )

            case "date-range":
                return (
                    <Controller control={control} name={column.id} render={({ field }) => (
                        <ProDatePicker
                            {...field}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="选择日期范围" />
                    )} />
                )

            case "checkbox":
                return (
                    <Controller control={control} name={column.id} render={({ field }) => (
                        <Checkbox {...field} onCheckedChange={field.onChange} checked={field.value ?? false} />
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

    const onReset = () => {
        reset();
        columns.forEach(column => column.setFilterValue(undefined));
    };


    if (columns.length === 0) {
        return null
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                    {columns.map((column) => (
                        <div key={column.id} className="flex items-center gap-1">
                            <span className="whitespace-nowrap text-sm font-medium">{column.columnDef.header?.toString()}</span>
                            {renderFieldComponent(column)}
                        </div>
                    ))}
                </div>
                <div className=" inline-flex items-center gap-2">
                    <ProButton type="submit" disabled={props.isPending}>搜索</ProButton>
                    <ProButton type="reset" variant="outline" onClick={onReset} disabled={props.isPending}>重置</ProButton>
                </div>
            </div>
        </form>
    )
}