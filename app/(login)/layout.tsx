import { PropsWithChildren } from "react"

export default async (props: PropsWithChildren) => {
    return props.children
    // const cookieStore = await cookies()
    // try {
    //     await API.request('userInfo', undefined, {
    //         token: cookieStore.get('token')?.value,
    //     })
    //     return props.children
    // } catch (error) {
    //     console.error("用户未登录或登录已过期", error)
    //     redirect('/login')
    // }
}