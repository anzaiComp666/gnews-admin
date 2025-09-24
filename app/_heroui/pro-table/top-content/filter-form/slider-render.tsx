import { Slider, SliderProps } from "@heroui/react"
import { IProTableColumn } from "../../column"

interface Props extends Pick<SliderProps, 'onChange'> {
    column: IProTableColumn<any>
}

export const SliderRender = (props: Props) => {
    const { column } = props
    const config = column.filterSliderProps;
    return (
        <Slider
            label={column.title}
            name={column.dataIndex.toString()}
            minValue={config?.min}
            maxValue={config?.max}
            step={config?.step}
            size="sm"
            className="w-48"
            onChange={props.onChange}
        />
    )
}