import React, { useState } from "react";
import "./App.css";
import ConferenceEvent from "./ConferenceEvent";
import AboutUs from "./AboutUs";

function App() {
  // State to manage the visibility of the ConferenceEvent component
  const [showVenue, setShowVenue] = useState(false);

  // Function to handle the "Get Started" button click, triggering the display of the venue section
  const handleGetStarted = () => {
    setShowVenue(true); // Show the ConferenceEvent component by updating the state
  };

  return (
    <>
      {/* Header section containing the main title, description, and the "Get Started" button */}
      <header className="first_page">
        <div className="main_event">
          <div className="first_page_name_btn">
            <h1 className="budget_heading">Conference Expense Planner</h1>
            <p className="budget_sentence">
              Plan your next major event with us!
            </p>
            <div className="getstarted_btn">
              <button
                onClick={() => handleGetStarted()} // Trigger the venue display when clicked
                className="get-started-btn"
              >
                Get Started
              </button>
            </div>
          </div>
          {/* Section for displaying the "About Us" information */}
          <div className="aboutus_main">
            <AboutUs />
          </div>
        </div>
      </header>

      {/* Container that holds the ConferenceEvent component, visibility controlled by showVenue state */}
      <div className={`event-list-container ${showVenue ? "visible" : ""}`}>
        <ConferenceEvent />
      </div>
    </>
  );
}

export default App;
