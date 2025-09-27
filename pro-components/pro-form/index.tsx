import { ControllerRenderProps, useForm, UseFormReturn } from "react-hook-form";
import { ProFormFieldInput, ProFormFieldInputProps } from "./fields/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React from "react";
import { ProFormCommonProps } from "./fields/common";
import { ProFormFieldSelect, ProFormFieldSelectProps } from "./fields/select";
import { ProFormFieldNumberInput, ProFormFieldNumberInputProps } from "./fields/number-input";

export type ProFormFieldProps = ProFormCommonProps & (ProFormFieldInputProps | ProFormFieldNumberInputProps | ProFormFieldSelectProps)

export interface ProFormProps<FormFields> {
    // 原始表单配置
    form?: {
        classname?: string
    };

    // 表单数据验证规则
    schema: any;

    // 表单字段配置
    fields: Record<keyof FormFields, ProFormFieldProps>;

    // 表单提交回调
    onSubmit?: (data: FormFields, form: UseFormReturn) => Promise<void>;

    // 全局错误渲染函数
    rootErrorRender?: (message: string) => React.ReactNode;

    // 
    children?: React.ReactNode;

}

export const ProForm = <FormFields,>(props: ProFormProps<FormFields>) => {
    const { schema, fields, children } = props

    const defaultValues: Record<string, any> = {};
    for (const key of Object.keys(fields)) {
        defaultValues[key] = fields[key as keyof FormFields].defaultValue;
    }


    const form = useForm({
        resolver: schema && zodResolver(schema),
        defaultValues: defaultValues,
    })

    const onSubmit = async (data: Record<string, any>) => {
        if (props.onSubmit) {
            await props.onSubmit(data as FormFields, form)
        }
    }

    return (
        <ProFormContext.Provider value={{ form, fields, rootErrorRender: props.rootErrorRender }}>
            <Form {...form}>
                <form className={props.form?.classname} onSubmit={form.handleSubmit(onSubmit)}>
                    {children}
                </form>
            </Form>
        </ProFormContext.Provider>
    )
}


interface ProFormContextValue {
    form: UseFormReturn
    fields: Record<string, ProFormFieldProps>
    // 全局错误渲染函数
    rootErrorRender?: (message: string) => React.ReactNode;
}

const ProFormContext = React.createContext<ProFormContextValue>({} as ProFormContextValue);


export const ProFormFieldsRender = (props: React.ComponentProps<"div">) => {
    const { form, fields, rootErrorRender } = React.useContext(ProFormContext)

    return (
        <div {...props}>
            {form.formState.errors.root && rootErrorRender && (
                rootErrorRender(form.formState.errors.root.message ?? "")
            )}

            {Object.keys(fields).map((key) => (
                <ProFormFieldRender
                    key={key}
                    name={key}
                    form={form}
                    {...fields[key]}
                />
            ))}
        </div>
    )
}


const ProFormFieldRender = (props: ProFormFieldProps & { name: string, form: UseFormReturn }) => {

    const { name, form, ...restProps } = props
    const renderField = (field: ControllerRenderProps) => {
        switch (restProps.type) {
            case 'input':
                return <ProFormFieldInput {...restProps} field={field} />

            case 'numberInput':
                return <ProFormFieldNumberInput {...restProps} field={field} />

            case 'select':
                return <ProFormFieldSelect {...restProps} field={field} />
        }
    }


    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => (
                <FormItem className="aria-hidden:hidden" aria-hidden={props.hidden}>
                    <FormLabel>{props.label}</FormLabel>
                    <FormControl>
                        {renderField(field)}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

