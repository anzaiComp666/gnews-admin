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
                    pathname: "/",
                },
                {
                    title: "主页管理",
                    children: [
                        {
                            title: "首页轮播",
                            pathname: "/home/banners",
                            children: [
                                {
                                    title: "添加轮播",
                                    hidden: true,
                                    pathname: "/home/banners/add"
                                },
                            ]
                        },
                        {
                            title: "首页标签",
                            pathname: "/home/labels"
                        },
                    ]
                }
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