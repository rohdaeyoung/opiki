import {
  FaHome,
  FaRegCalendarAlt,
  FaHistory,
  FaUser,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function BottomNav() {

  const navigate = useNavigate();

  return (

    <div
      style={{
        position: "fixed",

        bottom: "0",

        left: "50%",
        transform: "translateX(-50%)",

        width: "100%",
        maxWidth: "430px",

        height: "84px",

        background: "#fff",

        borderTop: "1px solid #DDE3F3",

        display: "flex",

        justifyContent: "space-around",

        alignItems: "center",

        zIndex: "999",
      }}
    >

      {/* 홈 */}
      <div
        onClick={() =>
          navigate("/")
        }
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#5B8CFF",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        <FaHome />

        <span
          style={{
            fontSize: "13px",
            marginTop: "4px",
            fontWeight: "700",
          }}
        >
          홈
        </span>
      </div>

      {/* 일정 */}
      <div
        onClick={() =>
          navigate("/calendar")
        }
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#A8B1C7",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        <FaRegCalendarAlt />

        <span
          style={{
            fontSize: "13px",
            marginTop: "4px",
            fontWeight: "700",
          }}
        >
          일정
        </span>
      </div>

      {/* AI 버튼 */}
      <div
        onClick={() =>
          navigate("/ai")
        }
        style={{
          width: "68px",
          height: "68px",

          borderRadius: "50%",

          background:
            "linear-gradient(135deg,#5B8CFF,#6EE7C8)",

          position: "absolute",

          top: "-22px",

          left: "50%",

          transform: "translateX(-50%)",

          display: "flex",

          justifyContent: "center",

          alignItems: "center",

          color: "#fff",

          fontSize: "34px",

          boxShadow:
            "0 8px 24px rgba(91,140,255,0.25)",

          cursor: "pointer",
        }}
      >
        ✦
      </div>

      {/* 기록 */}
      <div
        onClick={() =>
          navigate("/favorite")
        }
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#A8B1C7",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        <FaHistory />

        <span
          style={{
            fontSize: "13px",
            marginTop: "4px",
            fontWeight: "700",
          }}
        >
          기록
        </span>
      </div>

      {/* 프로필 */}
      <div
        onClick={() =>
          navigate("/profile")
        }
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#A8B1C7",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        <FaUser />

        <span
          style={{
            fontSize: "13px",
            marginTop: "4px",
            fontWeight: "700",
          }}
        >
          프로필
        </span>
      </div>

    </div>

  );
}

export default BottomNav;