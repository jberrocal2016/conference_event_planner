import { createSlice } from "@reduxjs/toolkit";

// Define the slice for managing Audio/Visual (AV) equipment-related state
export const avSlice = createSlice({
  name: "av", // Name of the slice, which will be used as the key in the Redux store
  initialState: [
    // Initial state array for AV equipment
    {
      img: "https://pixabay.com/images/download/business-20031_640.jpg",
      name: "Projectors",
      cost: 200,
      quantity: 0,
    },
    {
      img: "https://pixabay.com/images/download/speakers-4109274_640.jpg",
      name: "Speaker",
      cost: 35,
      quantity: 0,
    },
    {
      img: "https://pixabay.com/images/download/public-speaking-3926344_640.jpg",
      name: "Microphones",
      cost: 45,
      quantity: 0,
    },
    {
      img: "https://pixabay.com/images/download/whiteboard-2903269_640.png",
      name: "Whiteboards",
      cost: 80,
      quantity: 0,
    },

    {
      img: "https://pixabay.com/images/download/signpost-235079_640.jpg",
      name: "Signage",
      cost: 80,
      quantity: 0,
    },
  ],

  // Reducers to manage state changes for the AV items
  reducers: {
    // Increments the quantity of the specified AV item by 1
    incrementAvQuantity: (state, action) => {
      const item = state[action.payload]; // Get the item at the provided index
      if (item) {
        // Ensure the item exists
        item.quantity++; // Increment the quantity of the item
      }
    },

    // Decrements the quantity of the specified AV item by 1, if greater than 0
    decrementAvQuantity: (state, action) => {
      const item = state[action.payload]; // Get the item at the provided index
      if (item && item.quantity > 0) {
        // Ensure the item exists and quantity is > 0
        item.quantity--; // Decrement the quantity of the item
      }
    },
  },
});

// Export the actions generated by createSlice for use in dispatching changes to AV item quantities
export const { incrementAvQuantity, decrementAvQuantity } = avSlice.actions;

// Export the reducer function to be integrated into the Redux store
export default avSlice.reducer;
