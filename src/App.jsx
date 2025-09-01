import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductsDetailPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
} from "../src/routes/Routes.js";
import { ShopHomePage } from "../src/routes/ShopRoutes.js";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import store from "./redux/store.js";
import { loadSeller, loadUser } from "./redux/actions/user.js";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.jsx";

const App = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { isLoading, seller, isSeller } = useSelector((state) => state.seller);
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadSeller());
  }, []);

  return (
    <>
      {loading || isLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <h1 className="text-xl font-semibold">Loading...</h1>
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route
              path="/activation/:activation_token"
              element={<ActivationPage />}
            />
            <Route
              path="seller/activation/:activation_token"
              element={<SellerActivationPage />}
            />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:name" element={<ProductsDetailPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoutes isAuthenticated={isAuthenticated}>
                  <ProfilePage />
                </ProtectedRoutes>
              }
            />
            {/* Shop Routes */}
            <Route path="/shop-create" element={<ShopCreatePage />} />
            <Route path="/shop-login" element={<ShopLoginPage />} />
            <Route
              path="/shop/:id"
              element={
                <SellerProtectedRoute>
                  <ShopHomePage />
                </SellerProtectedRoute>
              }
            />
          </Routes>

          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
