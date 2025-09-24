import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react"
import { useState } from "react"

interface Props {
    children?: React.ReactNode
    title?: string
    description?: string
    onConfirm?: () => void
}

export const PopoverConfirm = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const onConfirm = () => {
        setIsOpen(false);
        props.onConfirm?.();
    }
    return (
        <Popover showArrow isOpen={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger>
                {props.children}
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col gap-2 p-2">
                    <div className="text-sm font-bold aria-hidden:hidden" aria-hidden={props.title == undefined || props.title.length <= 0}>
                        {props.title}
                    </div>

                    <div className="text-sm aria-hidden:hidden" aria-hidden={props.description == undefined || props.description.length <= 0}>
                        {props.description}
                    </div>

                    <div className="flex items-center justify-end gap-2 mt-2">
                        <Button size="sm" color="primary" className="px-1.5 py-1.5 w-auto h-auto" isIconOnly onPress={() => setIsOpen(false)}>取消</Button>
                        <Button size="sm" color="danger" className="px-1.5 py-1.5 w-auto h-auto" isIconOnly onPress={onConfirm}>确定</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}