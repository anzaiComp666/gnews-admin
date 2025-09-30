import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import React from "react"
import { AddSubLabelDialogContent } from "./content"

interface Props {
    children?: React.ReactNode
}

export const AddSubLabelDialog = (props: Props) => {
    const [isOpen, setIsOpen] = React.useState(false)

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
                    <AddSubLabelDialogContent />

                </DialogContent>
            )}
        </Dialog>
    )
}