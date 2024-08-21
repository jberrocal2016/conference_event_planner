import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";

const ConferenceEvent = () => {
  // State to toggle the visibility of detailed items
  const [showItems, setShowItems] = useState(false);

  // State to track the number of people (currently unused)
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  // Access the venue items from the Redux store
  const venueItems = useSelector((state) => state.venue);

  // Dispatch function to trigger actions in the Redux store
  const dispatch = useDispatch();

  // Calculate the remaining quantity for the Auditorium Hall
  const remainingAuditoriumQuantity =
    3 -
    venueItems.find((item) => item.name === "Auditorium Hall (Capacity:200)")
      .quantity;

  // Toggle the visibility of items in the detailed view
  const handleToggleItems = () => {
    console.log("handleToggleItems called");
    setShowItems(!showItems);
  };

  // Add an item to the cart, ensuring Auditorium Hall doesn't exceed a quantity of 3
  const handleAddToCart = (index) => {
    if (
      venueItems[index].name === "Auditorium Hall (Capacity:200)" &&
      venueItems[index].quantity >= 3
    ) {
      return; // Prevent adding more than 3 Auditorium Halls
    }
    dispatch(incrementQuantity(index));
  };

  // Remove an item from the cart if its quantity is greater than 0
  const handleRemoveFromCart = (index) => {
    if (venueItems[index].quantity > 0) {
      dispatch(decrementQuantity(index));
    }
  };

  // Placeholder functions for future implementation
  const handleIncrementAvQuantity = (index) => {};
  const handleDecrementAvQuantity = (index) => {};
  const handleMealSelection = (index) => {};

  // Placeholder for a function to retrieve items contributing to the total cost
  const getItemsFromTotalCost = () => {
    const items = [];
    return items; // Return an empty array for now
  };

  // Retrieve items from total cost calculation
  const items = getItemsFromTotalCost();

  // Placeholder component to display a list of items (to be implemented)
  const ItemsDisplay = ({ items }) => {};

  // Calculate the total cost of selected venue items
  const calculateTotalCost = (section) => {
    let totalCost = 0;
    if (section === "venue") {
      venueItems.forEach((item) => {
        totalCost += item.cost * item.quantity; // Sum up costs based on quantity
      });
    }
    return totalCost;
  };

  // Total cost for the venue section
  const venueTotalCost = calculateTotalCost("venue");

  // Handle navigation to different sections of the page (venue, add-ons, meals)
  const navigateToProducts = (idType) => {
    if (idType === "#venue" || idType === "#addons" || idType === "#meals") {
      if (showItems) {
        // Toggle showItems to true only if it's currently false
        setShowItems(!showItems);
      }
    }
  };

  return (
    <>
      {/* Navigation bar with links to different sections and a button to toggle details */}
      <navbar className="navbar_event_conference">
        <div className="company_logo">Conference Expense Planner</div>
        <div className="left_navbar">
          <div className="nav_links">
            <a href="#venue" onClick={() => navigateToProducts("#venue")}>
              Venue
            </a>
            <a href="#addons" onClick={() => navigateToProducts("#addons")}>
              Add-ons
            </a>
            <a href="#meals" onClick={() => navigateToProducts("#meals")}>
              Meals
            </a>
          </div>
          <button
            className="details_button"
            onClick={() => setShowItems(!showItems)}
          >
            Show Details
          </button>
        </div>
      </navbar>

      {/* Main content area */}
      <div className="main_container">
        {!showItems ? (
          <div className="items-information">
            {/* Venue Selection Section */}
            <div id="venue" className="venue_container container_main">
              <div className="text">
                <h1>Venue Room Selection</h1>
              </div>
              <div className="venue_selection">
                {venueItems.map((item, index) => (
                  <div className="venue_main" key={index}>
                    <div className="img">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="text">{item.name}</div>
                    <div>${item.cost}</div>
                    <div className="button_container">
                      {/* Conditional logic for Auditorium Hall */}
                      {venueItems[index].name ===
                      "Auditorium Hall (Capacity:200)" ? (
                        <>
                          <button
                            className={
                              venueItems[index].quantity === 0
                                ? "btn-warning btn-disabled"
                                : "btn-minus btn-warning"
                            }
                            onClick={() => handleRemoveFromCart(index)}
                          >
                            &#8211;
                          </button>
                          <span className="selected_count">
                            {venueItems[index].quantity > 0
                              ? ` ${venueItems[index].quantity}`
                              : "0"}
                          </span>
                          <button
                            className={
                              remainingAuditoriumQuantity === 0
                                ? "btn-success btn-disabled"
                                : "btn-success btn-plus"
                            }
                            onClick={() => handleAddToCart(index)}
                          >
                            &#43;
                          </button>
                        </>
                      ) : (
                        // General logic for other venue items
                        <div className="button_container">
                          <button
                            className={
                              venueItems[index].quantity === 0
                                ? " btn-warning btn-disabled"
                                : "btn-warning btn-plus"
                            }
                            onClick={() => handleRemoveFromCart(index)}
                          >
                            &#8211;
                          </button>
                          <span className="selected_count">
                            {venueItems[index].quantity > 0
                              ? ` ${venueItems[index].quantity}`
                              : "0"}
                          </span>
                          <button
                            className={
                              venueItems[index].quantity === 10
                                ? " btn-success btn-disabled"
                                : "btn-success btn-plus"
                            }
                            onClick={() => handleAddToCart(index)}
                          >
                            &#43;
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {/* Display total cost for venue selection */}
              <div className="total_cost">Total Cost: ${venueTotalCost}</div>
            </div>

            {/* Add-ons Section (to be implemented) */}
            <div id="addons" className="venue_container container_main">
              <div className="text">
                <h1> Add-ons Selection</h1>
              </div>
              <div className="addons_selection"></div>
              <div className="total_cost">Total Cost:</div>
            </div>

            {/* Meals Section (to be implemented) */}
            <div id="meals" className="venue_container container_main">
              <div className="text">
                <h1>Meals Selection</h1>
              </div>
              <div className="input-container venue_selection"></div>
              <div className="meal_selection"></div>
              <div className="total_cost">Total Cost: </div>
            </div>
          </div>
        ) : (
          // Detailed view displaying total costs
          <div className="total_amount_detail">
            <TotalCost
              totalCosts={totalCosts}
              handleClick={handleToggleItems}
              ItemsDisplay={() => <ItemsDisplay items={items} />}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ConferenceEvent;
