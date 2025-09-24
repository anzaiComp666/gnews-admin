import { NumberInput, NumberInputProps } from "@heroui/react"
import { IProTableColumn } from "../../column"

interface Props extends Pick<NumberInputProps, 'onValueChange'> {
    column: IProTableColumn<any>

}

export const NumberRender = (props: Props) => {
    const { column } = props
    return (
        <NumberInput label={column.title} name={column.dataIndex.toString()} hideStepper size="sm" className="w-auto" onValueChange={props.onValueChange} />
    )
}