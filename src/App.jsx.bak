import "./App.css";

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import AI from "./pages/AI";
import Calendar from "./pages/Calendar";
import Detail from "./pages/Detail";
import EditProfile from "./pages/EditProfile";
import Favorite from "./pages/Favorite";
import History from "./pages/History";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import BottomNav from "./components/BottomNav";

function Layout() {
  const location = useLocation();
  const hideBottomNav = ["/login", "/signup", "/edit-profile"].includes(location.pathname);

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      {!hideBottomNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
