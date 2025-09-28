"use client"

import { useTransition } from "react";
import { ProButton } from "@/pro-components/pro-button";
import { ProForm, ProFormFieldsRender } from "@/pro-components/pro-form";
import { HashUtil } from "@/lib/hashutil";
import { UseFormReturn } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { AuthLoginSchema, AuthLoginSchemaType } from "@/actions/auth/login-schema";
import { authLogin } from "@/actions/auth/login";


export const LoginPage = () => {
    const [isPending, startTransition] = useTransition()

    const onSubmit = async (values: AuthLoginSchemaType, form: UseFormReturn) => {
        const password = values.password
        const passwordHash = await HashUtil.sha256(password);

        values.password = passwordHash;
        startTransition(async () => {

            const result = await authLogin(values);
            if (result.error) {
                form.reset();
                form.setError("root", {
                    message: result.error
                });

            }
        })
    }


    return (
        <div className="max-w-sm mx-auto mt-20">
            <ProForm<AuthLoginSchemaType>
                fields={{
                    username: {
                        type: 'input',
                        defaultValue: '',
                        label: '账号'
                    },
                    password: {
                        type: 'input',
                        defaultValue: '',
                        label: '密码'
                    },
                }}
                schema={AuthLoginSchema}
                onSubmit={onSubmit}
                rootErrorRender={(message) => (
                    <Alert variant="destructive">
                        <Terminal />
                        <AlertTitle>登陆失败</AlertTitle>
                        <AlertDescription>{message}</AlertDescription>
                    </Alert>
                )}
            >
                <div className="flex flex-col gap-5">
                    <ProFormFieldsRender className="flex flex-col gap-5" />
                    <ProButton className="w-full h-10" color="primary" type="submit" isLoading={isPending} disabled={isPending}>
                        登录
                    </ProButton>
                </div>
            </ProForm>
        </div>
    )
}