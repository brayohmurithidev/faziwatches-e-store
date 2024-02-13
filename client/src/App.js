import "./App.css";
import MainLayout from "./layouts/MainLayout";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import LandingPage, { landingLoader } from "./pages/LandingPage";
import About from "./pages/About";
import Shop, { shopLoader } from "./pages/Shop";
import Product, { productLoader } from "./pages/Product";
import PagesLayout from "./layouts/PagesLayout";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import ErrorHandler from "./components/ErrorHandler";
import * as React from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        <Route path="/" loader={landingLoader} element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PagesLayout />}>
          <Route path="/about" element={<About />} />

          {/*  PRODUCTS ROUTES*/}
          <Route path="/products" errorElement={<ErrorHandler />}>
            <Route
              index
              element={<Shop />}
              loader={({ request }) => shopLoader(request)}
            />
            <Route
              path=":categories?/:id"
              loader={productLoader}
              element={<Product />}
            />
          </Route>

          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}

export default App;
