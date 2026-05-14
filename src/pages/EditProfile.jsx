import { ChevronLeft, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneTop from "../components/PhoneTop";
import { getProfile } from "../utils/storage";

export default function EditProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(getProfile());
  const [showSkip, setShowSkip] = useState(false);

  const update = (key, value) => setProfile((current) => ({ ...current, [key]: value }));
  const save = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    localStorage.setItem("isLogin", "true");
    navigate("/profile");
  };

  return (
    <main className="screen" style={{ paddingBottom: 86 }}>
      <PhoneTop />
      <div className="topbar">
        <button className="icon-button" onClick={() => setShowSkip(true)} type="button">
          <ChevronLeft size={26} />
        </button>
        <h1 className="topbar-title">프로필</h1>
        <span />
      </div>

      <label className="form-label required" htmlFor="nickname">
        닉네임
      </label>
      <input className="input" id="nickname" onChange={(event) => update("nickname", event.target.value)} placeholder="어떻게 불러드리면 될까요?" value={profile.nickname || ""} />

      <section className="panel" style={{ marginTop: 24 }}>
        <h2 className="panel-title">기본 정보</h2>
        <label className="form-label required" htmlFor="name">
          성명
        </label>
        <input className="input" id="name" onChange={(event) => update("name", event.target.value)} placeholder="성명을 입력해 주세요." value={profile.name || ""} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <label className="form-label required" htmlFor="age">
              나이
            </label>
            <select className="select" id="age" onChange={(event) => update("age", event.target.value)} value={profile.age || "21세"}>
              {["20세", "21세", "22세", "23세", "24세"].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label required" htmlFor="region">
              거주지
            </label>
            <select className="select" id="region" onChange={(event) => update("region", event.target.value)} value={profile.region || "경기도 안양시"}>
              {["경기도 안양시", "서울특별시", "인천광역시", "부산광역시"].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </div>
        </div>
        <label className="form-label" htmlFor="address">
          상세 주소
        </label>
        <div style={{ position: "relative" }}>
          <input className="input" id="address" placeholder="주소를 입력해 주세요." />
          <Search color="#a8b2c8" size={18} style={{ position: "absolute", right: 12, top: 12 }} />
        </div>
      </section>

      <section className="panel" style={{ marginTop: 16 }}>
        <h2 className="panel-title">상황 정보</h2>
        <label className="form-label" htmlFor="income">
          소득 분위
        </label>
        <select className="select" id="income" onChange={(event) => update("income", event.target.value)} value={profile.income || "-"}>
          {["-", "1분위", "3분위", "5분위", "9분위"].map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
        <label className="form-label required" htmlFor="education">
          학력
        </label>
        <select className="select" id="education" onChange={(event) => update("education", event.target.value)} value={profile.education || "대학교 재학"}>
          {["대학교 재학", "고등학교 졸업", "대학교 졸업", "대학원 재학"].map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <label className="form-label" htmlFor="school">
              학교
            </label>
            <input className="input" id="school" onChange={(event) => update("school", event.target.value)} placeholder="재학중인 경우" value={profile.school || ""} />
          </div>
          <div>
            <label className="form-label" htmlFor="major">
              전공
            </label>
            <select className="select" id="major" onChange={(event) => update("major", event.target.value)} value={profile.major || "공학계열"}>
              {["공학계열", "인문계열", "사회계열", "예체능계열"].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <div className="detail-fixed-action" style={{ bottom: 18 }}>
        <button className="primary-button" onClick={save} type="button">
          저장 하기
        </button>
      </div>

      {showSkip && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h2 className="modal-title">
              선택 정보를 입력하지 않고
              <br />
              건너뛰시겠습니까?
            </h2>
            <p className="modal-text">더 향상 된 추천을 받을 수 있습니다!</p>
            <div className="modal-actions">
              <button onClick={() => setShowSkip(false)} type="button">
                아니요
              </button>
              <button onClick={() => navigate("/profile")} type="button">
                예
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
