import React, { useContext, useEffect, useState } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Products from "./components/products";
import Cart from "./components/cart";
import Modal from "./components/modal";
import { Product } from "./types/product";
import { Context } from "./context/context";
import "./assets/app.css"

const App: React.FC = () => {
  const {category, products, cart} = useContext(Context);
  const [categories, setCategories] = useState<[]>([]);
  const [productsList, setProductsList] = useState<[]>([]);

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
  // then store categories in an array (Alphabetical order)
  const getCategories = () => {
    const categoryProducts = arrangeProductsByCategory();

    const categoriesArray = Object.keys(categoryProducts).sort();
    setCategories(categoriesArray as []);
  }

  const getProducts = () => {
    const categoryProducts = arrangeProductsByCategory();
    setProductsList(categoryProducts[category] as []);
  }

  useEffect(() => getProducts(), [category, products])
  useEffect(() => getCategories(), [products])

  return (
    <div className="wrapper">
      <Modal />
      <Header />
      
      <div className="body-container">
        <Sidebar categories={categories} />
        <Products products={productsList}/>
        {cart.length > 0 && <Cart />}
      </div>
    </div>
  );
};

export default App;