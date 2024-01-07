import { useEffect } from "react";
import Protected from "./features/auth/components/Protected";
import CartPage from "./pages/CartPage";
import CheckOutPage from "./pages/CheckOutPage";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SignUpPage from "./pages/SignUpPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchItemsByUserId } from "./features/cart/cartAPI";
import { fetchLoggedInUser } from "./features/user/userAPI";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrderPage from "./pages/UserOrderPage";
import ProfilePage from "./pages/ProfilePage";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetail";
import AdminProductForm from "./features/admin/AdminProductForm";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchItemsByUserId(isLoggedIn.id));
      dispatch(fetchLoggedInUser(isLoggedIn.id));
    }
  }, [isLoggedIn]);
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
          <Route
            path="/admin"
            element={
              <ProtectedAdmin>
                <AdminHome />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/product-form"
            element={
              <ProtectedAdmin>
                <AdminProductForm />
              </ProtectedAdmin>
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
          <Route
            path="/admin/product-detail/:id"
            element={
              <ProtectedAdmin>
                <AdminProductDetailPage />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/orders"
            element={
              <Protected>
                <UserOrderPage />
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected>
                <ProfilePage />
              </Protected>
            }
          />
          <Route
            path="/logout"
            element={
              <Protected>
                <Logout />
              </Protected>
            }
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/order-success/:id"
            element={
              <Protected>
                <OrderSuccessPage />
              </Protected>
            }
          />
          <Route path="/*" element={<PageNotFound></PageNotFound>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
