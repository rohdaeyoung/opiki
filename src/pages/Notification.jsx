import { ChevronLeft, Clock, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneTop from "../components/PhoneTop";

const notices = [
  ["국가근로장학금 2학기", "신청 마감일이 10일 남았어요!", "하루 전", "D-10", true],
  ["청년 내일채움 공제", "2년 근속 시 1,200만원 + α", "3일 전", "", false],
  ["국가근로장학금 2학기", "신청이 마감되었어요", "5일 전", "마감", true],
  ["국가근로장학금 2학기", "단계별 맞춤 교육을 들을 수 있어요", "6일 전", "마감", false],
  ["서비스 점검 안내", "5/24(금) 새벽 서비스 점검이 있어요", "6일 전", "", false],
];

export default function Notification() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("전체");

  return (
    <main className="screen">
      <PhoneTop />
      <div className="topbar">
        <button className="icon-button" onClick={() => navigate(-1)} type="button">
          <ChevronLeft size={26} />
        </button>
        <h1 className="topbar-title">알림 내역</h1>
        <span />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", marginTop: 18, borderBottom: "1px solid #e6ebf3" }}>
        {["전체", "마감 임박", "공지"].map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            style={{
              height: 44,
              border: 0,
              background: "transparent",
              color: tab === item ? "#1f2a44" : "#b4bed0",
              borderBottom: tab === item ? "2px solid #5b8cff" : "2px solid transparent",
              fontSize: 18,
              fontWeight: 900,
            }}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <h2 style={{ margin: "18px 0 8px", color: "#b4bed0", fontSize: 14, fontWeight: 900 }}>일주일 이내</h2>
      <section>
        {notices.map(([title, text, time, badge, starred]) => (
          <div key={`${title}-${time}`} style={{ display: "grid", gridTemplateColumns: "34px 1fr 54px", gap: 10, padding: "16px 0", borderBottom: "1px solid #e6ebf3" }}>
            <span style={{ display: "flex", flexDirection: "column", gap: 8, color: starred ? "#5b8cff" : "#b4bed0" }}>
              {starred ? <Star fill="currentColor" size={22} /> : <Clock size={22} />}
              <Clock color="#65ddc6" size={20} />
            </span>
            <span>
              <b style={{ display: "block", color: "#1f2a44", fontSize: 13, marginBottom: 3 }}>{title}</b>
              <small style={{ display: "block", color: "#a8b2c8", fontSize: 11, fontWeight: 800 }}>{text}</small>
              <small style={{ display: "block", color: "#a8b2c8", fontSize: 10, fontWeight: 800, marginTop: 5 }}>{time}</small>
            </span>
            {badge ? <span className={`badge ${badge === "마감" ? "closed" : "mint"}`}>{badge}</span> : <span />}
          </div>
        ))}
      </section>
    </main>
  );
}
