import { Routes, Route } from "react-router-dom";

import WebsiteLayout from "../components/layout/WebsiteLayout";
import DashboardLayout from "../components/layout/DashboardLayout";

import Home from "../pages/Home";
import { About } from "../pages/About";
import { Contact } from "../pages/Contact";
import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/Checkout";
import { Plans } from "../pages/Plans";
import { Favorites } from "../pages/Favorites";
import { NotFound } from "../pages/NotFound";
import { ProtectedRoute } from "./ProtectedRoute";
import CostCalculatorPage from "../pages/CostCalculatorPage";

export function AppRouter() {
  return (
    <Routes>
      {/* Website */}
      <Route element={<WebsiteLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Dashboard */}
      <Route element={<DashboardLayout />}>
        <Route path="plans" element={<Plans />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="cost-calculator" element={<CostCalculatorPage />} />
        <Route path="cart" element={<Cart />} />

        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
