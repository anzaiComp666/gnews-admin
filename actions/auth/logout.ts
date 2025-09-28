"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const authLogout = async () => {
    (await cookies()).delete("token")
    redirect("/login")
}