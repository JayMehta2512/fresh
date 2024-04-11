import React from 'react'
import '../styles/Features.css';
export default function Features() {
  return (
    <div style={{ backgroundColor: 'lightgoldenrodyellow', height:"100%" }}>
        <h2 className='h21'>FEATURES PROVIDED BY WaterOnWay </h2>
        <div className="main-content-container1">
     <section className="orders-section1">
        <h2>To overcome the time flexibility</h2>
        <p>
        Allow users to choose from a range of delivery time windows based on their availability.</p>
       <p> Offer options such as morning, afternoon, or evening deliveries to accommodate diverse schedules.</p>
        </section>
        <section className="orders-section1">
        <h2>We could get routine water supply By use of subscription</h2>
        <p>
        Offer subscription plans with the flexibility to adjust delivery frequency.</p>
       <p> Allow users to easily modify subscription details, such as the number of water jugs or delivery days, through the online platform.</p>
         </section>
      <section className="orders-section1">
        <h2>Give stability to the delivering product</h2>
        <p>
        Allow users to set preferences for delivery instructions, such as preferred drop-off locations or specific delivery personnel.</p>
       <p>Provide options for contactless delivery or in-person handoffs based on user preferences</p>
        
        
      </section><section className="orders-section1">
        <h2>We provide good services and get review for our upcoming customers</h2>
        <p>
        Establish a feedback system to gather user opinions on delivery timing and overall service.</p>
       <p> Use customer feedback to make data-driven improvements and enhancements to the delivery process.</p>
        
        
      </section>
      </div>
    </div>
  )
}
