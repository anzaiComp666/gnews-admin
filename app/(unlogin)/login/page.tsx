"use client"

import { login } from "@/app/actions/login";
import { Button, Form, Input } from "@heroui/react";
import { FormEvent, useActionState } from "react"

export default () => {


    const [_, submit, isPending] = useActionState(login, null)



    return (
        <Form className="max-w-sm mx-auto mt-20 gap-5" action={submit}>
            <Input name="username" placeholder="帐号" required isDisabled={isPending} />
            <Input name="password" type="password" placeholder="密码" required isDisabled={isPending} />
            <Button className="w-full h-10" color="primary" type="submit" isDisabled={isPending} isLoading={isPending}> 登录</Button>
        </Form>
    )
}