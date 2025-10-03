import { CellContext } from "@tanstack/react-table";
import { IGappVideoEntity } from "@/lib/dao/video/gapp_video.entity.type";


interface Props {
    info: CellContext<IGappVideoEntity, unknown>
}

export const LabelsCell = (props: Props) => {
    const { info } = props
    const original = info.row.original
    const str = original.labels.map(e => e.labelName).join(", ")
    return (
        <span>{str}</span>
    )
}

