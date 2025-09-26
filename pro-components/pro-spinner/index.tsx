import { RefreshCw } from "lucide-react"
import React from "react"

interface Props extends React.ComponentProps<"div"> {
    isLoading?: boolean
}

export const ProSpinner = (props: Props) => {
    const { isLoading, className, ...restProps } = props

    return (
        <div className={`relative ${className}`} {...restProps} >
            {props.children}
            <div
                className="absolute left-0 top-0 w-full h-full flex items-center justify-center z-50 aria-hidden:hidden pointer-events-none aria-hidden:pointer-events-auto bg-white/50"
                aria-hidden={!props.isLoading}
            >
                <RefreshCw className="animate-spin" size={30} />
            </div>
        </div>
    )
}