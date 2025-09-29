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
                    children: [
                        {
                            title: "应用",
                            pathname: "[id]",
                            children: [
                                {
                                    title: "Banner管理",
                                    pathname: "banner"
                                },
                                {
                                    title: "标签管理",
                                    pathname: "labels",
                                    children: [
                                        {
                                            title: "标签详情",
                                            pathname: "[id]"
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
