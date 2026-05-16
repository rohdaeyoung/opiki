import { CheckCircle2, ChevronLeft, ChevronRight, FileText, Link2, Settings, Star, UserRound } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneTop from "../components/PhoneTop";
import { connectGov24, disconnectGov24, getGov24Data, getProfile, isLoggedIn } from "../utils/storage";

export default function Profile() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  // 사용자가 직접 입력한 프로필이 localStorage 에 있을 때만 진짜 데이터로 간주
  const rawProfile = (typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("profile") || "null")
    : null);
  const emptyProfile = {
    nickname: "",
    name: "",
    age: "",
    region: "",
    income: "",
    education: "",
    school: "",
    major: "",
    job: "",
    special: "",
    extra: "",
  };
  const hasRealProfile = loggedIn && rawProfile;
  const profile = hasRealProfile ? rawProfile : emptyProfile;
  const [gov24Data, setGov24Data] = useState(getGov24Data());
  const [showConsent, setShowConsent] = useState(false);
  const [showDisconnect, setShowDisconnect] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const handleConnectClick = () => {
    if (!loggedIn) {
      setShowLoginAlert(true);
      return;
    }
    setShowConsent(true);
  };

  const logout = () => {
    localStorage.removeItem("isLogin");
    navigate("/");
  };

  return (
    <main className="screen">
      <PhoneTop />
      <div className="topbar">
        <button className="icon-button" onClick={() => navigate(-1)} type="button">
          <ChevronLeft size={26} />
        </button>
        <h1 className="topbar-title">프로필</h1>
        <span />
      </div>

      <section className="header-row" style={{ justifyContent: "flex-start", marginTop: 18 }}>
        <div
          style={{
            width: 62,
            height: 62,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#5b8cff,#65ddc6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          <UserRound size={38} />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 900 }}>{hasRealProfile ? (profile.name || "님") : "님"}</h2>
          <p style={{ margin: "4px 0 0", color: "#a8b2c8", fontSize: 12, fontWeight: 800 }}>{hasRealProfile ? (profile.education || "") : ""}</p>
        </div>
        <button className="icon-button" type="button">
          <Settings size={21} />
        </button>
      </section>

      <section className="summary-card" style={{ marginTop: 22 }}>
        <div className="section-head" style={{ margin: "0 0 12px" }}>
          <h2 className="section-title">내 상황 요약</h2>
          <button className="muted-link" onClick={() => navigate("/edit-profile")} type="button">
            수정하기 ›
          </button>
        </div>
        {[
          ["나이", profile.age],
          ["거주지역", profile.region],
          ["소득 기준", profile.income],
          ["학력", profile.education],
          ["전공", profile.major],
          ["취업상태", profile.job],
          ["특화분야", profile.special],
          ["추가사항", profile.extra],
        ].map(([label, value]) => (
          <div className="summary-row" key={label}>
            <span>{label}</span>
            <strong>{value || "-"}</strong>
          </div>
        ))}
      </section>

      <section className="panel" style={{ marginTop: 18 }}>
        <div className="section-head" style={{ margin: 0 }}>
          <h2 className="section-title">정부24 연동</h2>
          {gov24Data.connected ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#65ddc6", fontSize: 11, fontWeight: 900, display: "inline-flex", alignItems: "center", gap: 4 }}>
                <CheckCircle2 size={15} /> 연동 완료
              </span>
              <button className="muted-link" onClick={() => setShowDisconnect(true)} style={{ color: "#ff8c5a", fontSize: 11, fontWeight: 900, background: "transparent", border: 0 }} type="button">
                연동 끊기
              </button>
            </span>
          ) : (
            <button className="muted-link" onClick={handleConnectClick} style={{ color: "#5b8cff" }} type="button">
              연동하기 ›
            </button>
          )}
        </div>
        <p style={{ margin: "10px 0 12px", color: "#7d879d", fontSize: 11, lineHeight: 1.55, fontWeight: 800 }}>
          이용자 동의 후 필요한 서류와 관심 조건을 확인해 AI 추천에 반영합니다.
        </p>
        {gov24Data.connected ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {gov24Data.documents.map((doc) => (
              <div
                key={doc.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "28px 1fr auto",
                  gap: 8,
                  alignItems: "center",
                  padding: "9px 0",
                  borderTop: "1px solid #edf1f7",
                }}
              >
                <FileText size={20} color="#5b8cff" />
                <span>
                  <strong style={{ display: "block", fontSize: 12 }}>{doc.title}</strong>
                  <small style={{ color: "#a8b2c8", fontSize: 10, fontWeight: 800 }}>{doc.usedFor}</small>
                </span>
                <span className={`badge ${doc.status === "추가 필요" ? "orange" : "mint"}`} style={{ width: 58 }}>
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <button className="primary-button" onClick={handleConnectClick} type="button">
            <Link2 size={15} style={{ verticalAlign: "middle" }} /> 정부24로 서류 불러오기
          </button>
        )}
      </section>

      <section style={{ marginTop: 22 }}>
        <h2 className="section-title" style={{ marginBottom: 12 }}>
          관리
        </h2>
        <div className="panel" style={{ padding: 0, overflow: "hidden" }}>
          {[
            [UserRound, "내 정보", "내 상황 정보 관리하기"],
            [Star, "추천 기준", "혜택 추천 기준 관리하기"],
          ].map(([Icon, title, text]) => (
            <button
              key={title}
              onClick={() => navigate("/edit-profile")}
              style={{
                width: "100%",
                border: 0,
                background: "#fff",
                display: "grid",
                gridTemplateColumns: "38px 1fr 24px",
                gap: 8,
                alignItems: "center",
                padding: "17px 16px",
                textAlign: "left",
              }}
              type="button"
            >
              <Icon size={22} />
              <span>
                <strong style={{ display: "block", fontSize: 13 }}> {title}</strong>
                <small style={{ color: "#a8b2c8", fontSize: 11, fontWeight: 800 }}>{text}</small>
              </span>
              <ChevronRight size={20} color="#a8b2c8" />
            </button>
          ))}
        </div>
      </section>

      <button className="orange-button" onClick={logout} style={{ marginTop: 24 }} type="button">
        로그아웃
      </button>

      {showConsent && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h2 className="modal-title">
              정부24 정보를 불러와
              <br />
              맞춤 추천에 사용할까요?
            </h2>
            <p className="modal-text">주민등록등본, 재학증명서, 소득분위 확인서 등 필요한 서류 상태를 확인합니다.</p>
            <div className="modal-actions">
              <button onClick={() => setShowConsent(false)} type="button">
                아니요
              </button>
              <button
                onClick={() => {
                  setGov24Data(connectGov24(profile));
                  setShowConsent(false);
                }}
                type="button"
              >
                동의하고 연동
              </button>
            </div>
          </div>
        </div>
      )}

      {showDisconnect && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h2 className="modal-title">
              정부24 연동을
              <br />
              해제할까요?
            </h2>
            <p className="modal-text">연동을 끊으면 서류 확인 정보가 삭제되고 AI 추천에서도 빠집니다. 언제든 다시 연동할 수 있어요.</p>
            <div className="modal-actions">
              <button onClick={() => setShowDisconnect(false)} type="button">
                아니요
              </button>
              <button
                onClick={() => {
                  setGov24Data(disconnectGov24());
                  setShowDisconnect(false);
                }}
                type="button"
              >
                연동 해제
              </button>
            </div>
          </div>
        </div>
      )}

      {showLoginAlert && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h2 className="modal-title">
              로그인이 필요해요
            </h2>
            <p className="modal-text">정부24 연동은 로그인 후에만 가능합니다. 먼저 로그인을 진행해주세요.</p>
            <div className="modal-actions">
              <button onClick={() => setShowLoginAlert(false)} type="button">
                나중에
              </button>
              <button
                onClick={() => {
                  setShowLoginAlert(false);
                  navigate("/login");
                }}
                type="button"
              >
                로그인하러 가기
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
