import { ProSidebarItem } from ".";


export const createBreadcrumbs = (items: ProSidebarItem[], pathname: string): { title: string, pathname: string }[] => {

    if (pathname == "/") {
        for (const item of items) {
            if (item.pathname && item.pathname == pathname) {
                return [{ title: item.title, pathname: item.pathname ?? "#" }]
            }
        }
    }

    for (const item of items) {
        if (item.pathname && item.pathname == pathname) {
            return [{ title: item.title, pathname: item.pathname ?? "#" }]
        }
    }


    return [];
}


// /app/1/labels/t20266