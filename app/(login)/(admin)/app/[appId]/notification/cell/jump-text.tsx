import { CellContext } from "@tanstack/react-table";
import { INotificationEntity } from "@/lib/dao/app/notification-type";


interface Props {
    info: CellContext<INotificationEntity, unknown>
}

export const JumpTextCell = (props: Props) => {
    const { info } = props
    const original = info.row.original

    return (
        <span className="line-clamp-1">{original.jumpText}</span>
    )
}

