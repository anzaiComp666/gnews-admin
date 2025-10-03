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
                    title: "应用配置",
                    pathname: "/app/1/config",
                },
                {
                    title: "轮播图管理",
                    pathname: "/app/1/banner",
                },
                {
                    title: "首页模块",
                    pathname: "/app/1/home-modules",
                },
                {
                    title: "通知管理",
                    pathname: "/app/1/notification",
                },
                {
                    title: "标签管理",
                    pathname: "/app/1/label",
                },
                {
                    title: "视频管理",
                    pathname: "/app/1/video",
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