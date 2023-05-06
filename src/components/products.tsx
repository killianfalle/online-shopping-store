import { FC, useContext, useEffect, useState } from 'react';
import { Product } from '../types/product';
import { Context } from '../context/context';
import "../assets/product.css"

const Products: FC<ProductsProps> = ({ products, setProductsList }) => {
  const {addToCart, category} = useContext(Context)
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<'default' | 'asc' | 'desc'>('default');
  const productsToShow = searchTerm ? filteredProducts : products;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (changeSort: boolean = true) => {
    const isAscending = ['default', 'asc'].includes(sortOrder);
    const newSortOrder = isAscending ? 'desc' : 'asc';

    if(changeSort)
      setSortOrder(newSortOrder);
  
    const sortedProducts = productsToShow.slice().sort((a, b) =>
      isAscending ? a.unitPrice - b.unitPrice : b.unitPrice - a.unitPrice
    );

    searchTerm ? setFilteredProducts(sortedProducts) : setProductsList(sortedProducts as []);
  };

  useEffect(() => {
    const filtered = products.filter(product =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [searchTerm])

  useEffect(() => setSortOrder('default'), [category])

  return (
    <div className="products-container">
      <input
        type="text"
        placeholder="Search product by name or category"
        className="search-input"
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="sort-container">
        <button onClick={() => handleSort(true)}>
          Sort price <span>{sortOrder === "default" ? "default" : sortOrder === 'asc' ? 'high to low' : 'low to high'}</span>
        </button>
      </div>

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
            <button onClick={() => addToCart(item)}>Add to cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

interface ProductsProps {
  products: Product[] | [];
  setProductsList: (p: []) => void;
}

export default Products;