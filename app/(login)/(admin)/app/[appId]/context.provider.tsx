"use client"

import { GappId } from "@/lib/dao/video/gapp_video.entity"
import { AppContext } from "./context"

interface Props {
    children: React.ReactNode
    appId: GappId
}

export const AppContextProvider = (props: Props) => {
    return (
        <AppContext.Provider value={{ appId: props.appId }}>
            {props.children}
        </AppContext.Provider>
    )
}