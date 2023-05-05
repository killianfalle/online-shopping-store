import { ReactNode } from "react";

export type ContextProviderProps = {
    children: ReactNode;
}

export type ContextProps = {
    category: string
    setCategory:(c: string) => void
}