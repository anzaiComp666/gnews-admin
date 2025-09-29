import { IGappVideoLabelEntity } from "@/lib/dao/video/gapp_video_label.entity";
import { CellContext } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";


interface Props {
    info: CellContext<IGappVideoLabelEntity, unknown>
}

export const ChildrenCell = (props: Props) => {
    const { info } = props
    const pathname = usePathname()

    return (
        <Button variant="link" className="cursor-pointer">
            <Link href={`${pathname}/${info.getValue() as number}`}>
                {info.getValue() as number}
            </Link>
        </Button>
    )
}

