"use client"

import { PropsWithChildren, useState } from "react"
import { Header } from "./header";
import { ProSlidenav } from "@/app/_heroui/pro-slidenav";

export default (props: PropsWithChildren) => {

    const slidenavs = [
        {
            pathname: "/",
            title: "首页",
        },
        "首页管理",
        // {
        //     title: "闪月",
        //     children: [
        //         { title: "爬虫数据", pathname: "/platform/shanyue/data" },
        //         { title: "爬虫任务", pathname: "/platform/shanyue/task" },
        //         { title: "平台账号", pathname: "/platform/shanyue/account" },
        //     ]
        // },
        // {
        //     title: "文撩",
        //     children: [
        //         { title: "爬虫数据", pathname: "/platform/wenliao/data" },
        //         { title: "爬虫任务", pathname: "/platform/wenliao/task" },
        //         { title: "平台账号", pathname: "/platform/wenliao/account" },
        //     ]
        // },
        // {
        //     title: "Blued",
        //     children: [
        //         { title: "爬虫数据", pathname: "/platform/blued/data" },
        //         { title: "爬虫任务", pathname: "/platform/blued/task" },
        //         { title: "平台账号", pathname: "/platform/blued/account" },
        //         { title: "站内信", pathname: "/chat/blued", target: "_blank" },
        //     ]
        // },
        // "短链",
        // { title: "短链管理", pathname: "/shortlink" },
    ]

    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const onMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <div className="h-full flex flex-col">
            <Header isMenuOpen={isMenuOpen} onMenuToggle={onMenuToggle} />
            <div className="flex-1 flex overflow-hidden">
                <ProSlidenav isOpen={isMenuOpen} items={slidenavs} />
                <div className="flex-1 p-2 overflow-hidden">
                    {props.children}
                </div>
            </div>
        </div>
    )
}