import { randomUUID } from "crypto"

export interface IBreadcrumbItem {
    title: string
    pathname: string
}

export const makeBreadcrumbMeta = (item: IBreadcrumbItem) => {
    const uuid = randomUUID().toString()
    const key = `breadcrumb-${uuid}`
    return {
        [key]: JSON.stringify(item)
    }
}
