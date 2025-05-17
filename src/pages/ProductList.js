import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Assuming CartContext exists
import '../styles/advanced.css';

// Mock product data (replace with API or real data)
const products = [
  { id: 1, name: 'Samsung Galaxy S23', price: 799, brand: 'Samsung', type: 'Phone', image: 'https://xmobile.lk/wp-content/uploads/2023/09/1-5.jpg', description: 'Latest Samsung flagship.' },
  { id: 2, name: 'iPhone 14 Pro', price: 999, brand: 'Apple', type: 'Phone', image: 'https://indigenousplus.com.au/cdn/shop/files/iphone14promaxwhite.jpg?v=1724456510', description: 'Apple’s premium smartphone.' },
  { id: 3, name: 'iPad Air', price: 599, brand: 'Apple', type: 'Tablet', image: 'https://www.digicape.co.za/image/cache/catalog/_products/2024/ipad/13%20Air/iPad_Air_13_M2_WiFi_Blue_0-1000x1000.jpg', description: 'Lightweight tablet for work.' },
  { id: 4, name: 'Samsung Galaxy Tab S8', price: 699, brand: 'Samsung', type: 'Tablet', image: 'https://xmobile.lk/wp-content/uploads/2023/09/1-7.jpg', description: 'High-performance tablet.' },
  { id: 5, name: 'Google Pixel 8', price: 699, brand: 'Google', type: 'Phone', image: 'https://xmobile.lk/wp-content/uploads/2023/10/1-4.jpg', description: 'Google’s AI-powered phone.' },
];

function ProductList() {
  const { addToCart } = useContext(CartContext); // For adding products to cart
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [categoryType, setCategoryType] = useState('All'); // Brandvise or Typevise

  // Unique brands and types for category tabs
  const brands = ['All', ...new Set(products.map((p) => p.brand))];
  const types = ['All', ...new Set(products.map((p) => p.type))];

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = category === 'All' || product.brand === category;
    const matchesType = categoryType === 'All' || product.type === categoryType;
    return matchesSearch && matchesBrand && matchesType;
  });

  return (
    <div className="product-list container">
      <h2>Products</h2>
      {/* Search Bar */}
      <div className="product-list-search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {/* Category Tabs */}
      <div className="product-category-tabs">
        <div className="category-section">
          <h3>Brandvise</h3>
          <div className="category-buttons">
            {brands.map((brand) => (
              <button
                key={brand}
                className={`product-category-button ${category === brand ? 'active' : ''}`}
                onClick={() => {
                  setCategory(brand);
                  setCategoryType('All'); // Reset Typevise when Brandvise changes
                }}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
        <div className="category-section">
          <h3>Typevise</h3>
          <div className="category-buttons">
            {types.map((type) => (
              <button
                key={type}
                className={`product-category-button ${categoryType === type ? 'active' : ''}`}
                onClick={() => {
                  setCategoryType(type);
                  setCategory('All'); // Reset Brandvise when Typevise changes
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Product Grid */}
      <div className="product-list-grid">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <div className="price">${product.price}</div>
              <div className="description">{product.description}</div>
              <div className="product-card-actions">
                <Link to={`/products/${product.id}`}>View Details</Link>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductList;