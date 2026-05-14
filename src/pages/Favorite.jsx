import BottomNav from "../components/BottomNav";

export default function Favorite() {

  const favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  const profile =
    JSON.parse(localStorage.getItem("profile")) || {};

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#F7F9FC",
        padding: "24px 20px 140px",
      }}
    >

      {/* 제목 */}
      <div
        style={{
          fontSize: "54px",
          fontWeight: "900",
          color: "#1F2A52",
          marginBottom: "10px",
          lineHeight: "1",
        }}
      >
        기록
      </div>

      {/* 설명 */}
      <div
        style={{
          fontSize: "18px",
          color: "#AAB3CC",
          fontWeight: "700",
          marginBottom: "26px",
        }}
      >
        AI 기반 관심 혜택 분석
      </div>

      {/* AI 분석 카드 */}
      <div
        style={{
          background: "linear-gradient(135deg,#5D85F7,#64DCC8)",
          borderRadius: "34px",
          padding: "28px",
          marginBottom: "26px",
          color: "#fff",
        }}
      >

        <div
          style={{
            fontSize: "30px",
            fontWeight: "900",
            marginBottom: "20px",
            lineHeight: "1.4",
          }}
        >
          AI 성향 분석
        </div>

        <div
          style={{
            fontSize: "17px",
            lineHeight: "1.9",
            fontWeight: "700",
            opacity: 0.95,
          }}
        >
          <div>
            나이 : {profile.age || "-"}세
          </div>

          <div>
            지역 : {profile.region || "-"}
          </div>

          <div>
            소득 분위 : {profile.income || "-"}
          </div>

          <div>
            관심 분야 : 생활 지원 · 청년 혜택
          </div>
        </div>

      </div>

      {/* 추천 섹션 */}
      <div
        style={{
          fontSize: "38px",
          fontWeight: "900",
          color: "#1F2A52",
          marginBottom: "20px",
          lineHeight: "1.2",
        }}
      >
        AI 추천 혜택 TOP3
      </div>

      {/* 추천 카드 */}
      <div
        style={{
          background: "#fff",
          borderRadius: "30px",
          padding: "24px",
          border: "2px solid #E6ECF5",
          marginBottom: "30px",
        }}
      >

        <div
          style={{
            fontSize: "28px",
            fontWeight: "900",
            color: "#1F2A52",
            marginBottom: "14px",
            lineHeight: "1.4",
          }}
        >
          청년 교통비 지원사업
        </div>

        <div
          style={{
            color: "#AAB3CC",
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "20px",
          }}
        >
          청년 생활비 절감 추천 혜택
        </div>

        <div
          style={{
            color: "#F79245",
            fontSize: "18px",
            fontWeight: "800",
          }}
        >
          신청 기간 : 2026.05.12 ~ 2026.05.15
        </div>

      </div>

      {/* 저장된 혜택 */}
      <div
        style={{
          fontSize: "38px",
          fontWeight: "900",
          color: "#1F2A52",
          marginBottom: "22px",
          lineHeight: "1.2",
        }}
      >
        저장한 혜택
      </div>

      {favorites.length === 0 ? (

        <div
          style={{
            background: "#fff",
            borderRadius: "28px",
            padding: "32px 24px",
            border: "2px solid #E6ECF5",
            textAlign: "center",
            color: "#AAB3CC",
            fontSize: "18px",
            fontWeight: "700",
          }}
        >
          아직 저장한 혜택이 없습니다
        </div>

      ) : (

        favorites.map((item, index) => (

          <div
            key={index}
            style={{
              background: "#fff",
              borderRadius: "30px",
              padding: "24px",
              border: "2px solid #E6ECF5",
              marginBottom: "18px",
            }}
          >

            {/* 제목 */}
            <div
              style={{
                fontSize: "28px",
                fontWeight: "900",
                color: "#1F2A52",
                marginBottom: "14px",
                lineHeight: "1.4",
              }}
            >
              {item.title}
            </div>

            {/* 설명 */}
            <div
              style={{
                color: "#AAB3CC",
                fontSize: "18px",
                fontWeight: "700",
                marginBottom: "18px",
              }}
            >
              {item.desc}
            </div>

            {/* 날짜 + DDAY */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >

              <div
                style={{
                  color: "#F79245",
                  fontSize: "18px",
                  fontWeight: "800",
                  lineHeight: "1.5",
                }}
              >
                {item.date}
              </div>

              <div
                style={{
                  minWidth: "88px",
                  height: "46px",
                  borderRadius: "999px",
                  border: "3px solid #F79245",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#F79245",
                  fontWeight: "900",
                  fontSize: "18px",
                  background: "#fff",
                }}
              >
                {item.dday}
              </div>

            </div>

          </div>

        ))

      )}

      <BottomNav />

    </div>

  );

}