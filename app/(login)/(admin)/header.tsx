import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Menu, MenuItem, Navbar, NavbarBrand, NavbarContent } from "@heroui/react"
import { RiMenuUnfold3Line, RiMenuUnfold4Line } from "react-icons/ri"

interface Props {
    isMenuOpen: boolean
    onMenuToggle: () => void
}


export const Header = (props: Props) => {

    const onLogout = () => {
        localStorage.removeItem('token');
        document.cookie = 'token=; Max-Age=0; path=/';
        window.location.href = '/login';
    }

    return (
        <Navbar className="h-14" maxWidth="full" isBordered classNames={{
            wrapper: 'pl-2',
        }}>
            <NavbarBrand>
                <Button isIconOnly variant="light" onPress={props.onMenuToggle}>
                    <RiMenuUnfold4Line className="aria-hidden:hidden" aria-hidden={!props.isMenuOpen} />
                    <RiMenuUnfold3Line className="aria-hidden:hidden" aria-hidden={props.isMenuOpen} />
                </Button>
                <p className="font-bold text-inherit">Gnews</p>
            </NavbarBrand>
            <NavbarContent>

            </NavbarContent>
            <NavbarContent justify="end">
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" isBordered />
                    </DropdownTrigger>
                    <DropdownMenu>
                        <DropdownItem key="logout" color="danger" onClick={onLogout}>
                            退出登录
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    )
}