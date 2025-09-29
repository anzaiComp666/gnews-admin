"use client"

import { useBreadcrumb } from "@/pro-components/pro-sidebar/breadcrumbs"
import { useEffect } from "react"

interface Props {
    title: string
    pathname: string
}
export const BreadcrumbChunk = (props: Props) => {
    const breadcrumbs = useBreadcrumb()
    useEffect(() => {
        console.log("add breadcrumb chunk", props.title, props.pathname)
        breadcrumbs.addBreadcrumb(props.title, props.pathname)
    }, [])
    return null
}