import { HomeFeedModuleVideoPage } from "./page.client"


interface Props {
    params: Promise<{
        moduleId: string
    }>
}

export default async (props: Props) => {
    const params = await props.params
    const moduleId = params.moduleId

    return <HomeFeedModuleVideoPage moduleId={Number(moduleId)} />
}