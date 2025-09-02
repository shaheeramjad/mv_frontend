import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  success: false,
};

const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("eventCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("eventCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    })
    .addCase("eventCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });

  // Get All Events of a shop
  builder.addCase("getAllEventsShopRequest", (state) => {
    state.isLoading = true;
  });
  builder.addCase("getAllEventsShopSuccess", (state, action) => {
    state.isLoading = false;
    state.events = action.payload;
  });
  builder.addCase("getAllEventsShopFailed", (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });

  // Delete product of a shop
  builder.addCase("deleteEventRequest", (state) => {
    state.isLoading = true;
  });
  builder.addCase("deleteEventSuccess", (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  });
  builder.addCase("deleteEventFailed", (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });

  // Get All Events
  builder.addCase("getAllEventsRequest", (state) => {
    state.isLoading = true;
  });
  builder.addCase("getAllEventsSuccess", (state, action) => {
    state.isLoading = false;
    state.allEvents = action.payload;
  });
  builder.addCase("getAllEventsFailed", (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
});

export default eventReducer;
