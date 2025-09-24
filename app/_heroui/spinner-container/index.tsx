import { Spinner } from "@heroui/react"

interface Props extends React.PropsWithChildren {
    isLoading?: boolean
}

export const SpinnerContainer = (props: Props) => {
    return (
        <div className="w-full h-full relative">
            {props.children}
            <div
                className="absolute left-0 top-0 w-full h-full flex items-center justify-center z-50 aria-hidden:hidden"
                aria-hidden={!props.isLoading}
            >
                <div className="bg-black/20 px-5 py-4 rounded-lg">
                    <Spinner variant="gradient" />
                </div>
            </div>
        </div>
    )
}