import { GappId } from "@/lib/dao/video/gapp_video.entity"
import { createContext, useContext } from "react"


export interface AppContextValue {
    appId: GappId
}

export const AppContext = createContext<AppContextValue>({} as AppContextValue)

export const useAppContext = () => {
    return useContext(AppContext)
}