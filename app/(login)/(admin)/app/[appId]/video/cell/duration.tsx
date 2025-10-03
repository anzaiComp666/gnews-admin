import { CellContext } from "@tanstack/react-table";
import { GappVideoEntity } from "@/lib/dao/video/gapp_video.entity";


interface Props {
    info: CellContext<GappVideoEntity, unknown>
}

function formatDuration(sec: number) {
    const hours = Math.floor(sec / 3600)
    const minutes = Math.floor((sec % 3600) / 60)
    const seconds = sec % 60
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

export const DurationCell = (props: Props) => {
    const { info } = props
    const original = info.row.original

    return (
        <span>{formatDuration(original.durationSec)}</span>
    )
}

