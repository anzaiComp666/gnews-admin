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
                    title: "app",
                    pathname: "app",
                    type: "group",
                    children: [
                        {
                            title: "应用",
                            pathname: "1",
                            type: "group",
                            children: [
                                {
                                    title: "Banner管理",
                                    pathname: "banner",
                                    type: "page"
                                },
                                {
                                    title: "标签管理",
                                    pathname: "labels",
                                    type: "page",
                                    children: [
                                        {
                                            title: "标签详情",
                                            pathname: "[id]",
                                            type: "page",
                                            hidden: true,
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }



                // {
                //     title: "轮播图管理",
                //     pathname: "/app/1/banner",
                // },
                // {
                //     title: "标签管理",
                //     pathname: "/app/1/labels",

                // },
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
