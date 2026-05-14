import {
  FiBell,
  FiCalendar,
  FiUser
} from "react-icons/fi";

import {
  useNavigate
} from "react-router-dom";

import logo from "../assets/logo1.svg";

function Header() {

  const navigate = useNavigate();

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 20px 8px",
      }}
    >

      {/* 로고 */}
      <img
        src={logo}
        alt="logo"
        style={{
          width: "120px",
          objectFit: "contain",
        }}
      />

      {/* 우측 아이콘 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          color: "#1F2A44",
        }}
      >

        <FiCalendar
          size={24}
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate("/calendar")
          }
        />

        <FiBell
          size={24}
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate("/notification")
          }
        />

        <FiUser
          size={24}
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate("/profile")
          }
        />

      </div>

    </div>

  );
}

export default Header;