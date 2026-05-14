import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo1.svg";

import {
  FiCalendar,
  FiBell,
  FiUser,
} from "react-icons/fi";

import BottomNav from "../components/BottomNav";

function Home() {

  const navigate = useNavigate();

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const userName =
    localStorage.getItem("userName") || "사용자";

  const benefits = [

    {
      id: 1,
      title: "청년 교통비 지원사업",
      desc: "월 최대 3만 원 x 36개월 지원",
      date: "2026.05.12 ~ 2026.05.15",
      dday: "D-3",
    },

    {
      id: 2,
      title: "청년 월세 지원",
      desc: "청년 월세 최대 20만 원 지원",
      date: "2026.05.01 ~ 2026.05.31",
      dday: "D-19",
    },

    {
      id: 3,
      title: "국가근로장학금 2학기",
      desc: "학기 중 근로 장학 지원",
      date: "2026.05.01 ~ 2026.05.31",
      dday: "상시",
    },

  ];

  const toggleFavorite = (item) => {

    let updated = [];

    const exists =
      favorites.some((f) => f.id === item.id);

    if (exists) {

      updated =
        favorites.filter(
          (f) => f.id !== item.id
        );

    } else {

      updated = [...favorites, item];

    }

    setFavorites(updated);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );

  };

  return (

    <div
      style={{
        background: "#F7F9FC",
        minHeight: "100vh",
        maxWidth: "430px",
        margin: "0 auto",
        position: "relative",
        paddingBottom: "140px",
      }}
    >

      {/* 헤더 */}
      <div
        style={{
          padding: "22px 24px 10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >

        {/* 로고 */}
        {/* 로고 */}
        <img
          src={logo}
          alt="Opiki Logo"
          style={{
            width: "128px",
            height: "auto",
            objectFit: "contain",
          }}
        />

        {/* 우측 아이콘 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >

          <FiCalendar
            onClick={() =>
              navigate("/calendar")
            }
            style={{
              fontSize: "30px",
              color: "#1F2A44",
              cursor: "pointer",
            }}
          />

          <FiBell
            onClick={() =>
              navigate("/notification")
            }
            style={{
              fontSize: "30px",
              color: "#1F2A44",
              cursor: "pointer",
            }}
          />

          <FiUser
            onClick={() =>
              navigate("/profile")
            }
            style={{
              fontSize: "30px",
              color: "#1F2A44",
              cursor: "pointer",
            }}
          />

        </div>

      </div>

      {/* 사용자명 */}
      <div
        style={{
          padding: "8px 28px 0",
          fontSize: "30px",
          fontWeight: "800",
          color: "#1F2A44",
        }}
      >
        {userName}님 ›
      </div>

      {/* 메인 배너 */}
      <div
        style={{
          margin: "26px 20px 0",
          borderRadius: "38px",
          background:
            "linear-gradient(135deg,#5B8CFF,#67DCC8)",
          padding: "34px 28px",
          position: "relative",
          overflow: "hidden",
        }}
      >

        {/* 별 */}
        <div
          style={{
            position: "absolute",
            right: "38px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "120px",
            color: "rgba(255,255,255,0.18)",
            fontWeight: "100",
          }}
        >
          ✦
        </div>

        {/* 텍스트 */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
          }}
        >

          <div
            style={{
              fontSize: "52px",
              fontWeight: "900",
              lineHeight: 1.18,
              color: "#fff",
              letterSpacing: "-2px",
            }}
          >
            당신의 기회를
            <br />
            대신 발견해드려요
          </div>

          <div
            style={{
              marginTop: "28px",
              fontSize: "19px",
              lineHeight: 1.7,
              color: "#fff",
              fontWeight: "600",
            }}
          >
            맞춤 혜택을 비교하고
            <br />
            빠르게 신청까지!
          </div>

        </div>

      </div>

      {/* 타이틀 */}
      <div
        style={{
          padding: "42px 28px 10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >

        <div
          style={{
            fontSize: "28px",
            fontWeight: "900",
            color: "#1F2A44",
          }}
        >
          즐겨찾은 기회
        </div>

        <div
          style={{
            color: "#B0B7CC",
            fontWeight: "700",
            fontSize: "16px",
          }}
        >
          전체 보기 ›
        </div>

      </div>

      {/* 카드 */}
      <div
        style={{
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          gap: "22px",
        }}
      >

        {benefits.map((item) => {

          const isFavorite =
            favorites.some(
              (f) => f.id === item.id
            );

          return (

            <div

              key={item.id}

              onClick={() =>
                navigate("/detail", {
                  state: item,
                })
              }

              style={{
                background: "#fff",
                borderRadius: "32px",
                padding: "28px",
                border:
                  "1px solid #E2E8F0",
                position: "relative",
                cursor: "pointer",
              }}
            >

              {/* 별 */}
              <div
                onClick={(e) => {

                  e.stopPropagation();

                  toggleFavorite(item);

                }}
                style={{
                  position: "absolute",
                  right: "28px",
                  top: "28px",
                  fontSize: "46px",
                  color: "#5B8CFF",
                }}
              >
                {isFavorite ? "★" : "☆"}
              </div>

              {/* 제목 */}
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "900",
                  color: "#1F2A44",
                  marginBottom: "16px",
                }}
              >
                {item.title}
              </div>

              {/* 설명 */}
              <div
                style={{
                  fontSize: "17px",
                  color: "#B0B7CC",
                  fontWeight: "700",
                  marginBottom: "34px",
                  lineHeight: 1.5,
                }}
              >
                {item.desc}
              </div>

              {/* 신청기간 */}
              <div
                style={{
                  color: "#B0B7CC",
                  fontSize: "15px",
                  fontWeight: "700",
                  marginBottom: "10px",
                }}
              >
                신청 기간
              </div>

              {/* 날짜 */}
              <div
                style={{
                  fontSize: "18px",
                  color: "#F7924A",
                  fontWeight: "900",
                }}
              >
                {item.date}
              </div>

              {/* 디데이 */}
              <div
                style={{
                  position: "absolute",
                  right: "28px",
                  bottom: "28px",
                  border:
                    "3px solid #F7924A",
                  borderRadius: "22px",
                  padding: "10px 20px",
                  color: "#F7924A",
                  fontWeight: "900",
                  fontSize: "20px",
                }}
              >
                {item.dday}
              </div>

            </div>

          );

        })}

      </div>

      <BottomNav />

    </div>

  );
}

export default Home;