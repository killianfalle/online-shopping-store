import { ReactNode } from "react";
import { Product } from "../types/product";

export type ContextProviderProps = {
    children: ReactNode;
}

export type ContextProps = {
    products: Product[];
    category: string
    setCategory:(c: string) => void,
    cart: Product[],
    addToCart: (p: Product) => void
}