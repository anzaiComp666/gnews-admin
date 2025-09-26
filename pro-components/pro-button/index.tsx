import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { Button, buttonVariants } from "@/components/ui/button"
import { Loader2Icon } from "lucide-react"

interface Props extends React.ComponentProps<"button"> {
    isLoading?: boolean
}

export const ProButton = (props: Props & VariantProps<typeof buttonVariants> & { asChild?: boolean }) => {
    const { isLoading, children, ...restProps } = props
    return (
        <Button {...restProps} >
            {isLoading && <Loader2Icon className="animate-spin" />}
            {children}
        </Button>
    )
}