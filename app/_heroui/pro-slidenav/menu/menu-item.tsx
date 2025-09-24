import Link from "next/link"
import { HTMLAttributeAnchorTarget } from "react"

export interface MenuItemProps {
    title: string
    pathname: string
    isSelected?: boolean
    target?: HTMLAttributeAnchorTarget
}

export const MenuItem = (props: MenuItemProps) => {

    return (
        <Link href={props.pathname} target={props.target}>
            <div
                className="cursor-pointer h-10
                hover:text-primary
                aria-selected:bg-primary-400
                aria-selected:text-primary-foreground
                "
                aria-selected={props.isSelected}
            >
                <div className="h-full flex items-center px-5 text-sm">{props.title}</div>
            </div>
        </Link>
    )
}