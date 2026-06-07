import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoutes from "./ProtectedRoutes";

import HomePage from "../pages/movies/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProfilePage from "../pages/user/ProfilePage";
import WatchlistPage from "../pages/user/WatchlistPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProtectedRoutes><ProfilePage /></ProtectedRoutes>} />
          <Route path="/watchlist" element={<ProtectedRoutes><WatchlistPage /></ProtectedRoutes>} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;