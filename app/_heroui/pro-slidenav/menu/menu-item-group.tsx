import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { usePathname } from "next/navigation"
import { MenuItem, MenuItemProps } from "./menu-item"
import { useEffect, useState } from "react";

export interface MenuItemGroupProps {
    title: string
    children: MenuItemProps[]
}


export const MenuItemGroup = (props: MenuItemGroupProps) => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const isAnyChildSelected = props.children.some(child => child.pathname === pathname);
        setIsOpen(isAnyChildSelected);

    }, [pathname])

    return (
        <div>
            {/* 显示 */}
            <div className="group h-10 cursor-pointer flex items-center justify-between pl-5 pr-1" onClick={() => setIsOpen(!isOpen)}>
                <span className="text-sm group-hover:text-primary">{props.title}</span>
                <MdOutlineKeyboardArrowRight className="transition-transform aria-selected:rotate-90" aria-selected={isOpen} />
            </div>

            {/* children */}
            <div
                className="bg-white flex flex-col transition-[max-height] duration-300 overflow-hidden"
                style={{
                    maxHeight: isOpen ? `${props.children.length * 50}px` : "0px", // 36px per item, adjust as needed
                }}
                aria-selected={isOpen}
            >
                {props.children.map((child, childIndex) => (
                    <MenuItem key={childIndex} {...child} isSelected={child.pathname == pathname} />
                ))}
            </div>
        </div>
    )
}


