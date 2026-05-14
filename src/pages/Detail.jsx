import { useLocation, useNavigate } from "react-router-dom";

function Detail() {
  const navigate = useNavigate();
  const location = useLocation();

  const item = location.state;

  if (!item) {
    return (
      <div
        style={{
          padding: "40px",
          fontSize: "20px",
          fontWeight: "700",
        }}
      >
        잘못된 접근입니다.
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F7F9FC",
        paddingBottom: "120px",
      }}
    >
      {/* 상단 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          padding: "28px 24px 12px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            border: "none",
            background: "transparent",
            fontSize: "32px",
            cursor: "pointer",
            color: "#1F2A44",
          }}
        >
          ←
        </button>

        <h1
          style={{
            margin: 0,
            fontSize: "52px",
            fontWeight: "800",
            color: "#1F2A44",
          }}
        >
          신청하기
        </h1>
      </div>

      {/* 카드 */}
      <div
        style={{
          margin: "24px",
          padding: "34px",
          borderRadius: "36px",
          background: "#fff",
          border: "2px solid #E3E8F5",
        }}
      >
        <div
          style={{
            fontSize: "34px",
            fontWeight: "800",
            color: "#1F2A44",
            marginBottom: "18px",
            lineHeight: 1.3,
          }}
        >
          {item.title}
        </div>

        <div
          style={{
            fontSize: "20px",
            color: "#AAB2C8",
            fontWeight: "700",
            marginBottom: "42px",
          }}
        >
          {item.desc}
        </div>

        <div
          style={{
            fontSize: "18px",
            color: "#AAB2C8",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          신청 기간
        </div>

        <div
          style={{
            fontSize: "32px",
            color: "#FF964F",
            fontWeight: "800",
            lineHeight: 1.4,
          }}
        >
          {item.date}
        </div>
      </div>

      {/* 지원 내용 */}
      <div
        style={{
          margin: "24px",
          padding: "34px",
          borderRadius: "36px",
          background: "#fff",
          border: "2px solid #E3E8F5",
        }}
      >
        <div
          style={{
            fontSize: "34px",
            fontWeight: "800",
            color: "#1F2A44",
            marginBottom: "26px",
          }}
        >
          지원 내용
        </div>

        <div
          style={{
            color: "#4B5675",
            fontSize: "18px",
            lineHeight: 2,
            fontWeight: "700",
          }}
        >
          • 월 최대 지원금 지급
          <br />
          • 온라인 간편 신청 가능
          <br />
          • 정부24 연동 서류 제출 지원
          <br />
          • 신청 상태 실시간 확인 가능
        </div>
      </div>

      {/* 필요 서류 */}
      <div
        style={{
          margin: "24px",
          padding: "34px",
          borderRadius: "36px",
          background: "#fff",
          border: "2px solid #E3E8F5",
        }}
      >
        <div
          style={{
            fontSize: "34px",
            fontWeight: "800",
            color: "#1F2A44",
            marginBottom: "26px",
          }}
        >
          필요 서류
        </div>

        <div
          style={{
            color: "#4B5675",
            fontSize: "18px",
            lineHeight: 2,
            fontWeight: "700",
          }}
        >
          • 주민등록등본
          <br />
          • 소득금액증명원
          <br />
          • 재학증명서
          <br />
          • 통장 사본
        </div>
      </div>

      {/* 하단 버튼 */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100% - 40px)",
          maxWidth: "390px",
          zIndex: 100,
        }}
      >
        <button
          style={{
            width: "100%",
            height: "60px",
            border: "none",
            borderRadius: "20px",
            background:
              "linear-gradient(135deg,#5B8CFF,#67DCC8)",
            color: "#fff",
            fontSize: "22px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow:
              "0 10px 25px rgba(91,140,255,0.25)",
          }}
        >
          신청하기
        </button>
      </div>
    </div>
  );
}

export default Detail;