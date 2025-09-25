import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

export interface ProSidebarGroup {
    title: string
    items: ProSidebarItem[]
}

export interface ProSidebarItem {
    title: string
    pathname?: string
    children?: ProSidebarItem[]
}



export const ProSidebar = (props: {
    header?: React.ReactNode
    groups: ProSidebarGroup[],
    footer?: React.ReactNode,
    children?: React.ReactNode,
}) => {

    const { groups } = props
    const pathname = usePathname()

    const breadcrumbs: { title: string, pathname: string }[] = []
    groups.forEach(group => {
        group.items.forEach(item => {
            if (item.children) {
                item.children.forEach(sub => {
                    if (sub.pathname === pathname) {
                        breadcrumbs.push({ title: item.title, pathname: item.pathname || "#" })
                        breadcrumbs.push({ title: sub.title, pathname: sub.pathname || "#" })
                    }
                })
            } else {
                if (item.pathname === pathname) {
                    breadcrumbs.push({ title: item.title, pathname: item.pathname || "#" })
                }
            }
        })
    })

    const breadcrumbNavigation = useMemo(() => {

        const widgets: React.ReactNode[] = []
        for (let i = 0; i < breadcrumbs.length; i++) {
            const element = breadcrumbs[i];
            widgets.push(
                <BreadcrumbItem key={element.pathname}>
                    {i === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage>{element.title}</BreadcrumbPage>
                    ) : (
                        <BreadcrumbLink href={element.pathname}>{element.title}</BreadcrumbLink>
                    )}
                </BreadcrumbItem>
            )
            if (i !== breadcrumbs.length - 1) {
                widgets.push(<BreadcrumbSeparator key={element.pathname + "-sep"} />)
            }

        }

        return (
            <Breadcrumb>
                <BreadcrumbList>
                    {widgets}
                </BreadcrumbList>
            </Breadcrumb>
        )
    }, [breadcrumbs])


    return (
        <SidebarProvider>
            <Sidebar>
                {props.header && <SidebarHeader>{props.header}</SidebarHeader>}
                <SidebarContent>
                    {groups.map(group => (<ProSidebarGroupRender key={group.title} group={group} />))}
                </SidebarContent>
                {props.footer && <SidebarFooter>{props.footer}</SidebarFooter>}
            </Sidebar>

            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    {breadcrumbNavigation}
                </header>
                {props.children}
            </SidebarInset>
        </SidebarProvider>
    )

}


const ProSidebarGroupRender = (props: {
    group: ProSidebarGroup
}) => {

    const { group } = props

    return (
        <SidebarGroup>
            {group.title.length > 0 && <SidebarGroupLabel>{props.group.title}</SidebarGroupLabel>}
            <SidebarGroupContent>
                <ProSidebarMenuRender items={group.items} />
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

const ProSidebarMenuRender = (props: {
    items: ProSidebarItem[]
}) => {
    const { items } = props
    return (
        <SidebarMenu>
            {items.map(item => (<ProSidebarMenuItemRender key={item.title} item={item} />))}
        </SidebarMenu>
    )
}

const ProSidebarMenuItemRender = (props: {
    item: ProSidebarItem
}) => {

    const pathname = usePathname()
    const { item } = props
    if (item.children) {
        return (
            <Collapsible key={item.title} asChild className="group/collapsible">
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                            {item.title}
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {item.children.map(sub => {
                                return (
                                    <SidebarMenuSubItem key={sub.pathname}>
                                        <SidebarMenuButton asChild isActive={pathname === sub.pathname}>
                                            <Link href={sub.pathname!}>
                                                {sub.title}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuSubItem>
                                )
                            })}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible >
        )

    } else {
        return (
            <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.pathname}>
                    <Link href={item.pathname!}>
                        {item.title}
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        )
    }
}
