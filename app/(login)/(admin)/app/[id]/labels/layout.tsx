"use client"
import { PropsWithChildren, useEffect } from "react";
import { useAppContext } from "../context";
import { BreadcrumbChunk } from "@/components/breadcrumb-chunk";


export default ({ children }: PropsWithChildren) => {
    const appContext = useAppContext()
    return (

        <>
            <BreadcrumbChunk title="标签管理" pathname={`/app/${appContext.appId}/labels`} />
            {children}
        </>
    )
}