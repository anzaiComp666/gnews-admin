import { authVerify } from "@/app/actions/auth/verify";
import { LoginPage } from "./page.client";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export default async () => {
    try {
        await authVerify()
        redirect("/")
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        return <LoginPage />
    }
}