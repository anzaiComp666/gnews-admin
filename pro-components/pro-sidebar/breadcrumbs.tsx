import { createContext, useContext, useEffect } from "react";

interface BreadcrumbContextValue {
    addBreadcrumb: (title: string, pathname: string) => void
}

export const BreadcrumbContext = createContext<BreadcrumbContextValue>({} as BreadcrumbContextValue)

export const useBreadcrumb = () => {
    return useContext(BreadcrumbContext)
}