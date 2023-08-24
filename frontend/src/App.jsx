import Protected from "./features/auth/components/Protected";
import CartPage from "./pages/CartPage";
import CheckOutPage from "./pages/CheckOutPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SignUpPage from "./pages/SignUpPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="APP">
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/cart"
            element={
              <Protected>
                <CartPage />
              </Protected>
            }
          />
          <Route
            path="/checkout"
            element={
              <Protected>
                <CheckOutPage />
              </Protected>
            }
          />
          <Route
            path="/product-detail/:id"
            element={
              <Protected>
                <ProductDetailPage />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
