import { Select, SelectItem, SelectProps } from "@heroui/react"
import { IProTableColumn } from "../../column"
import { useEffect, useState } from "react"

interface Props extends Pick<SelectProps, 'onSelectionChange'> {
    column: IProTableColumn<any>
}

export const SelectRender = (props: Props) => {
    const { column } = props
    const config = column.filterSelectOptions;

    const [options, setOptions] = useState<{
        label: string;
        value: string | number;
    }[]>([]);

    useEffect(() => {
        if (!config) {
            return
        }
        if (Array.isArray(config)) {
            setOptions(config);
        } else if (typeof config === 'function') {
            config().then(result => {
                setOptions(result)
            })
        }
    }, [config])


    return (
        <Select label={column.title} name={column.dataIndex.toString()} size="sm" className="w-48" onSelectionChange={props.onSelectionChange}>
            {options.map((option) => (
                <SelectItem key={option.value}>
                    {option.label}
                </SelectItem>
            ))}
        </Select>
    )
}