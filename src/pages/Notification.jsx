import { ChevronLeft, Clock, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneTop from "../components/PhoneTop";
import benefits from "../data/benefits";
import { ensureAppliedNotifications, getNotifications } from "../utils/storage";

const defaultNotices = [
  { id: "static-1", title: "국가근로장학금 2학기", text: "신청 마감일이 10일 남았어요!", time: "하루 전", badge: "D-10", starred: true, category: "마감 임박" },
  { id: "static-2", title: "청년 내일채움 공제", text: "2년 근속 시 1,200만원 + α", time: "3일 전", badge: "", starred: false, category: "마감 임박" },
  { id: "static-3", title: "국가근로장학금 2학기", text: "신청이 마감되었어요", time: "5일 전", badge: "마감", starred: true, category: "마감 임박" },
  { id: "static-4", title: "국가근로장학금 2학기", text: "단계별 맞춤 교육을 들을 수 있어요", time: "6일 전", badge: "마감", starred: false, category: "공지" },
  { id: "static-5", title: "서비스 점검 안내", text: "5/24(금) 새벽 서비스 점검이 있어요", time: "6일 전", badge: "", starred: false, category: "공지" },
];

export default function Notification() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("전체");
  const [storedNotices, setStoredNotices] = useState([]);

  useEffect(() => {
    // 신청한 혜택을 알림으로 자동 등록
    ensureAppliedNotifications(benefits);
    setStoredNotices(getNotifications());
  }, []);

  const notices = useMemo(() => {
    const merged = [
      ...storedNotices.map((item) => ({
        ...item,
        time: item.createdAt ? "방금" : "최근",
      })),
      ...defaultNotices,
    ];
    if (tab === "전체") return merged;
    return merged.filter((item) => item.category === tab);
  }, [storedNotices, tab]);

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
        {notices.map((n) => (
          <div key={n.id} style={{ display: "grid", gridTemplateColumns: "34px 1fr 54px", gap: 10, padding: "16px 0", borderBottom: "1px solid #e6ebf3" }}>
            <span style={{ display: "flex", flexDirection: "column", gap: 8, color: n.starred ? "#5b8cff" : "#b4bed0" }}>
              {n.starred ? <Star fill="currentColor" size={22} /> : <Clock size={22} />}
              <Clock color="#65ddc6" size={20} />
            </span>
            <span>
              <b style={{ display: "block", color: "#1f2a44", fontSize: 13, marginBottom: 3 }}>{n.title}</b>
              <small style={{ display: "block", color: "#a8b2c8", fontSize: 11, fontWeight: 800 }}>{n.text}</small>
              <small style={{ display: "block", color: "#a8b2c8", fontSize: 10, fontWeight: 800, marginTop: 5 }}>{n.time}</small>
            </span>
            {n.badge ? <span className={`badge ${n.badge === "마감" ? "closed" : "mint"}`}>{n.badge}</span> : <span />}
          </div>
        ))}
      </section>
    </main>
  );
}
