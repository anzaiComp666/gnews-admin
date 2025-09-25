"use server"
import { globalConfigs } from '@/lib/config';
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers"
import { AuthJwtPayload } from './jwt-payload';

export async function isLogin() {
    const token = (await cookies()).get('token')?.value;
    if (!token) {
        return false
    }

    const payload = jwt.verify(token, globalConfigs.jwt.secret) as AuthJwtPayload;
    if (payload.userId <= 0) {
        return false
    }

    return true;
}

// 高阶函数封装
export async function withAuth<T extends (...args: any[]) => any>(handler: T) {
    return async function (this: ThisParameterType<T>, ...args: Parameters<T>): Promise<ReturnType<T>> {
        const login = await isLogin();
        if (!login) {
            throw new Error("未登录");
        }
        return handler.apply(this, args);
    };
}