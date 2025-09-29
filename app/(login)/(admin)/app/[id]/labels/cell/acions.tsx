import { IGappVideoLabelEntity } from "@/lib/dao/video/gapp_video_label.entity";
import { CellContext } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

interface Props {
    info: CellContext<IGappVideoLabelEntity, unknown>
}

export const ActionsCell = (props: Props) => {
    const { info } = props

    return (
        <div className="flex space-x-2">
            <Button variant="outline" size="sm">编辑</Button>
        </div>
    )
}