import { AuthActions } from "@/app/actions/auth";
import { LoginPage } from "./page.client";
import { redirect } from "next/navigation";

export default async () => {
    if (await AuthActions.isLogin()) {
        return redirect("/");
    }
    return <LoginPage />
}