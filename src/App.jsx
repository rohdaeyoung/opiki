import Loading from "./pages/Loading";
import AI from "./pages/AI";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Favorite from "./pages/Favorite";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import Detail from "./pages/Detail";
import Notification from "./pages/Notification";
import EditProfile from "./pages/EditProfile";

function App() {

  const isLogin =
    localStorage.getItem("isLogin");

  return (

    <BrowserRouter>

      <div className="app">

        <Routes>

          {/* 로그인 */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* 회원가입 */}
          <Route
            path="/signup"
            element={<Signup />}
          />

          {/* 홈 */}
          <Route
            path="/"
            element={
              isLogin
              ?
              <Home />
              :
              <Navigate to="/login" />
            }
          />

          {/* 기록 */}
          <Route
            path="/favorite"
            element={
              isLogin
              ?
              <Favorite />
              :
              <Navigate to="/login" />
            }
          />

          {/* 캘린더 */}
          <Route
            path="/calendar"
            element={
              isLogin
              ?
              <Calendar />
              :
              <Navigate to="/login" />
            }
          />

          {/* 프로필 */}
          <Route
            path="/profile"
            element={
              isLogin
              ?
              <Profile />
              :
              <Navigate to="/login" />
            }
          />

          {/* 상세 페이지 */}
          <Route
            path="/detail"
            element={
              isLogin
              ?
              <Detail />
              :
              <Navigate to="/login" />
            }
          />

          {/* 알림 페이지 */}
          <Route
            path="/notification"
            element={
              isLogin
              ?
              <Notification />
              :
              <Navigate to="/login" />
            }
          />
            <Route
              path="/loading"
              element={<Loading />}
            />

            {/* <Route
                  path="/ai"
                  element={
                    isLogin
                    ?
                    <AI />
                    :
                    <Navigate to="/login" />
                  }
                />
         */}

         <Route
            path="/ai"
            element={<AI />}
          />

          <Route
            path="/edit-profile"
            element={<EditProfile />}
          />
        
        
        </Routes>



      </div>

    </BrowserRouter>

  );
}

export default App;