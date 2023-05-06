import { useEffect, useState } from "react"
import { Product } from "../types/product";
import { ContextProviderProps } from "./types";
import productsJson from "../data/items.json";
import { Modal } from "../types/modal";
import { Context } from "./context";

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

    const clearCart = () => {
        setCart([])
        localStorage.setItem("cartItems", JSON.stringify([]));
    };

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

    const onRemoveItem = (index: number) => {
        const newItems = [...cart];
        newItems.splice(index, 1);

        setCart(newItems);
        localStorage.setItem("cartItems", JSON.stringify(newItems));
    }

    const onChangeQuantity = (type: string, item: Product) => {
        const productIndex = cart.findIndex(product => product.id === item.id);
        if(productIndex < 0) return;

        const updatedQuantity = cart.map((p) => {
            if (p.id === item.id)
                return {
                    ...p,
                    quantity: type === "increment" ? p.quantity + 1 : p.quantity - 1
                };

            return p;
        });

        setCart(updatedQuantity);
        localStorage.setItem("cartItems", JSON.stringify(updatedQuantity));
    }

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
              localStorage.setItem("cartItems", JSON.stringify(updatedProducts));
        }else{
            // product with new id, add to array
            setCart((prevProducts) => [product, ...prevProducts]);
            localStorage.setItem("cartItems", JSON.stringify([product, ...cart]));
        }
    }

    const setCartFromStorage = () => {
        const storedCartItems = localStorage.getItem("cartItems");
        if (!storedCartItems) return;
    
        setCart(JSON.parse(storedCartItems));
    }

    useEffect(() => {
        setCartFromStorage();

        // add quantity property to each product from JSON file
        const updatedProducts = productsJson.map((product) => ({
            ...product,
            quantity: 1, // set quantity to 1 by default
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
                setShowModal,
                onChangeQuantity,
                onRemoveItem
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;