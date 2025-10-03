import { toast } from "sonner"

export const ToastUtil = {
    success: (message: string) => {
        toast.success(message)
    },
    error: (message: any) => {
        if (typeof message === 'string') {
            toast.error(message)
        } else if (message instanceof Error) {
            toast.error(message.message)
        } else {
            toast.error(message.toString())
        }
    }
}