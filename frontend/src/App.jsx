import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="APP">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
