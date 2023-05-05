import { FC } from 'react';
import { Product } from '../types/product';
import "../assets/product.css"

const Products: FC<ProductsProps> = ({ products }) => {

  const handleAddToCart = (item: object) => {
    console.log(item)
  }

  return (
    <div className="products-container">
      {products.map((item, index) => (
        <div
          key={index}
          className="product-item-container">
          <div className="product-image">
            <img src={item.imageUrl} alt={item.productName} />
          </div>

          <div className="product-labels">
            <p className="product-title">{item.productName}</p>
            <p className="product-category">{item.category}</p>
            <p className="product-description">{item.description}</p>
          </div>
          
          <div className="product-price-container">
            <p className="product-price">₱{item.unitPrice.toLocaleString()}</p>
            <button onClick={() => handleAddToCart(item)}>Add to cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

interface ProductsProps {
  products: Product[] | [];
}

export default Products;