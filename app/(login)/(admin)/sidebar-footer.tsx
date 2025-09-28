import { authLogout } from "@/actions/auth/logout"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { LogOut } from "lucide-react"

export const AppSidebarFooter = () => {

    const onExit = async () => {
        await authLogout()
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