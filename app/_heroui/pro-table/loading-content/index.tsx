import { Spinner } from "@heroui/react"

export const LoadingContent = () => {
    return (
        <div className="flex items-center justify-center w-full h-full bg-white/50 z-10">
            <Spinner />
        </div>
    )
}