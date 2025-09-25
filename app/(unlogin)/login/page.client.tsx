"use client"
import { AuthActions } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HashUtil } from "@/lib/hashutil";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Loader2Icon, Terminal } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type FormValues = {
    username: string;
    password: string;
}


export const LoginPage = () => {
    const [isPending, startTransition] = useTransition()


    const form = useForm<FormValues>({
        defaultValues: {
            username: '',
            password: '',
        },
    })

    const preSubmit = async (values: FormValues) => {
        const password = values.password
        const passwordHash = await HashUtil.sha256(password);

        values.password = passwordHash;
        startTransition(async () => {
            const result = await AuthActions.login(values);
            if (result.error) {
                form.reset();
                form.setError("root", { message: result.error });

            }
        })
    }



    return (
        <Form {...form}>


            <form className="max-w-sm mx-auto mt-20 gap-5 flex flex-col" onSubmit={form.handleSubmit(preSubmit)}>
                {form.formState.errors.root && (
                    <Alert variant="destructive">
                        <AlertTitle>登陆失败</AlertTitle>
                        <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
                    </Alert>
                )}

                <FormField
                    control={form.control}
                    name="username"
                    rules={{ required: "请输入账号" }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>账号</FormLabel>
                            <FormControl>
                                <Input placeholder="请输入账号" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                <FormField
                    control={form.control}
                    name="password"
                    rules={{ required: "请输入密码" }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>密码</FormLabel>
                            <FormControl>
                                <Input placeholder="请输入密码" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                <Button className="w-full h-10" color="primary" type="submit" disabled={isPending}>
                    {isPending && <Loader2Icon className="animate-spin" />}
                    登录
                </Button>
            </form>
        </Form>
    )
}

// "use client"
// import { AuthActions } from "@/app/actions/auth";
// import { HashUtil } from "@/lib/hashutil";
// import { useState, useTransition } from "react";

// export const LoginPage = () => {
//     const [error, setError] = useState<string | null>(null)
//     const [isPending, startTransition] = useTransition()



//     const preSubmit = async (formData: FormData) => {
//         const password = formData.get('password') as string;
//         const passwordHash = await HashUtil.sha256(password);

//         formData.set('password', passwordHash);
//         startTransition(async () => {
//             const result = await AuthActions.login(null, formData);
//             if (result.error) {
//                 setError(result.error);
//             }
//         })
//     }


//     return (


//         // <Form className="max-w-sm mx-auto mt-20 gap-5" action={preSubmit}>
//         //     {error && <Alert color="danger" description={error} />}

//         //     <Input name="username" placeholder="帐号" required isDisabled={isPending} />
//         //     <Input name="password" type="password" placeholder="密码" required isDisabled={isPending} />
//         //     <Button className="w-full h-10" color="primary" type="submit" isDisabled={isPending} isLoading={isPending}> 登录</Button>
//         // </Form>
//     )
// }