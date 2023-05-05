import { createContext, useState } from "react"
import { ContextProps, ContextProviderProps } from "./types";

export const Context = createContext<ContextProps>({
    category: "all",
    setCategory: () => {},
})

const ContextProvider: React.FC<ContextProviderProps> = ({children}) => {
    const [category, setCategory] = useState<string>("all");

    return (
        <Context.Provider
            value= {{
                category,
                setCategory
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;