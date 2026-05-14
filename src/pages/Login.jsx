import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [id, setId]
    = useState("");

  const [password, setPassword]
    = useState("");

  const handleLogin = () => {

    const user =
      JSON.parse(
        localStorage.getItem("user")
      );

    if (!user) {

      alert("회원가입 정보가 없습니다.");

      return;
    }

    if (
      user.id === id &&
      user.password === password
    ) {

      localStorage.setItem(
        "isLogin",
        "true"
      );

      localStorage.setItem(
        "userName",
        user.name
      );

      window.location.href = "/";

    } else {

      alert(
        "아이디 또는 비밀번호가 틀렸습니다."
      );

    }

  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F7F9FC",
        padding: "30px 24px",
      }}
    >

      {/* 제목 */}
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "800",
          color: "#1F2A44",
          marginBottom: "14px",
        }}
      >
        로그인
      </h1>

      <p
        style={{
          color: "#A8B1C7",
          marginBottom: "34px",
        }}
      >
        저장된 계정으로 로그인하세요
      </p>

      {/* 아이디 */}
      <input
        placeholder="아이디"
        value={id}
        onChange={(e) =>
          setId(e.target.value)
        }
        style={inputStyle}
      />

      {/* 비밀번호 */}
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        style={inputStyle}
      />

      {/* 로그인 버튼 */}
      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          height: "58px",
          border: "none",
          borderRadius: "18px",
          background: "#5B8CFF",
          color: "#fff",
          fontSize: "18px",
          fontWeight: "700",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        로그인
      </button>

      {/* 회원가입 이동 */}
      <button
        onClick={() =>
          navigate("/signup")
        }
        style={{
          marginTop: "18px",
          width: "100%",
          background: "transparent",
          border: "none",
          color: "#5B8CFF",
          fontWeight: "700",
          fontSize: "15px",
          cursor: "pointer",
        }}
      >
        회원가입 하러가기
      </button>

    </div>
  );
}

const inputStyle = {

  width: "100%",
  height: "58px",
  borderRadius: "18px",
  border: "1px solid #DDE3F3",
  padding: "0 18px",
  fontSize: "16px",
  marginBottom: "16px",
  outline: "none",
  background: "#fff",
  boxSizing: "border-box",

};

export default Login;