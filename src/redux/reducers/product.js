import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("productCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("productCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase("productCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });

  // Get All Products of a shop
  builder.addCase("getAllProductsShopRequest", (state) => {
    state.isLoading = true;
  });
  builder.addCase("getAllProductsShopSuccess", (state, action) => {
    state.isLoading = false;
    state.products = action.payload;
  });
  builder.addCase("getAllProductsShopFailed", (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });

  // Delete product of a shop
  builder.addCase("deleteProductRequest", (state) => {
    state.isLoading = true;
  });
  builder.addCase("deleteProductSuccess", (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  });
  builder.addCase("deleteProductFailed", (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });

  // Get All Products
  builder.addCase("getAllProductsRequest", (state) => {
    state.isLoading = true;
  });
  builder.addCase("getAllProductsSuccess", (state, action) => {
    state.isLoading = false;
    state.allProducts = action.payload;
  });
  builder.addCase("getAllProductsFailed", (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
});

export default productReducer;
