import {
  Link,
  useLocation
} from "react-router-dom";

import {
  House,
  CalendarDays,
  History,
  User,
  Sparkles
} from "lucide-react";

function BottomNav() {

  const location =
    useLocation();

  return (

    <div
      style={{

        position: "fixed",

        bottom: "0",

        left: "50%",

        transform:
          "translateX(-50%)",

        width: "100%",

        maxWidth: "430px",

        height: "88px",

        background: "white",

        display: "flex",

        justifyContent:
          "space-around",

        alignItems: "center",

        borderTop:
          "1px solid #EAEAEA",

        zIndex: 9999,

      }}
    >

      <Link
        to="/"
        style={navStyle}
      >

        <House
          size={28}
          color={
            location.pathname === "/"
              ? "#5B8CFF"
              : "#A0A8C3"
          }
        />

        <span
          style={{
            color:
              location.pathname === "/"
                ? "#5B8CFF"
                : "#A0A8C3",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          홈
        </span>

      </Link>

      <Link
        to="/calendar"
        style={navStyle}
      >

        <CalendarDays
          size={28}
          color={
            location.pathname ===
            "/calendar"
              ? "#5B8CFF"
              : "#A0A8C3"
          }
        />

        <span
          style={{
            color:
              location.pathname ===
              "/calendar"
                ? "#5B8CFF"
                : "#A0A8C3",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          일정
        </span>

      </Link>

      <Link
        to="/ai"
        style={{
          position: "relative",
          top: "-26px",
        }}
      >

        <div
          style={{
            width: "74px",
            height: "74px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg,#5B8CFF,#63E6BE)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0 10px 24px rgba(91,140,255,0.35)",
          }}
        >

          <Sparkles
            color="white"
            size={34}
          />

        </div>

      </Link>

      <Link
        to="/notification"
        style={navStyle}
      >

        <History
          size={28}
          color={
            location.pathname ===
            "/notification"
              ? "#5B8CFF"
              : "#A0A8C3"
          }
        />

        <span
          style={{
            color:
              location.pathname ===
              "/notification"
                ? "#5B8CFF"
                : "#A0A8C3",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          기록
        </span>

      </Link>

      <Link
        to="/profile"
        style={navStyle}
      >

        <User
          size={28}
          color={
            location.pathname ===
            "/profile"
              ? "#5B8CFF"
              : "#A0A8C3"
          }
        />

        <span
          style={{
            color:
              location.pathname ===
              "/profile"
                ? "#5B8CFF"
                : "#A0A8C3",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          프로필
        </span>

      </Link>

    </div>

  );

}

const navStyle = {

  display: "flex",

  flexDirection: "column",

  alignItems: "center",

  gap: "4px",

  textDecoration: "none",

};

export default BottomNav;