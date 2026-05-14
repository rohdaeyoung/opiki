import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import AI from "./pages/AI";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import History from "./pages/History";
import Notification from "./pages/Notification";

import BottomNav from "./components/BottomNav";

function Layout() {

  const location =
    useLocation();

  // BottomNav 숨길 페이지
  const hideBottomNav =
    location.pathname === "/ai" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (

    <div className="app">

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/ai"
          element={<AI />}
        />

        <Route
          path="/calendar"
          element={<Calendar />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/edit-profile"
          element={<EditProfile />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/history"
          element={<History />}
        />

        <Route
          path="/notification"
          element={<Notification />}
        />

      </Routes>

      {!hideBottomNav && (
        <BottomNav />
      )}

    </div>

  );

}

function App() {

  return (

    <BrowserRouter>

      <Layout />

    </BrowserRouter>

  );

}

export default App;