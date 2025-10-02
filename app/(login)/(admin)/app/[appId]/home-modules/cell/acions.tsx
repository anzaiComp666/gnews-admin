"use client"

import { Button } from "@/components/ui/button"
import { IHomeFeedModuleEntity } from "@/lib/dao/app/home-feed-module"
import { CellContext } from "@tanstack/react-table"
import { HomeFeedModuleUpsertDialog } from "../upsert-dialog"

interface Props {
    parentId?: string
    info: CellContext<IHomeFeedModuleEntity, unknown>
}

export const ActionsCell = (props: Props) => {
    const { info } = props

    return (
        <div className="flex space-x-2">
            <HomeFeedModuleUpsertDialog entity={info.row.original}>
                <Button variant="outline" size="sm">编辑</Button>
            </HomeFeedModuleUpsertDialog>

        </div>
    )
}