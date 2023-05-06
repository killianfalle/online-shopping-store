import { createContext } from "react";
import { ContextProps } from "./types";

export const Context = createContext<ContextProps>({
    category: "all",
    products: [],
    cart: [],
    showModal: {
        value: false,
        title: "",
        description: "",
        data: []
    },
    setCategory: () => {},
    addToCart: () => {},
    clearCart: () => {},
    checkout: () => {},
    setShowModal: () => {},
    onChangeQuantity: () => {},
    onRemoveItem: () => {}
})
