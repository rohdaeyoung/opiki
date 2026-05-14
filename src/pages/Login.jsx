import { ChevronLeft, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneTop from "../components/PhoneTop";

export default function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("userName", id || "opiki");
    navigate("/");
  };

  return (
    <main className="screen" style={{ paddingBottom: 24 }}>
      <PhoneTop />
      <div className="topbar">
        <button className="icon-button" onClick={() => navigate(-1)} type="button">
          <ChevronLeft size={26} />
        </button>
        <h1 className="topbar-title">로그인</h1>
        <span />
      </div>

      <section style={{ marginTop: 82 }}>
        <label className="form-label required" htmlFor="login-id">
          아이디
        </label>
        <input
          className="input"
          id="login-id"
          onChange={(event) => setId(event.target.value)}
          placeholder="아이디 혹은 이메일을 입력해 주세요."
          value={id}
        />

        <label className="form-label required" htmlFor="login-password">
          비밀번호
        </label>
        <input
          className="input"
          id="login-password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="비밀번호를 입력해 주세요."
          type="password"
          value={password}
        />

        <p style={{ color: "#b0bad0", fontSize: 11, fontWeight: 800, textAlign: "center", margin: "14px 0 8px" }}>
          아직 오피키 회원이 아니신가요?
        </p>
        <button className="muted-link" onClick={() => navigate("/signup")} style={{ width: "100%", color: "#5b8cff" }} type="button">
          회원가입 하기
        </button>
        <button className="primary-button" onClick={handleLogin} style={{ marginTop: 18 }} type="button">
          로그인
        </button>
        <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 18, alignItems: "center" }}>
          <button style={{ border: 0, background: "transparent", color: "#70d64e", fontSize: 27, fontWeight: 900 }} type="button">
            N
          </button>
          <button style={{ border: 0, background: "transparent", color: "#4285f4", fontSize: 27, fontWeight: 900 }} type="button">
            G
          </button>
          <button style={{ border: 0, background: "transparent", color: "#000" }} type="button">
            <Phone size={24} fill="currentColor" />
          </button>
          <button style={{ border: 0, background: "transparent", color: "#5b8cff" }} type="button">
            <Mail size={24} />
          </button>
        </div>
      </section>
    </main>
  );
}
