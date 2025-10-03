import { appConfigGet } from "@/actions/app/config/get"
import { ConfigPage } from "./page.client"

interface Props {
    params: Promise<{ appId: string }>
}

export default async (props: Props) => {
    const params = await props.params
    const config = await appConfigGet(Number(params.appId))
    return <ConfigPage config={config} />
}