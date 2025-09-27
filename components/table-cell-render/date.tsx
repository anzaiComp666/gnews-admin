import dayjs from "dayjs"

interface Props {
    value: any
}
export const TableDateCellRender = (props: Props) => {

    return (
        <span>
            {props.value ? dayjs(props.value).format('YYYY-MM-DD HH:mm:ss') : '-'}
        </span>
    )
}