import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {

    if (!name || !id || !password) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    const user = {
      name,
      id,
      password,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    alert("회원가입 완료!");

    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F7F9FC",
        padding: "30px 24px",
      }}
    >

      <h1
        style={{
          fontSize: "32px",
          fontWeight: "800",
          color: "#1F2A44",
          marginBottom: "14px",
        }}
      >
        회원가입
      </h1>

      <p
        style={{
          color: "#A8B1C7",
          marginBottom: "34px",
        }}
      >
        회원 정보를 입력해주세요
      </p>

      {/* 이름 */}
      <input
        placeholder="이름"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        style={inputStyle}
      />

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

      <button
        onClick={handleSignup}
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
        회원가입
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

export default Signup;