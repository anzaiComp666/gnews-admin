export interface IProTableColumn<T> {
    // 标题
    title: string

    // 数据索引
    dataIndex: keyof T | string

    // 是否可排序
    sortable?: boolean

    // 默认排序方向
    defaultSortDirection?: 'ascending' | 'descending'

    // 是否可过滤
    filterVariant?: 'text' | 'number' | 'slider' | 'range-slider' | 'select'

    // slider过滤选项
    filterSliderProps?: {
        min?: number
        max?: number
        step?: number
    }

    // select过滤选项
    filterSelectOptions?: {
        label: string
        value: string | number
    }[] | (() => Promise<{
        label: string
        value: string | number
    }[]>)

    // 列是否隐藏
    hidden?: boolean

    // cell自定义渲染函数
    render?: (item: T) => React.ReactNode
}