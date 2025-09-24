import { Button } from "@heroui/react";
import { ProTableFilterForm } from "./filter-form";
import { useContext } from "react";
import { ProTableContext } from "../context";

export interface ProTableTopContentProps {
    // 标题
    title?: string;

    // 工具栏渲染函数
    toolBarRender?: () => React.ReactNode[];
}

export const ProTableTopContent = (props: ProTableTopContentProps) => {

    const context = useContext(ProTableContext)!;
    const actions = props.toolBarRender ? props.toolBarRender() : [];

    return (
        <div className="flex flex-col gap-5 px-1">
            <ProTableFilterForm />

            <div className="flex items-center justify-between">
                <span className="font-medium">{props.title}</span>
                <div className="flex items-center gap-2">
                    {actions.map((action, index) => (
                        <div key={index}>
                            {action}
                        </div>
                    ))}

                    <Button
                        color="primary"
                        onPress={context.refresh}
                        isLoading={context.isRequesting}
                        size="sm"
                    >
                        刷新
                    </Button>
                </div>
            </div>
        </div>
    )
}