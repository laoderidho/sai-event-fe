import { ReactNode } from "react"

export type TDialog = {
    labelButton: ReactNode,
    title: string,
    children?: ReactNode,
    open: boolean,
    setOpen?: (open: boolean) => void
}