import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import React, { useEffect, useState } from "react"
import { IBreadcrumbItem } from "./util"


export const Breadcrumbs = () => {
    const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumbItem[]>([])


    const readBreadcrumbs = () => {
        let items: IBreadcrumbItem[] = []
        const nodes = document.querySelectorAll("meta")
        for (const item of nodes) {
            const name = item.getAttribute("name")
            if (name && name.startsWith("breadcrumb-")) {
                const content = item.getAttribute("content")
                if (content) {
                    const parsed = JSON.parse(content) as IBreadcrumbItem[]
                    items = items.concat(parsed)
                }
            }
        }

        setBreadcrumbs(items)
    }

    useEffect(() => {
        const observer = new MutationObserver(() => {
            readBreadcrumbs()
        })
        observer.observe(document.head, { childList: true, subtree: true })
        return () => observer.disconnect()
    }, [])


    const children: React.ReactNode[] = []
    for (let i = 0; i < breadcrumbs.length; i++) {
        const breadcrumb = breadcrumbs[i]
        if (i === breadcrumbs.length - 1) {
            children.push(
                <BreadcrumbItem key={breadcrumb.pathname}>
                    <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                </BreadcrumbItem>
            )
        } else {
            children.push(
                <BreadcrumbItem key={breadcrumb.pathname}>
                    <BreadcrumbLink
                        href={breadcrumb.pathname}>
                        {breadcrumb.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )
            children.push(
                <BreadcrumbSeparator key={`${breadcrumb.pathname}-separator`} />
            )
        }
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {children}
            </BreadcrumbList>
        </Breadcrumb>
    )
}