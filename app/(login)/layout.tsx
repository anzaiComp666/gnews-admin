import { PropsWithChildren } from "react"
import { AuthActions } from "../actions/auth"
import { redirect } from "next/navigation"

export default async (props: PropsWithChildren) => {

    const isLogin = await AuthActions.isLogin()
    if (!isLogin) {
        return redirect('/login')
    }

    return props.children
}