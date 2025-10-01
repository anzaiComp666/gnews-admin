import { LabelsPage } from "../page.client"

interface Props {
    params: Promise<{
        labelId: string[]
    }>
}

export default async function Page(props: Props) {
    const params = await props.params
    const labelId = params.labelId
    return (
        <LabelsPage parentId={labelId[labelId.length - 1]} />
    )
}