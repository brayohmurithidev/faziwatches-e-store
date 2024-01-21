import "./App.css";
import MainLayout from "./layouts/MainLayout";
import {
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import LandingPage, { landingLoader } from "./pages/LandingPage";
import About from "./pages/About";
import Shop, { shopLoader } from "./pages/Shop";
import Product, { productLoader } from "./pages/Product";
import PagesLayout from "./layouts/PagesLayout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        <Route path="/" loader={landingLoader} element={<LandingPage />} />
        <Route element={<PagesLayout />}>
          <Route path="/about" element={<About />} />
          <Route
            path="/product/:id"
            loader={productLoader}
            element={<Product />}
          />
          <Route path="/shop" element={<Shop />} loader={shopLoader} />
        </Route>
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}

export default App;
