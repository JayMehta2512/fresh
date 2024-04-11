import React, { useState } from 'react';
 
import "./Product.css"; // Import Firebase Auth
import { Link } from 'react-router-dom';
import BottlePRO from './BottlePRO';

const products = [
  {
    name: 'Regular Water',
    price: 10.99,
    refillPrice: 7.69, 
    description: 'Standard water for daily use.',
    jugImageUrl: require('./image/Jar.webp'),
    refillImageUrl: require('./image/Refill Water.jpg'),
    overlayText: 'Standard Jug',
    stampText: "",
  },
  {
    name: 'Mineral Water',
    price: 12.99,
    refillPrice: 9.09, 
    description: 'Water enriched with essential minerals.',
    jugImageUrl: require('./image/Mineraljug.jfif'),
    refillImageUrl: require('./image/Refill Water.jpg'),
    overlayText: ' Mineral Water',
    stampText: "Mineral",
  },
  {
    name: 'Alkaline Water',
    price: 14.99,
    refillPrice: 10.49, 
    description: 'Water with a higher pH level for better hydration.',
    jugImageUrl: require('./image/Alkalinejug.jpg'),
    refillImageUrl: require('./image/AklineRefill.jfif'),
    overlayText: 'Alkaline Water ',
    stampText: "Alkaline",
  },
  {
    name: 'RO Water',
    price: 11.99,
    refillPrice: 8.39, 
    description: 'Purified water through reverse osmosis filtration.',
    jugImageUrl: require('./image/ROjug.jpg'),
    refillImageUrl: require('./image/ROrefill.jfif'),
    overlayText: 'RO Water Jug',
    stampText: "Purified",
  },
  
];

function Product({ name, price, refillPrice, description, jugImageUrl, refillImageUrl, overlayText, stampText }) {
  const [productType, setProductType] = useState('jug'); // Default to 'jug'
  const [quantity, setQuantity] = useState(1);

  
  return (
    <div className="product">
      <div className="image-container">
        <img src={productType === 'refill' ? refillImageUrl : jugImageUrl} alt={name} />
        <div className="stamp">{stampText}</div>
        {productType === 'jug' }
      </div>
      <h3>{name}</h3>
      <p>Rs{productType === 'refill' ? refillPrice : price}</p>
      <p>{description}</p>
      <div className="dropdown">
        <label htmlFor="productType">Select Product Type:</label>
        <select id="productType" value={productType} onChange={(e) => setProductType(e.target.value)}>
          <option value="jug">Water Jug</option>
          <option value="refill">Water Jug Refill</option>
        </select>
        <label htmlFor="quantity">Select Quantity:</label>
        <input type="number" id="quantity" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </div>
      <Link to="/login">
      <button>Add to Cart</button>
    </Link>
    </div>
  );
}

function ProductsList1() {
  return (
    <>
    <h1 style={{ textAlign: 'center' }}> THE PRODUCTS WE OFFER</h1>
     <h2 className='heading' style={{ background: 'lightblue' }}>Water Jugs</h2>
    <div className="products-list">
      {products.map((product, index) => (
        <Product key={index} {...product} />
      ))}
    </div>
    <BottlePRO/>
    </>
  );
}

export default ProductsList1;