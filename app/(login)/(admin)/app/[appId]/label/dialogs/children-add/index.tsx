import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import React from "react"
import { LabelChildrenAddDialogContent } from "./content"
import { useProTable } from "@/pro-components/pro-table/context"

interface Props {
    parentId: string,
    children?: React.ReactNode
}

export const LabelChildrenAddDialog = (props: Props) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const table = useProTable()
    const onConfirm = () => {
        setIsOpen(false)
        table.refresh()
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {props.children}
            </DialogTrigger>
            {isOpen && (
                <DialogContent className="max-w-[calc(100%-2rem)] h-[calc(100%-2rem)] sm:max-w-[calc(100%-2rem)]">
                    <DialogHeader>
                        <DialogTitle>
                            添加子标签
                        </DialogTitle>
                    </DialogHeader>
                    <LabelChildrenAddDialogContent
                        parentId={props.parentId}
                        onConfirm={onConfirm}
                    />

                </DialogContent>
            )}
        </Dialog>
    )
}