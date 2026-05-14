import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PhoneTop from "../components/PhoneTop";
import benefits from "../data/benefits";

export default function Calendar() {
  const navigate = useNavigate();
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  const marked = [10, 14, 19];
  const todayItems = benefits.filter((item) => ["traffic", "medical-ra", "closed-scholarship"].includes(item.id));

  return (
    <main className="screen">
      <PhoneTop />
      <div className="topbar">
        <button className="icon-button" onClick={() => navigate(-1)} type="button">
          <ChevronLeft size={26} />
        </button>
        <h1 className="topbar-title">캘린더</h1>
        <span />
      </div>

      <section style={{ padding: "12px 16px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28, marginBottom: 18 }}>
          <ChevronLeft color="#b5bed0" size={20} />
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 900 }}>2026년 5월</h2>
          <ChevronRight color="#b5bed0" size={20} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", textAlign: "center", color: "#c3cad7", fontSize: 11, fontWeight: 900, marginBottom: 12 }}>
          {["SAN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", rowGap: 18, textAlign: "center" }}>
          {days.map((day) => (
            <button
              key={day}
              style={{
                justifySelf: "center",
                width: 30,
                height: 30,
                border: 0,
                borderRadius: "50%",
                background: day === 19 ? "#5b8cff" : "transparent",
                color: day === 19 ? "#fff" : "#59657d",
                fontSize: 18,
                fontWeight: 900,
              }}
              type="button"
            >
              {day}
              {marked.includes(day) && day !== 19 ? <span style={{ display: "block", height: 2, background: "#ff9658", marginTop: 4 }} /> : null}
            </button>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2 className="section-title" style={{ marginBottom: 12 }}>
          오늘
        </h2>
        <div className="benefit-list">
          {todayItems.map((item) => (
            <button className={`benefit-card ${item.status === "orange" ? "orange-date" : ""}`} key={item.id} onClick={() => navigate(`/detail/${item.id}`)} type="button">
              <span style={{ width: 32, height: 32, borderRadius: "50%", background: "#ffe1f0", display: "grid", placeItems: "center" }}>⌂</span>
              <span>
                <h3 className="benefit-title">{item.title}</h3>
                <p className="benefit-desc">{item.desc}</p>
                <p className="benefit-date-label">신청 기간</p>
                <p className="benefit-date">{item.date}</p>
              </span>
              <span className={`badge ${item.status}`}>{item.deadline === "D-3" ? "D-0" : item.deadline}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
