"use client"
import { GappId } from "@/lib/dao/gapp/gapp_video.entity"
import { AppContext } from "./context"

interface Props {
    appId: GappId
    children: React.ReactNode
}
export const AppContextProvider = (props: Props) => {
    return (
        <AppContext.Provider value={{ appId: props.appId }}>
            {props.children}
        </AppContext.Provider>
    )
}