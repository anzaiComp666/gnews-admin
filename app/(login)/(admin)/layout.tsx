"use client"


import { PropsWithChildren } from "react"
import { ProSidebar, ProSidebarGroup } from "@/pro-components/pro-sidebar"
import { AppSidebarFooter } from "./sidebar-footer"

export default (props: PropsWithChildren) => {


    const sidebarGroups: ProSidebarGroup[] = [
        {
            title: "GNews",
            items: [
                {
                    title: "首页",
                    pathname: "/app/1",
                },
                {
                    title: "轮播图管理",
                    pathname: "/app/1/banner",
                },
                {
                    title: "标签管理",
                    pathname: "/app/1/labels",
                },
            ]
        }
    ]

    return (
        <ProSidebar
            groups={sidebarGroups}
            footer={<AppSidebarFooter />}
        >
            {props.children}
        </ProSidebar>
    )
}