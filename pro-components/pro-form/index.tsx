import { ControllerRenderProps, useForm, UseFormReturn } from "react-hook-form";
import { ProFormFieldInput, ProFormFieldInputProps } from "./fields/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { ProFormCommonProps } from "./fields/common";

export type ProFormFieldProps = ProFormCommonProps & ProFormFieldInputProps

interface Props<T> {
    form?: {
        classname?: string
    };
    schema: any;
    fields: Record<keyof T, ProFormFieldProps>;
    onSubmit?: (data: T, form: UseFormReturn) => Promise<void>;
    children?: React.ReactNode;
}


export const ProForm = <T,>(props: Props<T>) => {

    const { schema, fields, children } = props

    const defaultValues: Record<string, any> = {};
    for (const key of Object.keys(fields)) {
        defaultValues[key] = fields[key as keyof T].defaultValue;
    }


    const form = useForm({
        resolver: schema && zodResolver(schema),
        defaultValues: defaultValues,
    })

    const onSubmit = async (data: Record<string, any>) => {
        if (props.onSubmit) {
            await props.onSubmit(data as T, form)
        }
    }

    return (
        <ProFormContext.Provider value={{ form, fields }}>
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
}

const ProFormContext = React.createContext<ProFormContextValue>({} as ProFormContextValue);


export const ProFormFieldsRender = (props: React.ComponentProps<"div">) => {
    const { form, fields } = React.useContext(ProFormContext)

    return (
        <div {...props}>
            {form.formState.errors.root && (
                <Alert variant="destructive">
                    <AlertTitle>{form.formState.errors.root.message}</AlertTitle>
                </Alert>
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

    const renderField = (field: ControllerRenderProps) => {
        switch (props.type) {
            case 'input':
                return <ProFormFieldInput field={field} />
        }
    }
    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => (
                <FormItem>
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

