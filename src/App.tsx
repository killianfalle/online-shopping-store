import React from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Body from "./components/body";
import Cart from "./components/cart";
import "./assets/app.css"

const App: React.FC = () => {
  const links = [
    { label: "All Items", type: "all" },
    { label: "Category 1", type: "category-1" },
    { label: "Category 2", type: "category-2" },
    { label: "Category 3", type: "category-3" },
    { label: "Category 4", type: "category-4" },
    { label: "Category 5", type: "category-5" },
  ]

  return (
    <div className="wrapper">
      <Header />
      <div className="app-container">
        <Sidebar links={links} />
        <Body>
          <h1>Welcome to my app</h1>
          <p>This is the main content of my app.</p>
        </Body>
        <Cart />
      </div>
    </div>
  );
};

export default App;