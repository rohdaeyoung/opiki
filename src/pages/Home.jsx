import { Bell, CalendarDays, SlidersHorizontal, User } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo1.svg";
import BenefitCard from "../components/BenefitCard";
import PhoneTop from "../components/PhoneTop";
import benefits, { categories } from "../data/benefits";
import { getFavoriteIds, getProfile, isLoggedIn, toggleFavoriteId } from "../utils/storage";

export default function Home() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const profile = getProfile();
  const [activeCategory, setActiveCategory] = useState("전체");
  const [favoriteIds, setFavoriteIds] = useState(getFavoriteIds());
  const [showLoginModal, setShowLoginModal] = useState(false);

  const favoriteBenefits = benefits.filter((item) => favoriteIds.includes(item.id)).slice(0, 2);
  const filteredBenefits = useMemo(
    () =>
      activeCategory === "전체"
        ? benefits
        : benefits.filter((item) => item.category === activeCategory || item.tags.includes(activeCategory)),
    [activeCategory],
  );

  const handleFavorite = (id) => {
    if (!loggedIn) {
      setShowLoginModal(true);
      return;
    }
    setFavoriteIds(toggleFavoriteId(id));
  };

  return (
    <main className="screen">
      <PhoneTop />
      <div className="header-row">
        <img className="logo" src={logo} alt="Opiki" />
        <div className="header-icons">
          <CalendarDays size={22} onClick={() => navigate("/calendar")} />
          <Bell size={21} onClick={() => navigate("/notification")} />
          <User size={21} onClick={() => navigate("/profile")} />
        </div>
      </div>

      {loggedIn ? (
        <button className="user-link" onClick={() => navigate("/profile")} type="button">
          {profile.nickname || "성결 멋사"}님 ›
        </button>
      ) : (
        <button className="login-link" onClick={() => navigate("/login")} type="button">
          로그인하기 ›
        </button>
      )}

      <section className="hero-card">
        <h1 className="hero-title">
          당신의 기회를
          <br />
          대신 발견해드려요
        </h1>
        <p className="hero-subtitle">
          맞춤 혜택을 비교하고
          <br />
          빠르게 신청까지!
        </p>
      </section>

      <section>
        <div className="section-head">
          <h2 className="section-title">즐겨찾은 기회</h2>
          <button className="muted-link" onClick={() => navigate("/favorite")} type="button">
            전체 보기 ›
          </button>
        </div>
        {!loggedIn || favoriteBenefits.length === 0 ? (
          <div className="empty-box">
            <span>아직 즐겨찾은 혜택이 없어요.</span>
            <button onClick={() => (loggedIn ? navigate("/favorite") : setShowLoginModal(true))} type="button">
              로그인 하고 즐겨찾기 →
            </button>
          </div>
        ) : (
          <div className="benefit-list">
            {favoriteBenefits.map((item) => (
              <BenefitCard
                isFavorite={favoriteIds.includes(item.id)}
                item={item}
                key={item.id}
                onToggleFavorite={handleFavorite}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="section-head">
          <h2 className="section-title">기회 리스트</h2>
          <button className="chip" type="button">
            <SlidersHorizontal size={12} /> 필터
          </button>
        </div>
        <div className="filter-row">
          {categories.map((category) => (
            <button
              className={`chip ${category === activeCategory ? "active" : ""}`}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
        <div className="benefit-list">
          {filteredBenefits.map((item) => (
            <BenefitCard
              isFavorite={favoriteIds.includes(item.id)}
              item={item}
              key={item.id}
              onToggleFavorite={handleFavorite}
            />
          ))}
        </div>
      </section>

      {showLoginModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h2 className="modal-title">
              나에게 맞는
              <br />
              혜택 리스트를 보고싶다면?
            </h2>
            <p className="modal-text">분석을 위한 정보를 입력해 주세요!</p>
            <div className="modal-actions" style={{ gridTemplateColumns: "1fr" }}>
              <button onClick={() => navigate("/login")} type="button">
                로그인 하러 가기
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
