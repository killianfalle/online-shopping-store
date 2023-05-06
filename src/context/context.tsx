import { createContext, useEffect, useState } from "react"
import { Product } from "../types/product";
import { ContextProps, ContextProviderProps } from "./types";
import productsJson from "../data/items.json";
import { Modal } from "../types/modal";

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
})

const ContextProvider: React.FC<ContextProviderProps> = ({children}) => {
    const [category, setCategory] = useState<string>("all");
    const [cart, setCart] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [showModal, setShowModal] = useState<Modal>({
        value: false,
        title: "",
        description: "",
        data: []
    });

    const clearCart = () => setCart([]);

    const checkout = () => {
        setShowModal({
            ...showModal,
            value: true,
            title: "Thank you for purchasing!",
            description: "This is the overview of the products you purchased:",
            data: cart as []
        })

        clearCart();
    };

    const addToCart = (product: Product)  => {
        const existingProductIndex = cart.findIndex((p) => p.id === product.id);

        if (existingProductIndex !== -1) {
            // product with same id exists, update quantity
            const updatedProducts = cart.map((p) => {
                if (p.id === product.id)
                  return { ...p, quantity: p.quantity + 1 };

                return p;
              });

              setCart(updatedProducts);
        }else{
            // product with new id, add to array
            setCart((prevProducts) => [product, ...prevProducts]);
        }
    }

    useEffect(() => {
        // add quantity property to each product from JSON file
        const updatedProducts = productsJson.map((product) => ({
            ...product,
            quantity: 1, // set quantity to 0 by default
        }));

        setProducts(updatedProducts);
    }, []);

    return (
        <Context.Provider
            value={{
                products,
                cart,
                category,
                showModal,
                setCategory,
                addToCart,
                clearCart,
                checkout,
                setShowModal
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;