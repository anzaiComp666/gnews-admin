import { Input, InputProps } from "@heroui/react"
import { IProTableColumn } from "../../column"

interface Props extends Pick<InputProps, 'onValueChange'> {
    column: IProTableColumn<any>
}

export const TextRender = (props: Props) => {
    const { column } = props
    return (
        <Input label={column.title} name={column.dataIndex.toString()} size="sm" className="w-auto" onValueChange={props.onValueChange} />
    )
}