import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Product.css"; // Import Firebase Auth

const products = [
  {
    name: 'Regular Water Bottles',
    price: 250,
    description: 'Standard water for daily use.',
    imageUrl: require('./image/RS.jfif'),
    stampText: "",
  },
  {
    name: 'Mineral Water Bottles',
    price: 280,
    description: 'Water enriched with essential minerals.',
    imageUrl: require('./image/alkalineS.jpg'),
    stampText: "Mineral",
  },
  {
    name: 'Alkaline Water Bottles',
    price: 310,
    description: 'Water with a higher pH level for better hydration.',
    imageUrl: require('./image/akalineS.jpg'),
    stampText: "Alkaline",
  },
  {
    name: 'RO Water Bottles',
    price: 270,
    description: 'Purified water through reverse osmosis filtration.',
    imageUrl: require('./image/ROS.webp'),
    stampText: "Purified",
  },
];

function Product({ name, price, description, imageUrl, stampText }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
        <div className="stamp">{stampText}</div>
      </div>
      <h2>Set Of 12 Bottles</h2>
      <h3>{name}</h3>
      <p>Rs{price}</p>
      <p>{description}</p>
      <div className="dropdown">
        <label htmlFor="quantity">Select Quantity:</label>
        <input type="number" id="quantity" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </div>
      <Link to="/login">
        <button>Add to Cart</button>
      </Link>
    </div>
  );
}

function ProductsList() {
  return (
    <>
    <h2 className='heading' style={{ background: 'lightblue' }}>Water Bottles Set</h2>
    
    <div className="products-list">
      {products.map((product, index) => (
        <Product key={index} {...product} />
      ))}
    </div>
    </>
  );
}

export default ProductsList;
