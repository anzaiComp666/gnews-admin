import { PropsWithChildren } from "react"
import { redirect } from "next/navigation"
import { authVerify } from "../../actions/auth/verify"


export default async (props: PropsWithChildren) => {

    try {
        await authVerify()
        return props.children
    } catch (error) {
        redirect('/login')
    }
}