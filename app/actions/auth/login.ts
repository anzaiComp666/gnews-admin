"use server"

import { dataSources } from "@/lib/dao";
import { AdminUserEntity } from "@/lib/dao/admin/admin-user";
import { UserError } from "@/lib/error/user";
import { logger } from "@/lib/logger";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from 'jsonwebtoken';
import { globalConfigs } from "@/lib/config";
import { HashUtil } from "@/lib/hashutil";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { AuthJwtPayload } from "./jwt-payload";
import z from "zod";

const LoginSchema = z.object({
    username: z.string().min(1, "用户名不能为空"),
    password: z.string().min(1, "密码不能为空"),
})

export async function login(params: z.infer<typeof LoginSchema>) {
    try {

        const { username, password } = LoginSchema.parse(params)

        const user = await dataSources.admin.withDataSource(async (manager) => {
            const user = await manager.findOne(AdminUserEntity, {
                where: {
                    username: username
                }
            })

            if (!user || await HashUtil.sha256(user.password) !== password) {
                throw new UserError("用户名或密码错误")
            }

            return user
        })

        const payload = {
            userId: user.id,
        } as AuthJwtPayload

        const token = jwt.sign(
            payload,
            globalConfigs.jwt.secret,
            { expiresIn: "3d" }
        )

        const ck = await cookies()
        ck.set("token", token, { path: "/", maxAge: 3 * 24 * 60 * 60 })

        redirect("/")
        return { error: null }
    } catch (error) {
        if (isRedirectError(error)) throw error;

        logger.error(error)
        if (error instanceof UserError) {

            return { error: error.message }
        } else {

            return { error: "系统错误，请稍后再试" }
        }

    }
}