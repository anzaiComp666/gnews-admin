import { LabelsPage } from "../page.client"

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function Page(props: Props) {
    const params = await props.params
    return (
        <LabelsPage labelId={params.id} />
    )
}