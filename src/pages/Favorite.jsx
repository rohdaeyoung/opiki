import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BenefitCard from "../components/BenefitCard";
import PhoneTop from "../components/PhoneTop";
import benefits from "../data/benefits";
import { getFavoriteIds, getProfile, toggleFavoriteId } from "../utils/storage";

export default function Favorite() {
  const navigate = useNavigate();
  const profile = getProfile();
  const [favoriteIds, setFavoriteIds] = useState(getFavoriteIds());
  const favorites = benefits.filter((item) => favoriteIds.includes(item.id));
  const top3 = benefits.slice(3, 6).concat(benefits.slice(0, 1)).slice(0, 3);

  const onToggleFavorite = (id) => setFavoriteIds(toggleFavoriteId(id));

  return (
    <main className="screen">
      <PhoneTop />
      <div className="topbar">
        <button className="icon-button" onClick={() => navigate(-1)} type="button">
          <ChevronLeft size={26} />
        </button>
        <h1 className="topbar-title">즐겨찾기</h1>
        <span />
      </div>

      <section className="summary-card" style={{ marginTop: 8 }}>
        <div className="section-head" style={{ margin: "0 0 12px" }}>
          <h2 className="section-title">내 상황 요약</h2>
          <button className="muted-link" onClick={() => navigate("/edit-profile")} type="button">
            수정하기 ›
          </button>
        </div>
        {[
          ["나이", profile.age],
          ["거주지역", profile.region],
          ["소득기준", profile.income],
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

      <section>
        <div className="section-head">
          <h2 className="section-title" style={{ color: "#66d7c7" }}>
            AI 추천 혜택 TOP3
          </h2>
          <button className="muted-link" type="button">
            추천 기준 ›
          </button>
        </div>
        <div className="panel" style={{ padding: "8px 12px" }}>
          {top3.map((item, index) => (
            <div
              key={item.id}
              onClick={() => navigate(`/detail/${item.id}`)}
              style={{
                display: "grid",
                gridTemplateColumns: "30px 1fr 45px",
                alignItems: "center",
                gap: 8,
                padding: "9px 0",
                borderBottom: index === top3.length - 1 ? 0 : "1px solid #edf1f7",
                cursor: "pointer",
              }}
            >
              <strong style={{ color: "#5b8cff", fontSize: 24 }}>{index + 1}</strong>
              <span>
                <b style={{ display: "block", fontSize: 12 }}>{item.title}</b>
                <small style={{ color: "#a8b2c8", fontSize: 10, fontWeight: 800 }}>{item.desc}</small>
                <small style={{ display: "block", color: item.status === "orange" ? "#ff9658" : "#61dcc8", fontSize: 10, fontWeight: 900 }}>{item.date}</small>
              </span>
              <span className={`badge ${item.status}`}>{item.deadline}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title" style={{ margin: "20px 0 8px" }}>
          즐겨찾기 한 혜택
        </h2>
        {favorites.length === 0 ? (
          <div className="empty-box">아직 즐겨찾기 한 혜택이 없어요.</div>
        ) : (
          <div className="benefit-list">
            {favorites.map((item) => (
              <BenefitCard isFavorite item={item} key={item.id} onToggleFavorite={onToggleFavorite} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
