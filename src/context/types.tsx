import { ReactNode } from "react";
import { Modal } from "../types/modal";
import { Product } from "../types/product";

export type ContextProviderProps = {
    children: ReactNode;
}

export type ContextProps = {
    products: Product[];
    category: string
    showModal: Modal,
    cart: Product[],
    setCategory:(c: string) => void,
    addToCart: (p: Product) => void,
    clearCart: () => void,
    checkout: () => void,
    setShowModal: (m: Modal) => void,
    onChangeQuantity: (type: string, item: Product) => void,
    onRemoveItem: (index: number) => void
}