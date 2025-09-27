"use server"

import { cookies } from "next/headers";
import jsonwebtoken from 'jsonwebtoken';
import { globalConfigs } from "@/lib/config";
import { AuthJwtPayload } from "./jwt-payload";

export async function authVerify() {
    const token = (await cookies()).get('token')?.value;
    if (!token) {
        throw new Error("未登录");
    }

    const payload = jsonwebtoken.verify(token, globalConfigs.jwt.secret) as AuthJwtPayload;
    if (payload.userId <= 0) {
        throw new Error("无效的用户ID");
    }
    return payload;
}