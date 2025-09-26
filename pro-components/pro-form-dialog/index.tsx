import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { ProButton } from "../pro-button"
import { ProForm, ProFormFieldProps, ProFormFieldsRender } from "../pro-form"




interface Props<T> {
    trigger: React.ReactNode
    header?: React.ReactNode
    onSubmit: (data: Record<string, any>) => Promise<void>
    fields: Record<keyof T, ProFormFieldProps>
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

        </Dialog>
    )
}

/*
{form => (
                <>
                    <ProLabel title="名称" name="name">
                        <Input {...form.register("name")} defaultValue={props.entity?.name} />
                    </ProLabel>

                    <ProLabel title="图片地址" name="imageURL">
                        <Input {...form.register("imageUrl")} defaultValue={props.entity?.imageURL} />
                    </ProLabel>

                    <ProLabel title="状态" name="status">
                        <Controller control={form.control} name="status" render={({ field }) => (
                            <ProSelect
                                {...field}
                                onValueChange={field.onChange}
                                placeholder="选择状态"
                                defaultValue={props.entity?.status}
                                options={[
                                    { label: "启用", value: "enabled" },
                                    { label: "禁用", value: "disabled" }
                                ]}
                            />
                        )} />
                    </ProLabel>

                    <ProLabel title="跳转类型" name="jumpType">
                        <Controller control={form.control} name="jumpType" render={({ field }) => (
                            <ProSelect
                                {...field}
                                onValueChange={field.onChange}
                                placeholder="选择跳转类型"
                                defaultValue={props.entity?.jumpType}
                                options={JumpTypeOptions}
                            />
                        )} />
                    </ProLabel>

                    <ProLabel title="跳转数据" name="jumpData">
                        <Input {...form.register("jumpData")} defaultValue={props.entity?.jumpData} />
                    </ProLabel>
                </>
            )}
                */