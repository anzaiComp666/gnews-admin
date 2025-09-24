import { usePathname } from "next/navigation"
import { MenuItem, MenuItemProps } from "./menu-item"
import { MenuItemGroup, MenuItemGroupProps } from "./menu-item-group"



interface Props {
    items: (MenuItemProps | MenuItemGroupProps | string)[]
}

export const Menu = (props: Props) => {
    const { items } = props
    const pathname = usePathname()
    return (
        <div className="flex flex-col gap-1">
            {items.map((item, index) => {

                if (typeof item === "string") {
                    return <div key={item} className="text-xs font-medium pl-2.5 pt-2 select-none">{item}</div>
                }

                if ("children" in item) {
                    return <MenuItemGroup key={index} {...item} />
                }

                return <MenuItem key={index} {...item} isSelected={item.pathname == pathname} />
            })}
        </div>
    )
}