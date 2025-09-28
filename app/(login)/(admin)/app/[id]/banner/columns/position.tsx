import { BannerPosition, BannerStatus, IBannerEntity } from "@/lib/dao/biz/banner"
import { CellContext } from "@tanstack/react-table"

interface Props {
    info: CellContext<IBannerEntity, unknown>
}

export const PositionRender = (props: Props) => {
    const { info } = props
    const original = info.row.original
    switch (original.position) {
        case BannerPosition.home:
            return '首页'

    }
}