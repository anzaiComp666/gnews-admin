import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { ProButton } from "../pro-button"
import { ProForm, ProFormFieldProps, ProFormFieldsRender } from "../pro-form"


interface Props<FormFields> {
    trigger: React.ReactNode
    header?: React.ReactNode
    onSubmit: (data: Record<string, any>) => Promise<void>
    fields: Record<keyof FormFields, ProFormFieldProps>
    schema?: any
}

export const ProFormDialog = <T,>(props: Props<T>) => {

    const [isOpen, setIsOpen] = useState(false)
    const [isSubmiting, setIsSubmitting] = useState(false)

    const renderHeader = () => {
        if (typeof props.header === 'string') {
            return (
                <DialogTitle>
                    {props.header}
                </DialogTitle>
            )
        }

        return props.header
    }

    const onSubmit = async (data: any) => {
        try {
            setIsSubmitting(true)
            await props.onSubmit(data)
            setIsOpen(false)
        } catch (error) {

        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <Dialog open={isOpen} onOpenChange={() => {
            if (isSubmiting) {
                return
            }
            setIsOpen(!isOpen)
        }}>
            <DialogTrigger asChild>
                {props.trigger}
            </DialogTrigger>
            {isOpen && (
                <DialogContent showCloseButton={!isSubmiting}>
                    <ProForm<T>
                        schema={props.schema}
                        fields={props.fields}
                        onSubmit={onSubmit}
                        form={{
                            classname: "flex flex-col gap-4"
                        }}
                    >

                        <DialogHeader>
                            {renderHeader()}
                        </DialogHeader>

                        <ProFormFieldsRender className="flex flex-col gap-4" />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" disabled={isSubmiting}>取消</Button>
                            </DialogClose>

                            <ProButton
                                type="submit"
                                isLoading={isSubmiting}
                                disabled={isSubmiting}
                            >
                                提交
                            </ProButton>
                        </DialogFooter>

                    </ProForm>
                </DialogContent>
            )}
        </Dialog>
    )
}