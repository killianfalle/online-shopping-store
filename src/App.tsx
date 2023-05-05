import React, { useContext, useEffect, useState } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Body from "./components/body";
import Cart from "./components/cart";
import productsJson from "./data/items.json";
import { Context } from "./context/context";
import { Product } from "./types/product";
import "./assets/app.css"

const App: React.FC = () => {
  const products: Product[] = productsJson;
  const {category} = useContext(Context);
  const [categories, setCategories] = useState<[]>([]);

  const arrangeProductsByCategory = () => {
    const categoryProducts: {[key: string]: Product[] } = products.reduce<{[key: string]: Product[] }>(
      (acc, product) => {
        const category = product.category;
        
        if (!acc[category]) {
          acc[category] = [];
        }
        
        acc[category].push(product);
        return acc;
      },
      {}
    );
    categoryProducts.all = products;
    return categoryProducts;
  }

  // Arrange categories from each products
  const getCategories = () => {
    const categoryProducts = arrangeProductsByCategory();

    // Store categories in an array (Alphabetical order)
    const categoriesArray = Object.keys(categoryProducts).sort();
    setCategories(categoriesArray as [])
  }

  useEffect(() => {
    getCategories();
  }, [])

  return (
    <div className="wrapper">
      <Header />
      
      <div className="app-container">
        <Sidebar categories={categories} />
        <Body>
          <h1>{category}</h1>
        </Body>
        <Cart />
      </div>
    </div>
  );
};

export default App;