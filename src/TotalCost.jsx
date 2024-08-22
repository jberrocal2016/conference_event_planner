import React, { useState, useEffect } from "react";
import "./TotalCost.css";

// TotalCost component receives `totalCosts` and `ItemsDisplay` as props
const TotalCost = ({ totalCosts, ItemsDisplay }) => {
  // Calculate the total amount by summing up the costs of the venue, AV, and meals
  const total_amount = totalCosts.venue + totalCosts.av + totalCosts.meals;

  return (
    <div className="pricing-app">
      <div className="display_box">
        {/* Header section */}
        <div className="header">
          <p className="preheading">
            <h3>Total cost for the event</h3>
          </p>
        </div>

        {/* Display the total cost */}
        <div>
          <h2 id="pre_fee_cost_display" className="price">
            ${total_amount}
          </h2>

          {/* Render the ItemsDisplay component which shows the breakdown of items */}
          <div className="render_items">
            <ItemsDisplay />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default TotalCost;