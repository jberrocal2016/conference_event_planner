// store.js

import { configureStore } from "@reduxjs/toolkit";
import venueReducer from "./venueSlice";
import avReducer from "./avSlice";
import mealsReducer from "./mealsSlice";

// Configure the Redux store, defining the available slices of state
export default configureStore({
  reducer: {
    venue: venueReducer, // Add the venue slice to the store under the "venue" key
    av: avReducer, // Add the AV slice to the store under the "av" key
    meals: mealsReducer, // Add the meals slice to the store under the "meals" key
  },
});
