import "./App.css";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Shop from "./pages/Shop";
import { useState } from "react";

function App() {
  const [openProductDrawer, setOpenProductDrawer] = useState(false);
  return (
    <Routes>
      <Route
        element={
          <Layout open={openProductDrawer} setOpen={setOpenProductDrawer} />
        }
      >
        <Route
          path="/"
          element={
            <LandingPage
              open={openProductDrawer}
              setOpen={setOpenProductDrawer}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
      </Route>
    </Routes>
  );
}

export default App;
