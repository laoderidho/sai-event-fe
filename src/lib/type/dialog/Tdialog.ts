import { ReactNode } from "react"

export type TDialog = {
    title: string,
    children?: ReactNode,
    open: boolean,
    setOpen?: (open: boolean) => void
}