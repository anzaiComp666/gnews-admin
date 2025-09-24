import { Button, Form } from "@heroui/react"
import { ProTableContext } from "../../context"
import { useContext, useState } from "react"
import { IProTableColumn } from "../../column"
import { TextRender } from "./text-render"
import { NumberRender } from "./number-render"
import { SliderRender } from "./slider-render"
import { RangeSliderRender } from "./range-slider-render"
import { SelectRender } from "./select-render"


export const ProTableFilterForm = () => {

    const context = useContext(ProTableContext)!
    const columns = context.columns.filter(column => column.filterVariant != undefined)
    const [filters, setFilters] = useState<Record<string, any>>({})

    const renderFieldComponent = (column: IProTableColumn<any>) => {
        switch (column.filterVariant) {
            case 'text':
                return <TextRender key={column.dataIndex.toString()} column={column} onValueChange={value => {
                    const trimmedValue = value.trim();
                    setFilters({
                        ...filters,
                        [column.dataIndex]: trimmedValue.length > 0 ? trimmedValue : undefined
                    })
                }} />
            case 'number':
                return <NumberRender key={column.dataIndex.toString()} column={column} onValueChange={value => setFilters({
                    ...filters,
                    [column.dataIndex]: value
                })} />
            case 'slider':
                return <SliderRender key={column.dataIndex.toString()} column={column} onChange={value => setFilters({
                    ...filters,
                    [column.dataIndex]: value
                })} />
            case 'range-slider':
                return <RangeSliderRender key={column.dataIndex.toString()} column={column} onChange={value => setFilters({
                    ...filters,
                    [column.dataIndex]: value
                })} />
            case 'select':
                return <SelectRender key={column.dataIndex.toString()} column={column} onSelectionChange={keys => {
                    const set = keys as Set<string>;
                    const value = set.size > 0 ? Array.from(set)[0] : undefined;
                    setFilters({
                        ...filters,
                        [column.dataIndex]: value
                    })
                }} />
            default:
                return null;
        }
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (context.page == 1 && context.filters == filters) {
            context.refresh();
            return
        }
        context.setPage(1);
        context.setFilters(filters);
    }

    return (
        <Form
            className="aria-hidden:hidden"
            aria-hidden={columns.length === 0}
            onSubmit={onSubmit}
        >
            <div className="flex flex-row flex-wrap gap-2">
                {columns.map(column => renderFieldComponent(column))}
            </div>

            <div className="w-full flex gap-2">
                <Button size="sm" color="primary" type='submit' isLoading={context.isRequesting}>筛选</Button>
                <Button size="sm" type='reset'>重置</Button>
            </div>
        </Form>
    )
}


