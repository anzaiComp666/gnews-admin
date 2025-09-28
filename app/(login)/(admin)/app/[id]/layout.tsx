import { AppContextProvider } from "./context.provider"

interface Props {
    params: Promise<{ id: string }>
    children: React.ReactNode
}

export default async (props: Props) => {
    const params = await props.params

    return (
        <AppContextProvider appId={Number(params.id)}>
            {props.children}
        </AppContextProvider>
    )
}