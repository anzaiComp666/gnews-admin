import { Menu } from "./menu"
import { MenuItemProps } from "./menu/menu-item"
import { MenuItemGroupProps } from "./menu/menu-item-group"

interface Props {
    isOpen: boolean
    items: (MenuItemProps | MenuItemGroupProps | string)[]
}

export const ProSlidenav = (props: Props) => {
    return (
        <div className="h-full w-48 bg-default-50 border-r border-default-200 overflow-auto aria-hidden:hidden" aria-hidden={!props.isOpen}>
            <div className="flex flex-col">
                <Menu items={props.items} />
            </div>
        </div>
    )
}
