import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });

  builder.addCase("UpdateUserInfoRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("UpdateUserInfoSuccess", (state, action) => {
    state.loading = false;
    state.user = action.payload;
  });
  builder.addCase("UpdateUserInfoFail", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  // update user address
  builder.addCase("updateUserAddressRequest", (state) => {
    state.addressLoading = true;
  });
  builder.addCase("updateUserAddressSuccess", (state, action) => {
    state.addressLoading = false;
    state.successMessage = action.payload.successMessage;
    state.user = action.payload.user;
  });
  builder.addCase("updateUserAddressFailed", (state, action) => {
    state.addressLoading = false;
    state.error = action.payload;
  });

  // delete user address
  builder.addCase("deleteUserAddressRequest", (state) => {
    state.addressLoading = true;
  });
  builder.addCase("deleteUserAddressSuccess", (state, action) => {
    state.addressLoading = false;
    state.successMessage = action.payload.successMessage;
    state.user = action.payload.user;
  });
  builder.addCase("deleteUserAddressFailed", (state, action) => {
    state.addressLoading = false;
    state.error = action.payload;
  });
});

export default userReducer;
