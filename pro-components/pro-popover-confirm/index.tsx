import { Button } from "@/components/ui/button"
import { PopoverContent } from "@/components/ui/popover"
import { Popover, PopoverTrigger } from "@radix-ui/react-popover"
import { useState } from "react"

interface Props {
    title: string
    children: React.ReactNode
    onConfirm?: () => void
}

export const ProPopoverConfirm = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>{props.children}</PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col">
                    <span className="text-base font-medium">{props.title}</span>
                    <div className="flex justify-start mt-2 space-x-2">
                        <Button size="sm" onClick={() => {
                            props.onConfirm?.()
                            setIsOpen(false)
                        }}>
                            确认
                        </Button>

                        <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                            取消
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}