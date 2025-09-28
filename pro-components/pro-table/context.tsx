import { createContext, useContext } from "react";

interface ProTableContextValue {
    refresh: () => Promise<void>,
}

export const ProTableContext = createContext<ProTableContextValue>({} as ProTableContextValue);

export const useProTable = () => {
    return useContext(ProTableContext);
}