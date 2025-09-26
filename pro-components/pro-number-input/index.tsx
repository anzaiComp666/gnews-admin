import { Input } from "@/components/ui/input"

interface Props extends React.ComponentProps<"input"> {
    hiddenStepper?: boolean
}

export const ProNumberInput = (props: Props) => {

    const { hiddenStepper, className, ...restProps } = props
    const inputClass = hiddenStepper
        ? `${className ?? ""} [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]`
        : className
    return (
        <Input {...restProps} type="number" step={1} className={inputClass} />
    )
}