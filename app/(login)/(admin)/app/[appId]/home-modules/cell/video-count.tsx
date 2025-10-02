import { CellContext } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { IHomeFeedModuleEntityWithCount } from "@/actions/app/home-feed-module/list";
import Link from "next/dist/client/link";


interface Props {
    info: CellContext<IHomeFeedModuleEntityWithCount, unknown>
}

export const VideoCountCell = (props: Props) => {
    const { info } = props
    const original = info.row.original
    const pathname = usePathname()

    return (
        <Button variant="link" className="cursor-pointer">
            <Link href={`${pathname}/videos/${original.id}`}>
                {info.getValue() as number}
            </Link>
        </Button>
    )
}

