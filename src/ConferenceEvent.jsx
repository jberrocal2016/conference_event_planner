import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";
import { decrementAvQuantity, incrementAvQuantity } from "./avSlice";
import { toggleMealSelection } from "./mealsSlice";

const ConferenceEvent = () => {
  // Manages the visibility state of the detailed items section
  const [showItems, setShowItems] = useState(false);

  // Tracks the number of people (currently unused, potentially for future features)
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  // Retrieves the list of venue items from the Redux store
  const venueItems = useSelector((state) => state.venue);

  // Retrieves the list of AV items from the Redux store
  const avItems = useSelector((state) => state.av);

  // Retrieves the list of meals items from the redux store
  const mealsItems = useSelector((state) => state.meals);

  // Hook to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Calculate the remaining available quantity for the Auditorium Hall (max 3)
  const remainingAuditoriumQuantity =
    3 -
    venueItems.find((item) => item.name === "Auditorium Hall (Capacity:200)")
      .quantity;

  // Toggles the visibility of the items section (used for showing detailed costs)
  const handleToggleItems = () => {
    console.log("handleToggleItems called");
    setShowItems(!showItems);
  };

  // Handles the addition of items to the cart, ensuring Auditorium Hall stays within its limit
  const handleAddToCart = (index) => {
    // Prevent adding more than 3 Auditorium Hall items
    if (
      venueItems[index].name === "Auditorium Hall (Capacity:200)" &&
      venueItems[index].quantity >= 3
    ) {
      return;
    }
    dispatch(incrementQuantity(index));
  };

  // Handles the removal of items from the cart, ensuring quantity doesn't drop below zero
  const handleRemoveFromCart = (index) => {
    if (venueItems[index].quantity > 0) {
      dispatch(decrementQuantity(index));
    }
  };

  // Placeholder for functionality to increment AV item quantity
  const handleIncrementAvQuantity = (index) => {
    dispatch(incrementAvQuantity(index));
  };

  // Placeholder for functionality to decrement AV item quantity
  const handleDecrementAvQuantity = (index) => {
    dispatch(decrementAvQuantity(index));
  };

  // Placeholder for meal selection functionality
  const handleMealSelection = (index) => {
    const item = mealsItems[index];
    if (item.selected && item.type === "mealForPeople") {
      // Ensure numberOfPeople is set before toggling selection
      const newNumberOfPeople = item.selected ? numberOfPeople : 0;
      dispatch(toggleMealSelection(index, newNumberOfPeople));
    } else {
      dispatch(toggleMealSelection(index));
    }
  };

  // Retrieves a list of items that contribute to the total cost
  const getItemsFromTotalCost = () => {
    const items = [];
    venueItems.forEach((item) => {
      if (item.quantity > 0) {
        items.push({ ...item, type: "venue" });
      }
    });
    avItems.forEach((item) => {
      if (
        item.quantity > 0 &&
        !items.some((i) => i.name === item.name && i.type === "av")
      ) {
        items.push({ ...item, type: "av" });
      }
    });
    mealsItems.forEach((item) => {
      if (item.selected) {
        const itemForDisplay = { ...item, type: "meals" };
        if (item.numberOfPeople) {
          itemForDisplay.numberOfPeople = numberOfPeople;
        }
        items.push(itemForDisplay);
      }
    });
    return items;
  };

  // Fetch the items list to be used in the total cost calculation
  const items = getItemsFromTotalCost();

  // Component to display a list of items
  const ItemsDisplay = ({ items }) => {
    console.log(items);
    return (
      <>
        <div className="display_box1">
          {items.length === 0 && <p>No items selected</p>}
          <table className="table_item_data">
            <thead>
              <tr>
                <th>Name</th>
                <th>Unit Cost</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>${item.cost}</td>
                  <td>
                    {item.type === "meals" || item.numberOfPeople
                      ? ` For ${numberOfPeople} people`
                      : item.quantity}
                  </td>
                  <td>
                    {item.type === "meals" || item.numberOfPeople
                      ? `${item.cost * numberOfPeople}`
                      : `${item.cost * item.quantity}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  // Calculates the total cost of selected items within a specific section (e.g., venue)
  const calculateTotalCost = (section) => {
    let totalCost = 0;
    if (section === "venue") {
      venueItems.forEach((item) => {
        totalCost += item.cost * item.quantity;
      });
    } else if (section === "av") {
      avItems.forEach((item) => {
        totalCost += item.cost * item.quantity;
      });
    } else if (section === "meals") {
      mealsItems.forEach((item) => {
        if (item.selected) {
          totalCost += item.cost * numberOfPeople;
        }
      });
    }
    return totalCost;
  };

  // Total cost calculated for the av section
  const avTotalCost = calculateTotalCost("av");

  // Total cost calculated for the meals section
  const mealsTotalCost = calculateTotalCost("meals");

  // Total cost calculated for the venue section
  const venueTotalCost = calculateTotalCost("venue");

  const totalCosts = {
    venue: venueTotalCost,
    av: avTotalCost,
    meals: mealsTotalCost,
  };

  // Handles navigation between different sections (Venue, Add-ons, Meals) and toggles detailed views
  const navigateToProducts = (idType) => {
    if (idType === "#venue" || idType === "#addons" || idType === "#meals") {
      if (showItems) {
        // Toggle the detailed items view if it's currently visible
        setShowItems(!showItems);
      }
    }
  };

  return (
    <>
      {/* Navigation bar with links to different sections and a toggle button for details */}
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

      {/* Main container for the page content */}
      <div className="main_container">
        {!showItems ? (
          <div className="items-information">
            {/* Venue selection section */}
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
                      {/* Specific logic for Auditorium Hall due to quantity restrictions */}
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
              {/* Display the total cost for the selected venue items */}
              <div className="total_cost">Total Cost: ${venueTotalCost}</div>
            </div>

            {/* AV Selection Section */}
            <div className="addons_selection">
              {avItems.map((item, index) => (
                <div className="av_data venue_main" key={index}>
                  <div className="img">
                    <img src={item.img} alt={item.name} />
                  </div>
                  <div className="text"> {item.name} </div>
                  <div> ${item.cost} </div>
                  <div className="addons_btn">
                    <button
                      className="btn-warning"
                      onClick={() => handleDecrementAvQuantity(index)}
                    >
                      {" "}
                      &ndash;{" "}
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className=" btn-success"
                      onClick={() => handleIncrementAvQuantity(index)}
                    >
                      {" "}
                      &#43;{" "}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add-ons selection section */}
            <div id="addons" className="venue_container container_main">
              <div className="text">
                <h1> Add-ons Selection</h1>
              </div>
              <div className="addons_selection"></div>
              <div className="total_cost">Total Cost: {avTotalCost}</div>
            </div>

            {/* Meals selection section */}
            <div id="meals" className="venue_container container_main">
              <div className="text">
                <h1>Meals Selection</h1>
              </div>
              <div className="input-container venue_selection">
                <label htmlFor="numberOfPeople">
                  <h3>Number of People:</h3>
                </label>
                <input
                  type="number"
                  className="input_box5"
                  id="numberOfPeople"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                  min="1"
                />
              </div>
              <div className="meal_selection">
                {mealsItems.map((item, index) => (
                  <div
                    className="meal_item"
                    key={index}
                    style={{ padding: 15 }}
                  >
                    <div className="inner">
                      <input
                        type="checkbox"
                        id={`meal_${index}`}
                        checked={item.selected}
                        onChange={() => handleMealSelection(index)}
                      />
                      <label htmlFor={`meal_${index}`}> {item.name} </label>
                    </div>
                    <div className="meal_cost">${item.cost}</div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total Cost: {mealsTotalCost}</div>
            </div>
          </div>
        ) : (
          // Display detailed cost information when showItems is true
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
