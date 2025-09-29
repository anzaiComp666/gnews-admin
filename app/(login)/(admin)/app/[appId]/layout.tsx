import { AppContextProvider } from "./context.provider"

interface Props {
    params: Promise<{ appId: string }>
    children: React.ReactNode
}

export default async (props: Props) => {
    const params = await props.params

    return (
        <AppContextProvider appId={Number(params.appId)}>
            {props.children}
        </AppContextProvider>
    )
}