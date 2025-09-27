import { BannerStatus, IBannerEntity } from "@/lib/dao/biz/banner"
import { CellContext } from "@tanstack/react-table"

interface Props {
    info: CellContext<IBannerEntity, unknown>
}

export const StatusRender = (props: Props) => {
    const { info } = props
    const original = info.row.original
    switch (original.status) {
        case BannerStatus.active:
            return '激活'

        case BannerStatus.inactive:
            return '未激活'
    }
}