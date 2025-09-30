import { IGappVideoLabelEntity } from "@/lib/dao/video/gapp_video_label.entity";
import { CellContext } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { LabelUpsertDialog } from "../dialogs/upsert";

interface Props {
    info: CellContext<IGappVideoLabelEntity, unknown>
}

export const ActionsCell = (props: Props) => {
    const { info } = props

    return (
        <div className="flex space-x-2">
            <LabelUpsertDialog entity={info.row.original}>
                <Button variant="outline" size="sm">编辑</Button>
            </LabelUpsertDialog>
        </div>
    )
}