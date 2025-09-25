"use client"


import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { PropsWithChildren } from "react"
import { ProSidebar, ProSidebarGroup } from "@/pro-components/pro-sidebar"
import { AppSidebarHeader } from "./sidebar-header"
import { AppSidebarFooter } from "./sidebar-footer"

export default (props: PropsWithChildren) => {


    const sidebarGroups: ProSidebarGroup[] = [
        {
            title: "",
            items: [
                {
                    title: "首页",
                    pathname: "/",
                },
                {
                    title: "主页管理",
                    children: [
                        { title: "首页轮播", pathname: "/home/banners" },
                        { title: "首页标签", pathname: "/home/labels" },
                    ]
                }
            ]
        }
    ]

    return (
        <ProSidebar
            header={<AppSidebarHeader />}
            groups={sidebarGroups}
            footer={<AppSidebarFooter />}
        >
            {props.children}
        </ProSidebar>
    )
}