"use server"

import { redirect } from "next/navigation";

export async function login(prev: any, formData: FormData) {
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    redirect("/")
}