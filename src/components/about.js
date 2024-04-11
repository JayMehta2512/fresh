// AboutUs.js

import React from 'react';
import './about.css'; // Import CSS file for styling

const AboutUs = () => {
  return (
    <div className='about'>
    <div className="about-us-container">
        <div className='about-us-text'>
      <h1>About Us</h1>
      <img className="about-us-image" src={require("./image/aboutus.jpg")} alt={"Carlie Anglemire"}/>
      <p>An innovative concept called WaterOnWay aims to offer both individuals and companies a simple and dependable water supply service. The technology allows for the daily, hassle-free delivery of water jugs to the user's location.</p>
      <p>Customers may easily arrange their water delivery thanks to the convenience of online booking, providing a reliable and hassle-free supply of clean and fresh water.</p>
      <p>WaterOnWay offers a user-friendly online booking system that allows customers to schedule their water deliveries with ease. Whether you need water for your home, office, or any other location, our platform simplifies the process.</p>
      <p>At WaterOnWay, we prioritize the quality of the water we deliver. You can trust us to provide you with clean and fresh water, meeting your hydration and consumption needs.</p>
      <p>Whether you require a single water jug or multiple jugs daily, our service can be customized to meet your specific demands. Our flexible options ensure that you get exactly what you need.</p>
      <p>We've designed WaterOnWay to be a service you can rely on. Say goodbye to the hassle of going to a store or dealing with unreliable suppliers. With us, you can expect water delivery at your doorstep, hassle-free.</p>
      <p>Don't let water supply be a concern. Experience the convenience, reliability, and quality of WaterOnWay's water delivery service. Join us today and enjoy a hassle-free and consistent supply of clean, fresh water at your doorstep. WaterOnWay - Water Delivered Your Way.</p>
      </div>
     

    </div>
    </div>
  );
};

export default AboutUs;
