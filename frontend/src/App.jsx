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
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetail";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminEditProductForm from "./pages/AdminEditProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import { checkUser } from "./features/auth/authAPI";
import SalePage from "./pages/SalePage";
import LogoutPage from "./pages/LogoutPage";
import MobilesPage from "./pages/MobilesPage";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.loggedInUserToken);

  useEffect(() => {
    if (token) {
      dispatch(fetchItemsByUserId());
      dispatch(fetchLoggedInUser());
    }
    if (token) {
      dispatch(checkUser());
    }
  }, [token]);
  useEffect(() => {
    dispatch(checkUser());
  }, []);
  return (
    <div className="APP  bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
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
            path="/sale"
            element={
              <Protected>
                <SalePage></SalePage>
              </Protected>
            }
          />
          <Route
            path="/mobiles"
            element={
              <Protected>
                <MobilesPage></MobilesPage>
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
                <AdminProductFormPage />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/product-edit-form/:id"
            element={
              <ProtectedAdmin>
                <AdminEditProductForm />
              </ProtectedAdmin>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedAdmin>
                <AdminOrdersPage />
              </ProtectedAdmin>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/logout"
            element={
              <Protected>
                <LogoutPage />
              </Protected>
            }
          />
          <Route path="/" element={<SignUpPage />} />
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
          {/* <Route
            path="/logout"
            element={
              <Protected>
                <Logout />
              </Protected>
            }
          /> */}
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
