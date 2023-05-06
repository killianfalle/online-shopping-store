import { FC, useContext, useEffect, useState } from 'react';
import { Product } from '../types/product';
import { Context } from '../context/context';
import "../assets/product.css"

const Products: FC<ProductsProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const {addToCart} = useContext(Context)
  const productsToShow = searchTerm ? filteredProducts : products;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddToCart = (item: Product) => {
    addToCart(item)
  }

  useEffect(() => {
    const filtered = products.filter(product =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [searchTerm])

  return (
    <div className="products-container">
      <input
        type="text"
        placeholder="Search product by name or category"
        className="search-input"
        value={searchTerm}
        onChange={handleSearch}
      />

      {productsToShow.map((item, index) => (
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