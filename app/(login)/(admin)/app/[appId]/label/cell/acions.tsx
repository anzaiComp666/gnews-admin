import { IGappVideoLabelEntity } from "@/lib/dao/video/gapp_video_label.entity";
import { CellContext } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { LabelUpsertDialog } from "../dialogs/upsert";
import { ProPopoverConfirm } from "@/pro-components/pro-popover-confirm";
import { useState } from "react";
import { ProButton } from "@/pro-components/pro-button";
import { labelChildrenRemove } from "@/actions/video/label/children-remove";
import { ToastUtil } from "@/lib/toastutil";
import { useAppContext } from "../../context";
import { useProTable } from "@/pro-components/pro-table/context";

interface Props {
    parentId?: string
    info: CellContext<IGappVideoLabelEntity, unknown>
}

export const ActionsCell = (props: Props) => {
    const { info } = props
    const [isRemoving, setIsRemoving] = useState(false)
    const table = useProTable()
    const app = useAppContext()

    const onChildrenRemove = async () => {
        if (!props.parentId) {
            ToastUtil.error("父标签ID不能为空")
            return
        }

        setIsRemoving(true)
        try {
            await labelChildrenRemove(app.appId, {
                parentId: props.parentId,
                childrenLabelIds: [info.row.original.labelId]
            })
            table.refresh()
        } catch (error) {
            ToastUtil.error(error)
        } finally {
            setIsRemoving(false)
        }
    }

    return (
        <div className="flex space-x-2">
            <LabelUpsertDialog entity={info.row.original}>
                <Button variant="outline" size="sm">编辑</Button>
            </LabelUpsertDialog>

            {props.parentId && (
                <ProPopoverConfirm title="确认移除子标签吗？" onConfirm={onChildrenRemove}>
                    <ProButton
                        variant="outline"
                        size="sm"
                        isLoading={isRemoving}
                        disabled={isRemoving}>
                        移除子标签
                    </ProButton>
                </ProPopoverConfirm>
            )}
        </div>
    )
}