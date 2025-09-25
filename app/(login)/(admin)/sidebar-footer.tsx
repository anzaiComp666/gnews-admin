import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { LogOut } from "lucide-react"
import { AuthActions } from "@/app/actions/auth"

export const AppSidebarFooter = () => {

    const onExit = async () => {
        await AuthActions.logout()
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton color="danger" onClick={onExit}>
                    退出登陆
                    <LogOut className="ml-auto" />
                </SidebarMenuButton>

            </SidebarMenuItem>
        </SidebarMenu>
    )
}