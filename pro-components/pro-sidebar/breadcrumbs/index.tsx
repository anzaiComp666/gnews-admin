import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import { IBreadcrumbItem } from "./util"


export const Breadcrumbs = () => {
    const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumbItem[]>([])
    const pathname = usePathname()
    useEffect(() => {
        const items: IBreadcrumbItem[] = []
        const nodes = document.querySelectorAll("meta")
        for (const item of nodes) {
            const name = item.getAttribute("name")
            if (name && name.startsWith("breadcrumb-")) {
                const content = item.getAttribute("content")
                if (content) {
                    items.push(JSON.parse(content))
                }
            }
        }

        setBreadcrumbs(items)
    }, [pathname])


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