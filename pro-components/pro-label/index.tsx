interface Props {
    name: string
    title?: string
    direction?: "horizontal" | "vertical"
    children?: React.ReactNode
}

export const ProLabel = (props: Props) => {
    return (
        <div className={`flex gap-2 ${props.direction === "horizontal" ? "flex-row" : "flex-col"}`}>
            {props.title && <span className="whitespace-nowrap text-sm font-medium">{props.title}</span>}
            {props.children}
        </div>
    )
}