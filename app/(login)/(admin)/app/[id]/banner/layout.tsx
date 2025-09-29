"use client"
import { useBreadcrumb } from "@/pro-components/pro-sidebar/breadcrumbs";
import { PropsWithChildren, useEffect } from "react";
import { useAppContext } from "../context";

export default ({ children }: PropsWithChildren) => {
    const appContext = useAppContext()
    const breadcrumbs = useBreadcrumb()

    useEffect(() => {
        breadcrumbs.addBreadcrumb("轮播图管理", `/app/${appContext.appId}/banner`)
    }, [])

    return children
}