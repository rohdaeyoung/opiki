import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [age, setAge] = useState("");
  const [region, setRegion] = useState("");
  const [income, setIncome] = useState("");
  const [school, setSchool] = useState("");

  const signup = () => {

    if (!name || !email || !password) {

      alert("필수 정보를 입력해주세요.");

      return;

    }

    const profileData = {

      name,

      email,

      password,

      age,

      region,

      income,

      school,

    };

    localStorage.setItem(
      "profile",
      JSON.stringify(profileData)
    );

    localStorage.setItem(
      "isLogin",
      "true"
    );

    alert("회원가입 완료");

    navigate("/");

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#F5F6FB",
        maxWidth: "430px",
        margin: "0 auto",
        padding: "24px 20px 40px",
        boxSizing: "border-box",
      }}
    >

      <h1
        style={{
          fontSize: "34px",
          fontWeight: "900",
          color: "#1F2A44",
          marginBottom: "30px",
        }}
      >
        회원가입
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >

        <input
          placeholder="이름"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={inputStyle}
        />

        <input
          placeholder="이메일"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={inputStyle}
        />

        <input
          placeholder="나이"
          value={age}
          onChange={(e) =>
            setAge(e.target.value)
          }
          style={inputStyle}
        />

        <input
          placeholder="거주 지역"
          value={region}
          onChange={(e) =>
            setRegion(e.target.value)
          }
          style={inputStyle}
        />

        <input
          placeholder="소득 분위"
          value={income}
          onChange={(e) =>
            setIncome(e.target.value)
          }
          style={inputStyle}
        />

        <input
          placeholder="학교"
          value={school}
          onChange={(e) =>
            setSchool(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={signup}
          style={{
            width: "100%",
            height: "56px",
            border: "none",
            borderRadius: "18px",
            background:
              "linear-gradient(135deg,#5B8CFF,#63E6BE)",
            color: "white",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          회원가입 완료
        </button>

      </div>

    </div>

  );

}

const inputStyle = {

  width: "100%",

  height: "54px",

  border: "none",

  borderRadius: "16px",

  padding: "0 18px",

  background: "white",

  fontSize: "15px",

  outline: "none",

  boxSizing: "border-box",

};

export default Signup;